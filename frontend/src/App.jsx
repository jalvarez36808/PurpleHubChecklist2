import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Checklist from './pages/Checklist'
import NotFound from './pages/NotFound'
import DeterminingWishes from './pages/learn/DeterminingWishes'
import UnderstandingRemainsOptions from './pages/learn/UnderstandingRemainsOptions'
import BodyTransportation from './pages/learn/BodyTransportation'
import FindingWill from './pages/learn/FindingWill'
import CollectingMemories from './pages/learn/CollectingMemories'
import WriteObituary from './pages/learn/WriteObituary'
import ExecutingWill from './pages/learn/executing-will'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import SupportUs from './pages/SupportUs'
import Help from './pages/Help'
import ProbateGuide from './pages/learn/ProbateGuide'
import HomeCare from './pages/learn/HomeCare'
import ImportantDocuments from './pages/learn/ImportantDocuments'
import Documents from './pages/Documents'
import ProfileSettings from './pages/ProfileSettings'
// import Admin from './pages/Admin'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ScrollTopButton from './components/ScrollTopButton'

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state change subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading spinner only if we're actually loading and don't have a user yet
  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          setLoading(false);
          return;
        }
        
        // Check if user has admin role
        const { data: userRoles, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (!error && userRoles?.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <AdminRoute>
                {/* <Admin /> */}
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
                  <p>Admin functionality is under development.</p>
                </div>
              </AdminRoute>
            }
          />
          <Route
            path="profile-settings"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route path="checklist" element={<Checklist />} />
          <Route
            path="documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/support-us" element={<SupportUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/probate-guide" element={<ProbateGuide />} />
          
          {/* Learning Resource Routes */}
          <Route path="learn">
            <Route path="determining-wishes" element={<DeterminingWishes />} />
            <Route path="understanding-remains-options" element={<UnderstandingRemainsOptions />} />
            <Route path="body-transportation" element={<BodyTransportation />} />
            <Route path="finding-will" element={<FindingWill />} />
            <Route path="collecting-memories" element={<CollectingMemories />} />
            <Route path="write-obituary" element={<WriteObituary />} />
            <Route path="executing-will" element={<ExecutingWill />} />
            <Route path="probating-assets" element={<Navigate to="/learn/executing-will" replace />} />
            <Route path="home-care" element={<HomeCare />} />
            <Route path="probate-guide" element={<ProbateGuide />} />
            <Route path="important-documents" element={<ImportantDocuments />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
      {/* Global scroll to top button */}
      <ScrollTopButton />
    </>
  )
}

export default App