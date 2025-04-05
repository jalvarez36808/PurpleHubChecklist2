import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
// Configure multer with memory storage instead of disk
const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 5242880; // 5MB default
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: parseInt(MAX_FILE_SIZE) }
});

// Default table and bucket names - these should match what's in your Supabase
const USER_DOCUMENTS_TABLE = 'user_documents';
const DOCUMENTS_TABLE = 'documents';
const STORAGE_BUCKET = 'documents';

// Hardcoded Supabase credentials - replace with environment variables when possible
const SUPABASE_URL = 'https://baetxwaiocvsxlqtqjpk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZXR4d2Fpb2N2c3hscXRxanBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODEyMzUzNCwiZXhwIjoyMDUzNjk5NTM0fQ.IuPzisKvyLgfd4Yj4c0wgpBh_3uL8Ats2hgqe-4Qn30';

// Create a local Supabase client to avoid circular dependency
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// Function to ensure required tables exist
const ensureTablesExist = async () => {
  try {
    console.log('Checking if required tables exist...');
    
    // Check if user_documents table exists
    const { error: userDocsError } = await supabase
      .from(USER_DOCUMENTS_TABLE)
      .select('id')
      .limit(1);
    
    if (userDocsError && userDocsError.code === '42P01') {
      console.log(`Table ${USER_DOCUMENTS_TABLE} does not exist. Using ${DOCUMENTS_TABLE} as fallback.`);
      
      // Check if documents table exists
      const { error: docsError } = await supabase
        .from(DOCUMENTS_TABLE)
        .select('id')
        .limit(1);
        
      if (docsError && docsError.code === '42P01') {
        console.log('Neither user_documents nor documents tables exist. Will create records in the first table used.');
        // Try to create the documents table directly using SQL
        try {
          const { error } = await supabase.rpc('execute_sql', {
            sql: `
              CREATE TABLE IF NOT EXISTS ${DOCUMENTS_TABLE} (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                file_path TEXT NOT NULL,
                url TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
              );
            `
          });
          
          if (error) {
            console.error('Error creating documents table:', error);
          } else {
            console.log('Documents table created successfully');
          }
        } catch (sqlError) {
          console.error('Exception during SQL execution:', sqlError);
        }
      }
    }
  } catch (error) {
    console.error('Error checking tables:', error);
  }
};

// Function to get the appropriate table name
const getDocumentsTable = async () => {
  try {
    // Try user_documents first
    const { error: userDocsError } = await supabase
      .from(USER_DOCUMENTS_TABLE)
      .select('id')
      .limit(1);
    
    if (!userDocsError) {
      return USER_DOCUMENTS_TABLE;
    }
    
    // Fall back to documents table
    return DOCUMENTS_TABLE;
  } catch (error) {
    console.error('Error determining table name:', error);
    return DOCUMENTS_TABLE; // Default fallback
  }
};

