import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { supabase, getUser } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpen, setIsOpen] = useState({ mobileMenu: false, profileDropdown: false });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Checklist', href: '/checklist' },
    { name: 'Resources', href: '/resources' },
  ];

  useEffect(() => {
    // Initial user check
    getUser().then(user => {
      console.log('Current user:', user);
      setUser(user);
      if (user) {
        checkIsAdmin(user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session?.user);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        checkIsAdmin(currentUser.id);
      } else {
        setIsAdmin(false);
      }
    });

    // Handler to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(prev => ({ ...prev, profileDropdown: false }));
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if user has admin role
  const checkIsAdmin = async (userId) => {
    try {
      // Check if we've already had a failure for this session
      const roleFetchFailed = sessionStorage.getItem('roleFetchFailed');
      if (roleFetchFailed === 'true') {
        console.log('Skipping role check due to previous failure');
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);
      
      if (error) {
        console.warn('Error checking admin role:', error.message);
        // If we get a 406 error, the table probably doesn't exist or has permission issues
        // Store this in session storage to prevent repeated failed requests
        if (error.status === 406) {
          sessionStorage.setItem('roleFetchFailed', 'true');
        }
        setIsAdmin(false);
        return;
      }
      
      // Look through the data array (if any) for an admin role
      if (data && data.length > 0) {
        const hasAdminRole = data.some(role => role.role === 'admin');
        setIsAdmin(hasAdminRole);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Exception checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      navigate('/');
      setShowConfirmDialog(false);
      setIsOpen({ mobileMenu: false, profileDropdown: false });
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-100 relative">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-b from-transparent to-gray-200"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="font-bold text-xl sm:text-2xl hover:opacity-90">
                <span className="text-[#212529]">Purple</span>
                <span className="text-[#4232c2]">Hub</span>
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen({ ...isOpen, mobileMenu: !isOpen.mobileMenu })}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6266ea]"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen.mobileMenu ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1 sm:space-x-8">
              {user && (
                <>
                  <Link to="/" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Home
                  </Link>
                  <Link to="/dashboard" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Dashboard
                  </Link>
                  <Link to="/checklist" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Checklist
                  </Link>
                  <Link to="/help" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Help
                  </Link>
                  {isAdmin && (
                    <Link 
                      to={import.meta.env.DEV ? "/dev-admin" : "/admin"} 
                      className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
                    >
                      <span>Admin</span>
                      {import.meta.env.DEV && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-md">DEV</span>
                      )}
                    </Link>
                  )}
                </>
              )}
              {!user && (
                <>
                  <Link to="/" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Home
                  </Link>
                  <Link to="/checklist" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Checklist
                  </Link>
                  <Link to="/help" className="text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                    Help
                  </Link>
                </>
              )}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex sm:items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsOpen({...isOpen, profileDropdown: !isOpen.profileDropdown})}
                    className="flex items-center text-[#6c757d] hover:text-[#6266ea] px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  >
                    <span className="mr-1">
                      {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Your Profile'}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isOpen.profileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <Link 
                        to="/profile-settings" 
                        onClick={() => setIsOpen({...isOpen, profileDropdown: false})}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          setShowConfirmDialog(true);
                          setIsOpen({...isOpen, profileDropdown: false});
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/signin" className="text-[#6c757d] hover:text-white hover:bg-[#6266ea] px-4 py-2 rounded-md text-base font-medium transition-all duration-200 border border-[#6266ea]/20">
                    Sign In
                  </Link>
                  <Link to="/signup" className="text-white bg-[#6266ea] hover:opacity-90 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen.mobileMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {user ? (
              <>
                <Link to="/" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Home
                </Link>
                <Link to="/dashboard" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Dashboard
                </Link>
                <Link to="/checklist" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Checklist
                </Link>
                <Link to="/help" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Help
                </Link>
                {isAdmin && (
                  <Link 
                    to={import.meta.env.DEV ? "/dev-admin" : "/admin"}
                    onClick={() => setIsOpen({...isOpen, mobileMenu: false})}
                    className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md flex items-center"
                  >
                    Admin
                    {import.meta.env.DEV && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-md">DEV</span>
                    )}
                  </Link>
                )}
                <div className="border-t border-gray-200 my-3"></div>
                <Link to="/profile-settings" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Profile Settings
                </Link>
                <button 
                  onClick={() => {
                    setShowConfirmDialog(true);
                    setIsOpen({...isOpen, mobileMenu: false});
                  }} 
                  className="w-full text-left px-3 py-3 text-base font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Home
                </Link>
                <Link to="/checklist" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Checklist
                </Link>
                <Link to="/help" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block px-3 py-3 text-base font-medium text-[#6c757d] hover:text-[#6266ea] hover:bg-gray-50 rounded-md">
                  Help
                </Link>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <Link to="/signin" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block w-full px-3 py-3 text-center text-base font-medium text-[#6c757d] hover:text-[#6266ea] bg-gray-50 hover:bg-gray-100 rounded-md mb-2">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen({...isOpen, mobileMenu: false})} className="block w-full px-3 py-3 text-center text-base font-medium text-white bg-[#6266ea] hover:bg-[#4232c2] rounded-md">
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sign Out Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowConfirmDialog(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-[#212529]" id="modal-title">
                    Sign Out
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-[#6c757d]">
                      Are you sure you want to sign out? You will need to sign in again to access your dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6266ea] text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-[#6c757d] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}