import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ImportantDocuments() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  
  useEffect(() => {
    // Simulate reading progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.pageYOffset;
      const currentProgress = (scrollPosition / totalHeight) * 100;
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#6266ea]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-8">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Gathering Important Legal and Financial Documents</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/Legal.jpg" 
              alt="Important documents and paperwork" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                Organizing essential paperwork during a difficult time
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Certain documents are needed to settle financial, legal, and estate matters after a loved one's passing. 
            Collecting these papers early in the process can help ease the administrative burden during this difficult time.
          </p>
        </motion.div>

        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              Having organized documents streamlines the estate settlement process and reduces stress during an already challenging time.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6 flex items-center">
            <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Key Documents to Gather
          </h2>

          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M9 20h12a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2zm0 0V5a2 2 0 012-2h10a2 2 0 012 2v15M5 12a2 2 0 100-4 2 2 0 000 4zm0 0v7" />
                  </svg>
                  Legal & Financial Documents
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Will or trust documents</li>
                    <li>Death certificate (multiple certified copies)</li>
                    <li>Birth certificate</li>
                    <li>Marriage certificate or divorce papers</li>
                    <li>Tax returns (past 3-5 years)</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Bank statements and account information</li>
                    <li>Investment account statements</li>
                    <li>Mortgage documents or property deeds</li>
                    <li>Loan agreements and credit card statements</li>
                    <li>Safe deposit box information and keys</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Identification & Personal Records
                </h3>
              </div>
              
              <div className="p-6">
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Social Security card or number</li>
                  <li>Driver's license or state ID</li>
                  <li>Passport</li>
                  <li>Military discharge papers (DD-214)</li>
                  <li>Marriage license</li>
                  <li>Divorce decree</li>
                  <li>Citizenship papers (if applicable)</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Insurance & Benefits
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Life insurance policies</li>
                    <li>Health insurance cards and policies</li>
                    <li>Homeowner's or renter's insurance</li>
                    <li>Auto insurance</li>
                    <li>Long-term care insurance</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Employer benefits information</li>
                    <li>Pension or retirement account statements</li>
                    <li>401(k) or IRA documents</li>
                    <li>Annuity contracts</li>
                    <li>Veterans benefits information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Property & Accounts
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Property deeds and titles</li>
                    <li>Vehicle titles and registration</li>
                    <li>Boat or recreational vehicle documentation</li>
                    <li>Business ownership documents</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Digital account information (email, social media, etc.)</li>
                    <li>Subscription services</li>
                    <li>Utility account information</li>
                    <li>Lists of online accounts or passwords (if available)</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        <motion.section 
          className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
            <svg className="w-6 h-6 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Helpful Tips
          </h2>
          <div className="space-y-4">
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Create a filing system</p>
                <p className="text-[#6c757d] text-sm">Organize documents by category to easily locate what you need when dealing with various institutions.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Make copies</p>
                <p className="text-[#6c757d] text-sm">Create duplicates of important documents, especially when the originals must be submitted to various institutions.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Check the mail</p>
                <p className="text-[#6c757d] text-sm">Monitor mail for at least a month to identify unpaid bills, subscriptions, or accounts you might not be aware of.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Look in multiple locations</p>
                <p className="text-[#6c757d] text-sm">Important papers may be kept in filing cabinets, safes, desk drawers, or digital storage devices.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Contact professionals</p>
                <p className="text-[#6c757d] text-sm">Reach out to professionals who worked with your loved one (attorney, financial advisor, accountant) as they may have copies of important documents.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-[#212529] font-medium">Store documents securely</p>
                <p className="text-[#6c757d] text-sm">Keep all gathered documents in a waterproof, fireproof container or safe to protect these critical papers.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
            <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Where to Look for Documents
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">Filing cabinets or file boxes</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">Desk drawers or home office</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">Safe deposit boxes at banks</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">Home safes or lockboxes</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">With the deceased's attorney or financial advisor</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">Digital storage (computer files, email attachments, cloud storage)</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6266ea]/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-[#6c757d]">With trusted family members</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Supportive Quote */}
        <div className="my-12 p-8 bg-[#f8f9fa] rounded-xl text-center">
          <svg className="w-10 h-10 text-[#6266ea] mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl text-[#6c757d] italic mb-4">
            "When dealing with the paperwork after a loss, remember that organization isn't just about efficiency—it's about creating space for healing in the midst of practical matters."
          </p>
          <p className="text-[#6266ea] font-medium">Purple Hub Support Team</p>
        </div>

        <p className="text-[#6c757d] mt-8">
          Gathering these documents early in the process will help streamline the estate settlement process and ensure 
          you have the necessary paperwork when dealing with financial institutions, government agencies, and other organizations.
        </p>

        {/* Related Articles Section */}
        <motion.section 
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform hover:transform hover:scale-105">
              <img 
                src="/When a Death Occurs.jpeg"
                alt="Determining wishes"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">Determining Your Loved One's Wishes</h3>
                <p className="text-[#6c757d] text-sm mb-4">Understanding and honoring your loved one's final wishes with dignity and respect.</p>
                <Link to="/learn/determining-wishes" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform hover:transform hover:scale-105">
              <img 
                src="/Transportation accross states.jpeg"
                alt="Body transportation"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">Body Transportation</h3>
                <p className="text-[#6c757d] text-sm mb-4">Learn about the logistics of transporting your loved one's body and what to expect during this process.</p>
                <Link to="/learn/body-transportation" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform hover:transform hover:scale-105">
              <img 
                src="/Loved-Ones-Cremated-Remains-600x400.jpg"
                alt="Remains options"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">Understanding Remains Options</h3>
                <p className="text-[#6c757d] text-sm mb-4">Guide to understanding options for burial, cremation, and body donation.</p>
                <Link to="/learn/understanding-remains-options" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </article>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>
    </div>
  );
} 