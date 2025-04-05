import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FindingWill() {
  const [progress, setProgress] = useState(0);
  
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
          to="/checklist?returnToChecklist=true" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
          onClick={() => {
            console.log("Returning to checklist with saved state");
          }}
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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">How to Find a Will</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/Finding a will.jpg" 
              alt="Last will and testament document" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                Guidance on locating important documents after the loss of a loved one
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Locating a loved one's will is often the first step in settling their estate and making sure their wishes are honored. This guide walks you through where to look, what to do when you find it, and how to move forward—clearly and compassionately.
          </p>
        </motion.div>
        
        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              Finding a will quickly helps ensure your loved one's final wishes are honored and can simplify the estate settlement process.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              Common Places to Look
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    At Home
                  </h3>
                  <ul className="space-y-3 text-[#6c757d]">
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Home office or filing cabinets</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Desk drawers or bookshelves</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Personal safes or lockboxes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Digital files on computer or cloud storage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Professional Storage
                  </h3>
                  <ul className="space-y-3 text-[#6c757d]">
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Bank safe deposit box</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Attorney's office</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Estate planner or financial advisor</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Local probate court (if previously filed)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Online will storage services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Steps to Find a Will
            </h2>
            
            <div className="relative pb-12">
              {/* Timeline connector */}
              <div className="absolute left-8 top-0 h-full w-1 bg-[#6266ea]/20 rounded-full"></div>
              
              {/* Step 1 */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 bg-[#6266ea] rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                      1
                    </div>
                  </div>
                  <div className="ml-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#6266ea] flex items-center">
                        Search Personal Papers
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Start with a thorough search of your loved one's home and personal belongings.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Look through folders labeled "Legal," "Estate," or "Personal Documents."</li>
                        <li>Check any secure areas, like safes, lockboxes, or hidden drawers.</li>
                        <li>Don't forget digital files—search computer folders or cloud accounts for scanned copies.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 bg-[#6266ea] rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                      2
                    </div>
                  </div>
                  <div className="ml-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#6266ea] flex items-center">
                        Contact Their Attorney
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Attorneys often keep wills on file, especially if they helped draft them.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>If you know the name of their lawyer, reach out and ask if they retain a copy.</li>
                        <li>Check mail or personal items for business cards or legal correspondence.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 bg-[#6266ea] rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                      3
                    </div>
                  </div>
                  <div className="ml-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#6266ea] flex items-center">
                        Check Safe Deposit Box
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Safe deposit boxes are common places for storing important documents like wills.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Contact their bank to ask if your loved one had a box in their name.</li>
                        <li>Be ready to provide:
                          <ul className="list-disc pl-6 mt-2">
                            <li>A certified copy of the death certificate</li>
                            <li>Proof of relationship or legal authority (e.g., executor paperwork)</li>
                          </ul>
                        </li>
                        <li>Ask the bank about the specific access process and required documents.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 bg-[#6266ea] rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                      4
                    </div>
                  </div>
                  <div className="ml-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#6266ea] flex items-center">
                        Consult Family Members
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Family members may have valuable information about the will's location.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Ask if anyone knows where the will might be stored.</li>
                        <li>Find out if your loved one ever discussed their final wishes.</li>
                        <li>See if someone was named executor or was present during planning.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute left-0 top-0 bg-[#6266ea] rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                      5
                    </div>
                  </div>
                  <div className="ml-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#6266ea] flex items-center">
                        Check County Records
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Some courts allow people to pre-file a will for safekeeping.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Call or visit the probate court in the county where your loved one lived.</li>
                        <li>Some courts allow people to pre-file a will for safekeeping.</li>
                        <li>If you locate it, follow the court's process for accessing or filing it.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <svg className="w-6 h-6 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              If You Find the Will
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3 text-[#6c757d]">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keep the original in a safe place — don't write on or alter it.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Make copies for your records and for the court, if needed.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contact the named executor to begin the legal process.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-[#6c757d]">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>File the will with the probate court in your loved one's county.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Notify the people named in the will.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consider consulting a probate attorney if the estate is complex.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              If No Will is Found
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <p className="mb-4 text-[#6c757d] text-lg">If no will exists, the estate is handled according to state laws (called "intestate succession").</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="list-disc pl-6 space-y-3 text-[#6c757d] text-lg">
                      <li>A court-appointed administrator will manage the estate.</li>
                      <li>Close family members may need to file a petition for this role.</li>
                      <li>Property is typically distributed to spouses, children, or next of kin.</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc pl-6 space-y-3 text-[#6c757d] text-lg">
                      <li>Consider speaking with a probate attorney for help navigating the process.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section 
          className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
            <svg className="w-6 h-6 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Tips
          </h2>
          <ul className="space-y-3 text-[#6c757d]">
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Start early.</span>
              Begin searching as soon as you can after the death.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Keep notes.</span>
              Track where you've looked and who you've contacted.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Bring ID.</span>
              Be prepared to show proof of relationship or executor status.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Ask for help.</span>
              If things get complicated, don't hesitate to contact a probate lawyer.
            </li>
          </ul>
        </motion.section>

        {/* Supportive Quote */}
        <div className="my-12 p-8 bg-[#f8f9fa] rounded-xl text-center">
          <svg className="w-10 h-10 text-[#6266ea] mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl text-[#6c757d] italic mb-4">
            "Finding a will is often the first step in honoring a loved one's wishes. The time spent searching can provide clarity and peace for all involved during a difficult time."
          </p>
          <p className="text-[#6266ea] font-medium">Purple Hub Support Team</p>
        </div>

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
                src="/Legal.jpg"
                alt="Important documents"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">Important Documents</h3>
                <p className="text-[#6c757d] text-sm mb-4">Guide to the essential paperwork needed after the loss of a loved one.</p>
                <Link to="/learn/important-documents" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

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
                src="/Community Support.jpg"
                alt="Collecting memories"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">Collecting and Preserving Memories</h3>
                <p className="text-[#6c757d] text-sm mb-4">Guide to gathering and preserving meaningful memories of your loved one.</p>
                <Link to="/learn/collecting-memories" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
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
          to="/checklist?returnToChecklist=true" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
          onClick={() => {
            console.log("Returning to checklist with saved state");
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
        
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#6266ea] text-white rounded-md shadow-sm flex items-center gap-2 transition-colors hover:bg-[#4232c2]"
            onClick={() => window.print()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white border border-[#6266ea] text-[#6266ea] rounded-md shadow-sm flex items-center gap-2 transition-colors hover:bg-[#6266ea]/5"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'How to Find a Will',
                  text: 'Guide to finding and handling a will after the loss of a loved one',
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </motion.button>
        </div>
      </div>
    </div>
  );
} 