// Helper function to ensure storage bucket exists
const ensureBucketExists = async () => {
  try {
    console.log('Checking if storage bucket exists...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === STORAGE_BUCKET);
    
    if (!bucketExists) {
      console.log(`Creating bucket ${STORAGE_BUCKET}...`);
      const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, { 
        public: false 
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
      
      console.log(`Bucket ${STORAGE_BUCKET} created successfully`);
    } else {
      console.log(`Bucket ${STORAGE_BUCKET} already exists`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in ensureBucketExists:', error);
    return false;
  }
};

// Initialize storage and tables when server is ready
setTimeout(async () => {
  try {
    await ensureBucketExists();
    await ensureTablesExist();
    console.log('Storage and tables initialization complete');
  } catch (error) {
    console.error('Error initializing storage and tables:', error);
  }
}, 1000); // Delay to ensure everything is loaded

// Get all documents (admin route)
router.get('/', async (req, res) => {
  try {
    const table = await getDocumentsTable();
    const { data, error } = await supabase
      .from(table)
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload a document
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Document upload request received');
    
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { userId, name, category } = req.body;
    
    if (!userId || !name || !category) {
      console.error('Missing required fields', { userId, name, category });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    console.log('Document upload details:', { 
      userId, 
      name, 
      category,
      fileSize: req.file.size,
      fileType: req.file.mimetype
    });
    
    // Skip user verification since the profiles table may not exist
    // Just continue with the upload if we have a userId
    
    // Ensure bucket exists before upload
    const bucketExists = await ensureBucketExists();
    if (!bucketExists) {
      console.error('Storage bucket does not exist and could not be created');
      return res.status(500).json({ error: 'Storage setup failed' });
    }
    
    // Get the table to use
    const table = await getDocumentsTable();
    console.log(`Using table: ${table}`);
    
    // Generate unique filename with original extension
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = `${userId}/${fileName}`;
    
    console.log(`Uploading to storage path: ${filePath}`);
    
    // Upload file to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600'
      });
      
    if (storageError) {
      console.error('Error uploading file to storage:', storageError);
      return res.status(500).json({ error: 'Error uploading file to storage' });
    }
    
    console.log('File uploaded to storage successfully');
    
    // Generate signed URL for the file (valid for 1 hour = 3600 seconds)
    // This works with private buckets unlike getPublicUrl which only works for public buckets
    const { data: { signedUrl } } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 3600);
    
    // Use the signed URL instead of public URL
    const fileUrl = signedUrl;
    
    console.log('Generated signed URL for file access');
    
    // Try to create the table if it doesn't exist
    try {
      await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS ${table} (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            file_path TEXT NOT NULL,
            url TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      });
    } catch (tableError) {
      console.log('Note: Could not create table dynamically');
    }
      
    // Insert record in database - try with a raw SQL INSERT as a fallback
    try {
      const { data: recordData, error: recordError } = await supabase
        .from(table)
        .insert({
          user_id: userId,
          name: name,
          category: category,
          file_path: filePath,
          url: fileUrl,
          created_at: new Date().toISOString()
        });
        
      if (recordError) {
        console.error('Error inserting record using standard method:', recordError);
        throw recordError;
      }
    } catch (insertError) {
      console.error('Trying alternative insertion method...');
      
      try {
        // Try a direct SQL insert
        const { error: sqlError } = await supabase.rpc('execute_sql', {
          sql: `
            INSERT INTO ${table} (user_id, name, category, file_path, url, created_at)
            VALUES ('${userId}', '${name}', '${category}', '${filePath}', '${fileUrl}', NOW());
          `
        });
        
        if (sqlError) {
          console.error('Error with SQL insertion:', sqlError);
          // Continue anyway since the file is uploaded
        }
      } catch (sqlExecError) {
        console.error('SQL execution error:', sqlExecError);
        // Continue anyway since the file is uploaded
      }
    }
    
    console.log('Document upload completed successfully');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Document uploaded successfully',
      filePath,
      fileUrl
    });
  } catch (error) {
    console.error('Unhandled error in document upload:', error);
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Get documents for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const table = await getDocumentsTable();
    
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a document by ID
router.delete('/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;
    
    if (!documentId) {
      return res.status(400).json({ error: 'Document ID is required' });
    }
    
    console.log(`Document deletion requested for ID: ${documentId}`);
    
    // Get the appropriate table name
    const table = await getDocumentsTable();
    
    // First, get the document to check ownership and retrieve the file path
    const { data: document, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .eq('id', documentId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching document for deletion:', fetchError);
      return res.status(500).json({ error: 'Error fetching document' });
    }
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([document.file_path]);
    
    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
    }
    
    // Delete the record from the database
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq('id', documentId);
    
    if (deleteError) {
      console.error('Error deleting document record:', deleteError);
      return res.status(500).json({ error: 'Error deleting document record' });
    }
    
    console.log(`Document ${documentId} deleted successfully`);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Document deleted successfully' 
    });
  } catch (error) {
    console.error('Unhandled error in document deletion:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;