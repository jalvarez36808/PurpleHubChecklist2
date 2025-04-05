import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  PhoneIcon,
  HeartIcon,
  ArrowUpIcon,
  DocumentPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  FolderIcon,
  IdentificationIcon,
  HomeIcon,
  HeartIcon as HeartPulseIcon,
  ScaleIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [obituaryDrafts, setObituaryDrafts] = useState([]);
  const [checklistCategories, setChecklistCategories] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [documentsUploaded, setDocumentsUploaded] = useState(0);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('legal');
  const [documentFile, setDocumentFile] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Document categories based on ImportantDocuments.jsx
  const documentCategories = [
    { id: 'legal', name: 'Legal & Financial', icon: <ScaleIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'identification', name: 'Identification & Personal Records', icon: <IdentificationIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'insurance', name: 'Insurance & Benefits', icon: <HeartPulseIcon className="w-5 h-5 text-[#6266ea]" /> },
    { id: 'property', name: 'Property & Accounts', icon: <HomeIcon className="w-5 h-5 text-[#6266ea]" /> }
  ];

  // Learn pages organized by categories
  const learnResources = [
    {
      category: "Legal & Estate Matters",
      icon: <ScaleIcon className="w-5 h-5 text-[#6266ea]" />,
      resources: [
        { title: "Finding a Will", path: "/learn/finding-will" },
        { title: "Executing a Will", path: "/learn/executing-will" },
        { title: "Probate Guide", path: "/learn/probate-guide" },
        { title: "Important Documents", path: "/learn/important-documents" }
      ]
    },
    {
      category: "Care & Arrangements",
      icon: <HeartPulseIcon className="w-5 h-5 text-[#6266ea]" />,
      resources: [
        { title: "Body Transportation", path: "/learn/body-transportation" },
        { title: "Home Care", path: "/learn/home-care" },
        { title: "Understanding Remains Options", path: "/learn/understanding-remains-options" }
      ]
    },
    {
      category: "Personal Support",
      icon: <UserGroupIcon className="w-5 h-5 text-[#6266ea]" />,
      resources: [
        { title: "Determining Wishes", path: "/learn/determining-wishes" },
        { title: "Collecting Memories", path: "/learn/collecting-memories" },
        { title: "Write an Obituary", path: "/learn/write-obituary" }
      ]
    }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();
    if (!documentFile || !documentName || !documentType) {
      alert('Please provide a document name, type, and file');
      return;
    }

    try {
      setUploadingDocument(true);

      // Validate file size before uploading
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (documentFile.size > maxSize) {
        alert(`File size exceeds maximum limit of 5MB. Your file is ${(documentFile.size / (1024 * 1024)).toFixed(2)}MB`);
        setUploadingDocument(false);
        return;
      }

      // Check file type
      const allowedTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/png', 
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(documentFile.type)) {
        alert(`File type not allowed. Please upload PDF, JPG, PNG, or Word documents.`);
        setUploadingDocument(false);
        return;
      }
      
      // Get current user info
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        alert('You must be logged in to upload documents');
        setUploadingDocument(false);
        return;
      }
      
      // Create form data for multipart/form-data upload
      const formData = new FormData();
      formData.append('file', documentFile);
      formData.append('userId', session.user.id);
      formData.append('name', documentName);
      formData.append('category', documentType);
      
      // Upload document
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `Error: ${response.status} ${response.statusText}`);
      }
      
      console.log('Upload response:', result);
      
      // Refresh document list
      await fetchUserDocuments(session.user.id);
      
      // Reset form
      setDocumentName('');
      setDocumentFile(null);
      setDocumentType('legal'); // Reset to default
      const fileInput = document.getElementById('document-upload');
      if (fileInput) fileInput.value = '';
      
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert(`Error uploading document: ${error.message}. Please try again.`);
    } finally {
      setUploadingDocument(false);
    }
  };

  // Fetch user documents function
  const fetchUserDocuments = async (userId) => {
    if (!userId) return;
    
    setLoadingDocuments(true);
    setUserDocuments([]);
    try {
      const response = await fetch(`/api/documents/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching documents: ${response.status}`);
      }
      
      const documents = await response.json();
      console.log('Fetched documents:', documents);
      setUserDocuments(documents || []);
      setDocumentsUploaded(documents?.length || 0);
    } catch (error) {
      console.error('Error fetching user documents:', error);
    } finally {
      setLoadingDocuments(false);
    }
  };

  // Function to get icon based on file type/category
  const getDocumentIcon = (category, fileType) => {
    // Use category first if available
    const categoryMatch = documentCategories.find(cat => cat.id === category);
    if (categoryMatch) {
      return categoryMatch.icon;
    }
    
    // Fallback to file type
    if (fileType?.includes('pdf')) {
      return <DocumentTextIcon className="w-5 h-5 text-red-500" />;
    } else if (fileType?.includes('image')) {
      return <PhotoIcon className="w-5 h-5 text-blue-500" />;
    } else if (fileType?.includes('word')) {
      return <DocumentTextIcon className="w-5 h-5 text-blue-700" />;
    }
    
    // Default
    return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
  };

  // Function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle document deletion
  const handleDeleteClick = (document) => {
    setDocumentToDelete(document);
    setDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!documentToDelete || !user) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/documents/${documentToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete document');
      }
      
      // Remove the deleted document from the list
      setUserDocuments(userDocuments.filter(doc => doc.id !== documentToDelete.id));
      setAlertMessage('Document deleted successfully.');
      setAlertType('success');
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlertMessage(`Error deleting document: ${error.message}`);
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user);
        
        if (session?.user) {
          // Load completed tasks
          const { data: tasks } = await supabase
            .from('user_tasks')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false });

          // Create a Set of completed task IDs for efficient lookup
          const completedTaskIds = new Set(tasks?.map(task => task.task_id) || []);
          setCompletedTasks(completedTaskIds);
          setRecentActivity(tasks?.slice(0, 5) || []);

          // Load checklist categories and count tasks
          const { data: categories } = await supabase
            .from('checklist_categories')
            .select('id, name, checklist_tasks(id, title)');
          
          if (categories) {
            // Process categories to add completion information
            const processedCategories = categories.map(category => {
              // Ensure tasks array exists
              const tasks = category.checklist_tasks || [];
              
              // Count completed tasks in this category
              const completedTasksCount = tasks.filter(task => 
                completedTaskIds.has(task.id)
              ).length;
              
              return {
                ...category,
                totalTasks: tasks.length,
                completedTasks: completedTasksCount
              };
            });
            
            setChecklistCategories(processedCategories);
            
            // Calculate total tasks across all categories
            const totalTasksCount = processedCategories.reduce(
              (sum, category) => sum + category.totalTasks, 
              0
            );
            setTotalTasks(totalTasksCount);
          }

          // Count documents uploaded
          const { count } = await supabase
            .from('user_documents')
            .select('id', { count: 'exact' })
            .eq('user_id', session.user.id);
          
          setDocumentsUploaded(count || 0);

          // Fetch user documents
          await fetchUserDocuments(session.user.id);

          // Load obituary drafts
          const { data: drafts, error: draftsError } = await supabase
            .from('obituary_templates')
            .select('*')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false });

          if (draftsError) {
            console.error('Error loading drafts:', draftsError);
          } else {
            setObituaryDrafts(drafts || []);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const deleteDraft = async (draftId) => {
    try {
      const { error } = await supabase
        .from('obituary_templates')
        .delete()
        .eq('id', draftId);

      if (error) {
        console.error('Error deleting draft:', error);
        return;
      }

      // Update the local state to remove the deleted draft
      setObituaryDrafts(drafts => drafts.filter(draft => draft.id !== draftId));
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
      </div>
      
      {/* Alert Message */}
      {showAlert && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-md ${
          alertType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
          'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            {alertType === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-600" />
            )}
            <p className="text-sm font-medium">{alertMessage}</p>
            <button
              type="button"
              className="ml-4 text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] rounded-2xl p-6 sm:p-10 text-white mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back{user ? `, ${user.user_metadata?.display_name || user.email.split('@')[0]}` : ''}</h1>
            <p className="text-white/80">Continue your journey with our guided assistance.</p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-8 h-8 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{completedTasks.size}</div>
                    <div className="text-sm text-white/80">Tasks Completed</div>
                  </div>
                </div>
                {totalTasks > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{Math.round((completedTasks.size / totalTasks) * 100)}% complete</span>
                      <span>{completedTasks.size}/{totalTasks}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-white h-1.5 rounded-full" 
                        style={{width: `${(completedTasks.size / totalTasks) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-8 h-8 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{documentsUploaded}</div>
                    <div className="text-sm text-white/80">Documents Saved</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center">
                  <ArrowUpIcon className="w-8 h-8 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">
                      {recentActivity.length > 0 ? 
                        new Date(recentActivity[0].completed_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : 
                        '-'}
                    </div>
                    <div className="text-sm text-white/80">Last Activity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Category Progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Checklist Progress</h2>
                  <div className="space-y-4">
                    {checklistCategories.length > 0 ? (
                      checklistCategories.map((category) => {
                        const percentComplete = category.totalTasks > 0 
                          ? Math.round((category.completedTasks / category.totalTasks) * 100) 
                          : 0;
                        
                        return (
                          <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-gray-900">{category.name}</h3>
                              <span className="text-sm text-[#6266ea] font-medium">
                                {category.completedTasks}/{category.totalTasks}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-2 rounded-full" 
                                style={{width: `${percentComplete}%`}}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm">No categories found</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link 
                      to="/checklist"
                      className="inline-flex items-center text-[#6266ea] hover:text-[#4232c2] text-sm font-medium"
                    >
                      <span>Go to full checklist</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link 
                      to="/checklist"
                      className="flex items-center p-4 bg-[#6266ea]/5 rounded-xl hover:bg-[#6266ea]/10 transition-colors duration-200"
                    >
                      <ClipboardDocumentListIcon className="w-8 h-8 text-[#6266ea] mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Continue Checklist</div>
                        <div className="text-sm text-gray-600">Track your progress</div>
                      </div>
                    </Link>
                    <Link 
                      to="/documents"
                      className="flex items-center p-4 bg-[#6266ea]/5 rounded-xl hover:bg-[#6266ea]/10 transition-colors duration-200"
                    >
                      <DocumentPlusIcon className="w-8 h-8 text-[#6266ea] mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Upload Documents</div>
                        <div className="text-sm text-gray-600">Store important files</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity, index) => (
                        <div 
                          key={index}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Completed: {activity.task_id}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(activity.completed_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No recent activity to show</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Obituary Drafts Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Obituary Drafts</h2>
                    <Link 
                      to="/learn/write-obituary"
                      className="text-sm text-[#6266ea] hover:text-[#4232c2] flex items-center"
                    >
                      <PencilSquareIcon className="w-4 h-4 mr-1" />
                      New Draft
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {obituaryDrafts.length > 0 ? (
                      obituaryDrafts.map((draft) => (
                        <div
                          key={draft.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-[#6266ea]/5 transition-colors duration-200"
                        >
                          <Link
                            to={`/learn/write-obituary?draft=${draft.id}`}
                            className="flex-1 min-w-0"
                          >
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {draft.content.fullName || 'Untitled Draft'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Last updated: {new Date(draft.updated_at).toLocaleDateString()}
                            </div>
                          </Link>
                          <div className="flex items-center gap-2 ml-4">
                            <Link
                              to={`/learn/write-obituary?draft=${draft.id}`}
                              className="p-2 text-[#6266ea] hover:bg-[#6266ea]/10 rounded-lg transition-colors duration-200"
                            >
                              <PencilSquareIcon className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
                                  deleteDraft(draft.id);
                                }
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">No drafts yet</p>
                        <Link 
                          to="/learn/write-obituary"
                          className="inline-block mt-2 text-[#6266ea] hover:text-[#4232c2] text-sm font-medium"
                        >
                          Create your first draft
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Upload Section - NEW */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Important Documents</h2>
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
                        placeholder="e.g., Will, Birth Certificate, Insurance Policy"
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
                        Accepted formats: PDF, JPG, PNG (max 5MB)
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={uploadingDocument}
                      className="inline-flex items-center px-4 py-2 bg-[#6266ea] text-white rounded-md hover:bg-[#4232c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  
                  <div className="mt-4">
                    <Link
                      to="/learn/important-documents"
                      className="text-sm text-[#6266ea] hover:text-[#4232c2] flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                      What documents should I gather?
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Documents List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Your Documents</h2>
                </div>
                
                <div className="px-6 py-4">
                  {loadingDocuments ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                    </div>
                  ) : userDocuments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                                    {getDocumentIcon(doc.category, doc.file_path)}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                  {documentCategories.find(cat => cat.id === doc.category)?.name || doc.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {doc.created_at ? formatDate(doc.created_at) : 'Unknown'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <a 
                                    href={doc.url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-900"
                                    title="View Document"
                                  >
                                    <EyeIcon className="h-5 w-5" />
                                  </a>
                                  <a 
                                    href={doc.url}
                                    download
                                    className="text-green-600 hover:text-green-900"
                                    title="Download Document"
                                  >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteClick(doc)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete Document"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Start by uploading an important document.
                      </p>
                      <div className="mt-6">
                        {/* Upload Document button removed as requested */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Learning Resources - ENHANCED */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Resources</h2>
                  <div className="space-y-6">
                    {learnResources.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center mb-2">
                          {category.icon}
                          <h3 className="font-medium text-gray-800 ml-2">{category.category}</h3>
                        </div>
                        <div className="space-y-2 pl-7">
                          {category.resources.map((resource, resourceIndex) => (
                            <Link 
                              key={resourceIndex}
                              to={resource.path}
                              className="block text-sm text-gray-600 hover:text-[#6266ea] hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resource.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to="/learn"
                      className="text-sm text-[#6266ea] hover:text-[#4232c2] flex items-center justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View all resources</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Documents at a Glance - NEW */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Documents at a Glance</h2>
                  
                  {documentsUploaded > 0 ? (
                    <div className="space-y-3">
                      {documentCategories.map(category => (
                        <div key={category.id} className="flex items-center p-3 bg-[#6266ea]/5 rounded-lg">
                          <div className="p-2 bg-white rounded-md mr-3">
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-xs text-gray-500">
                              {/* This would ideally show the actual count per category */}
                              View documents in this category
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Link
                        to="/documents"
                        className="block text-center px-4 py-2 border border-[#6266ea] text-[#6266ea] rounded-lg hover:bg-[#6266ea] hover:text-white transition-colors duration-200 mt-2"
                      >
                        Manage Documents
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <FolderIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4">
                        No documents uploaded yet. Start by adding important papers to keep them organized.
                      </p>
                      <p className="text-sm text-gray-600">
                        Recommended: Will, birth certificate, insurance policies
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Support Us Card */}
              <div className="bg-gradient-to-r from-[#6266ea]/5 to-[#7c80ee]/5 rounded-xl shadow-sm border border-[#6266ea]/20 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Support Our Mission</h2>
                  <p className="text-sm text-gray-600 mb-4">Help us continue providing support to families in need.</p>
                  <Link
                    to="/support-us"
                    className="block text-center px-4 py-2 bg-[#6266ea] text-white rounded-lg hover:bg-[#4232c2] transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Delete Document</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete {documentToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={cancelDelete}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}