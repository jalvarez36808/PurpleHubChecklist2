import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserIcon } from '@heroicons/react/24/outline';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setDisplayName(session.user.user_metadata?.display_name || session.user.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setMessage({ text: '', type: '' });

      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      });

      if (error) throw error;

      setMessage({ 
        text: 'Profile updated successfully!', 
        type: 'success' 
      });
      
      setUser(data.user);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        text: `Error updating profile: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
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
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#212529]">Profile Settings</h1>
          <p className="mt-2 text-[#6c757d]">Manage your account information</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-[#212529]">Personal Information</h2>
          </div>
          
          <form onSubmit={updateProfile} className="p-6 space-y-6">
            {message.text && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-[#6266ea]/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-[#6266ea]" />
              </div>
              <div>
                <p className="text-sm text-[#6c757d]">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#e9ecef] mb-2">
              <p className="text-sm text-[#6c757d]">
                Your display name is used throughout the site to personalize your experience. 
                By default, we use your email username, but you can set a more personal name below.
              </p>
            </div>
            
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-[#212529] mb-1">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-[#6c757d] text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#6266ea] focus:border-transparent transition-colors duration-200"
                placeholder="Enter your preferred display name"
              />
              <p className="mt-1 text-sm text-[#6c757d]">
                This is how your name will appear throughout the site, including on the dashboard welcome message.
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-[#6266ea] text-white rounded-lg hover:bg-[#4232c2] focus:outline-none focus:ring-2 focus:ring-[#6266ea] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 