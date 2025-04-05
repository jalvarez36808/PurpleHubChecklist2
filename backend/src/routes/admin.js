import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware to verify admin status
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }
  
  try {
    // Verify JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    
    // Check if user has admin role
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (roleError || !userRole || userRole.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }
    
    // Attach user to request
    req.user = user;
    req.isAdmin = true;
    next();
    
  } catch (error) {
    console.error('Error verifying admin:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Apply admin middleware to all routes
router.use(verifyAdmin);

// Get site statistics
router.get('/stats', async (req, res) => {
  try {
    // Get user count
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact' });
    
    if (userError) throw userError;
    
    // Get documents count
    const { count: docsCount, error: docsError } = await supabase
      .from('user_documents')
      .select('*', { count: 'exact' });
    
    if (docsError) throw docsError;
    
    // Get completed tasks count
    const { count: tasksCount, error: tasksError } = await supabase
      .from('user_tasks')
      .select('*', { count: 'exact' })
      .eq('status', 'completed');
    
    if (tasksError) throw tasksError;
    
    res.json({
      users: userCount || 0,
      documents: docsCount || 0,
      completedTasks: tasksCount || 0,
      environment: process.env.NODE_ENV || 'development'
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data || []);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user details
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    // Get user details including their documents and completed tasks
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    // Get user documents
    const { data: documents, error: docsError } = await supabase
      .from('user_documents')
      .select('*')
      .eq('user_id', userId);
    
    if (docsError) throw docsError;
    
    // Get user tasks
    const { data: tasks, error: tasksError } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', userId);
    
    if (tasksError) throw tasksError;
    
    res.json({
      user,
      documents: documents || [],
      tasks: tasks || []
    });
    
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Update user role
router.put('/users/:userId/role', async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  
  if (!role || !['admin', 'user', 'editor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role specified' });
  }
  
  try {
    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update or insert user role
    const { data, error } = await supabase
      .from('user_roles')
      .upsert(
        { user_id: userId, role },
        { onConflict: 'user_id' }
      );
    
    if (error) throw error;
    
    res.json({ success: true, message: `User role updated to ${role}` });
    
  } catch (error) {
    console.error(`Error updating user ${userId} role:`, error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Add development-specific routes when in development mode
if (process.env.NODE_ENV !== 'production') {
  // Create test admin user for development
  router.post('/dev/create-admin', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
      
      if (authError) throw authError;
      
      const userId = authData.user.id;
      
      // Add to users table
      const { error: userError } = await supabase
        .from('users')
        .insert([
          { 
            id: userId, 
            email, 
            full_name: 'Admin User', 
            created_at: new Date().toISOString() 
          }
        ]);
      
      if (userError) throw userError;
      
      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([
          { user_id: userId, role: 'admin' }
        ]);
      
      if (roleError) throw roleError;
      
      res.json({ 
        success: true, 
        message: 'Development admin user created successfully',
        user: authData.user
      });
      
    } catch (error) {
      console.error('Error creating dev admin:', error);
      res.status(500).json({ error: 'Failed to create development admin user' });
    }
  });

  // Development environment check
  router.get('/dev/check', (req, res) => {
    res.json({
      environment: process.env.NODE_ENV || 'development',
      isDevAdmin: true,
      timestamp: new Date().toISOString()
    });
  });
}

export default router;
