import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Set page title when component mounts
    document.title = 'Privacy Policy | Purple Hub';
    // Scroll to top of page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-purple max-w-none">
        <p className="text-lg mb-6">Last Updated: March 27, 2025</p>
        
        <p className="mb-6">
          At Purple Hub, we're committed to protecting your privacy and handling your personal information with care. 
          This Privacy Policy outlines what data we collect, how it's stored, and how we keep it secure.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. What We Collect</h2>
        <p>When you create an account or use Purple Hub, we collect:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Email address and username</li>
          <li>Password (entered manually or via Google Sign-In)</li>
          <li>Documents you upload</li>
        </ul>
        <p>This information helps us personalize your experience and securely store your documents for future access.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How Your Data is Stored</h2>
        <p>
          All personal data and uploaded documents are securely stored in Supabase, our cloud database provider. 
          Your login credentials and uploaded files are tied to your individual account and not accessible by other users.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Supabase – to store user login information and uploaded documents.</li>
          <li>Netlify – used to host the Purple Hub website. Netlify itself does not collect any user data.</li>
        </ul>
        <p>We do not currently use Google Analytics, advertising tools, or any other third-party tracking services.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking</h2>
        <p>
          We do not use cookies or other tracking technologies for analytics or marketing. 
          Your data stays private and isn't used to track your activity across the internet.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p>
          We take your data security seriously. Passwords and documents are stored securely using Supabase's 
          encryption protocols. Access to this data is limited to authorized systems and protected with 
          standard authentication and encryption methods.
        </p>
      </div>
    </div>
  );
}
