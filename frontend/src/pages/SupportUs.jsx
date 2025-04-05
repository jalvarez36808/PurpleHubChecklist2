import { Link } from 'react-router-dom';

export default function SupportUs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            Support Our <span className="text-[#6266ea] font-normal">Mission</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your support helps us continue providing essential resources and support to those navigating through difficult times.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Buy Me a Coffee Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#6266ea]/10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#ffdd00] rounded-full p-4">
                <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Buy Me a Coffee</h2>
            <p className="text-gray-600 text-center mb-6">
              Support our work with a one-time contribution. Every coffee counts!
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.buymeacoffee.com/YOUR_USERNAME" // Replace with your Buy Me a Coffee username
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ffdd00] hover:bg-[#ffcc00] transition-colors duration-200"
              >
                <span className="mr-2">☕</span>
                Buy me a coffee
              </a>
            </div>
          </div>

          {/* Monthly Support Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#6266ea]/10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#6266ea]/10 rounded-full p-4">
                <svg className="w-8 h-8 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Become a Monthly Supporter</h2>
            <p className="text-gray-600 text-center mb-6">
              Join our community of monthly supporters and help us make a lasting impact.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.patreon.com/YOUR_USERNAME" // Replace with your Patreon username
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6266ea] hover:bg-[#4232c2] transition-colors duration-200"
              >
                <span className="mr-2">❤️</span>
                Support Monthly
              </a>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#6266ea]/10 mb-12">
          <h2 className="text-3xl font-light text-center mb-8">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6266ea] mb-2">100+</div>
              <p className="text-gray-600">Families Supported</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6266ea] mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6266ea] mb-2">1000+</div>
              <p className="text-gray-600">Resources Provided</p>
            </div>
          </div>
        </div>

        {/* Other Ways to Help */}
        <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-light text-center mb-6">Other Ways to Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Share Our Mission</h3>
                <p className="text-white/80">
                  Help spread the word about our platform on social media.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
                <p className="text-white/80">
                  Join our team of volunteers and help others directly.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Give Feedback</h3>
                <p className="text-white/80">
                  Share your suggestions to help us improve our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 