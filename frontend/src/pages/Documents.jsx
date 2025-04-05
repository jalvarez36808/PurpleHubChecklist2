import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  DocumentTextIcon, 
  ArrowUpTrayIcon,
  DocumentPlusIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  FolderIcon,
  IdentificationIcon,
  HomeIcon,
  HeartIcon as HeartPulseIcon,
  ScaleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export default function Documents() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('legal');
  const [documentFile, setDocumentFile] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState('all');

  // Document categories based on ImportantDocuments.jsx
  const documentCategories = [
    { id: 'legal', name: 'Legal & Financial', icon: <ScaleIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'identification', name: 'Identification & Personal Records', icon: <IdentificationIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'insurance', name: 'Insurance & Benefits', icon: <HeartPulseIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'property', name: 'Property & Accounts', icon: <HomeIcon className="w-5 h-5 text-[#6266ea]" /> }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);
        
        if (session?.user) {
          // Load user documents
          const { data, error } = await supabase
            .from('user_documents')
            .select('*')
            .eq('user_id', session.user.id)
            .order('uploaded_at', { ascending: false });
            
          if (error) throw error;
          setDocuments(data || []);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();
    if (!documentFile || !documentName || !documentType) return;

    try {
      setUploadingDocument(true);
      
      // Upload file to storage
      const fileExt = documentFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user_documents')
        .upload(fileName, documentFile);
        
      if (uploadError) throw uploadError;
      
      // Create database record
      const newDocument = {
        user_id: user.id,
        name: documentName,
        category: documentType,
        file_path: fileName,
        uploaded_at: new Date()
      };
      
      const { data, error } = await supabase
        .from('user_documents')
        .insert([newDocument])
        .select();
      
      if (error) throw error;
      
      // Update documents list
      setDocuments([data[0], ...documents]);
      
      // Reset form
      setDocumentName('');
      setDocumentFile(null);
      document.getElementById('document-upload').value = '';
      
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document. Please try again.');
    } finally {
      setUploadingDocument(false);
    }
  };
  
  const downloadDocument = async (filePath) => {
    try {
      const { data, error } = await supabase.storage
        .from('user_documents')
        .download(filePath);
        
      if (error) throw error;
      
      // Create a URL for the file and open it
      const url = URL.createObjectURL(data);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Error downloading document. Please try again.');
    }
  };
  
  const deleteDocument = async (id, filePath) => {
    if (!window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user_documents')
        .remove([filePath]);
      
      if (storageError) console.error('Error removing file from storage:', storageError);
      
      // Delete from database
      const { error } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update document list
      setDocuments(documents.filter(doc => doc.id !== id));
      
      alert('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please try again.');
    }
  };

  // Filter documents based on category
  const filteredDocuments = filteredCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === filteredCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }
  
  const getCategoryIcon = (categoryId) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : <DocumentTextIcon className="w-5 h-5 text-[#6266ea]" />;
  };
  
  const getCategoryName = (categoryId) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Other';
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Your Documents</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Safely store digital copies of important documents for easy access when needed.
                </p>
                
                <form onSubmit={uploadDocument} className="space-y-4">
                  <div>
                    <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Document Name
                    </label>
                    <input
                      type="text"
                      id="document-name"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6266ea] focus:border-[#6266ea]"
                      placeholder="e.g., Will, Birth Certificate"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Document Category
                    </label>
                    <select
                      id="document-type"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6266ea] focus:border-[#6266ea]"
                      required
                    >
                      {documentCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="document-upload" className="block text-sm font-medium text-gray-700 mb-1">
                      Upload File
                    </label>
                    <input
                      type="file"
                      id="document-upload"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#6266ea]/10 file:text-[#6266ea] hover:file:bg-[#6266ea]/20"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Accepted formats: PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={uploadingDocument}
                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-[#6266ea] text-white rounded-md hover:bg-[#4232c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingDocument ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                        Upload Document
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-6">
                  <Link
                    to="/learn/important-documents"
                    className="text-sm text-[#6266ea] hover:text-[#4232c2] flex items-center"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-1" />
                    What documents should I gather?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Document List */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilteredCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      filteredCategory === 'all' 
                        ? 'bg-[#6266ea] text-white' 
                        : 'bg-[#6266ea]/5 text-gray-700 hover:bg-[#6266ea]/10'
                    }`}
                  >
                    All Documents
                  </button>
                  
                  {documentCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setFilteredCategory(category.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                        filteredCategory === category.id 
                          ? 'bg-[#6266ea] text-white' 
                          : 'bg-[#6266ea]/5 text-gray-700 hover:bg-[#6266ea]/10'
                      }`}
                    >
                      {React.cloneElement(category.icon, { 
                        className: `w-4 h-4 ${filteredCategory === category.id ? 'text-white' : 'text-[#6266ea]'} mr-1`
                      })}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          
            {/* Document Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {filteredCategory === 'all' ? 'All Documents' : getCategoryName(filteredCategory)}
                  {filteredDocuments.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredDocuments.length})
                    </span>
                  )}
                </h2>
                
                {filteredDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDocuments.map(doc => (
                      <div 
                        key={doc.id} 
                        className="p-4 border border-gray-200 hover:border-[#6266ea]/20 rounded-lg flex items-center justify-between bg-white hover:bg-[#6266ea]/5 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-[#6266ea]/10 rounded-md mr-3">
                            {getCategoryIcon(doc.category)}
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-xs text-gray-500">
                              {getCategoryName(doc.category)} • Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadDocument(doc.file_path)}
                            className="p-2 text-gray-700 hover:text-[#6266ea] hover:bg-[#6266ea]/10 rounded-lg transition-colors"
                            aria-label="Download document"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => deleteDocument(doc.id, doc.file_path)}
                            className="p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Delete document"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    {documents.length > 0 ? (
                      <>
                        <ExclamationCircleIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No documents in this category</h3>
                        <p className="text-gray-500">
                          Try selecting a different category or upload a new document.
                        </p>
                      </>
                    ) : (
                      <>
                        <FolderIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No documents yet</h3>
                        <p className="text-gray-500">
                          Start by uploading your first document.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 