export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee]">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-white/90">
            <p className="text-sm"> 2025 Purple Hub. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
