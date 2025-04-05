import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CollectingMemories() {
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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Collecting and Preserving Memories</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/Community Support.jpg" 
              alt="Preserving memories of a loved one" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                Creating lasting tributes to honor your loved one's legacy
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Preserving memories of your loved one is an important part of the grieving process and helps keep their 
            legacy alive. This guide will help you gather and protect precious memories in various forms, creating 
            lasting tributes that can be shared with family and friends for generations to come.
          </p>
        </motion.div>

        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              Collecting memories is not just about preserving the past—it's about creating comfort and connection for the future.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
              Types of Memories to Collect
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Physical Items
                  </h3>
                </div>
                
                <div className="p-6">
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Photographs and photo albums</li>
                    <li>Letters and cards</li>
                    <li>Personal journals or diaries</li>
                    <li>Artwork or crafts</li>
                    <li>Important documents</li>
                    <li>Meaningful clothing or jewelry</li>
                    <li>Awards and certificates</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Digital Content
                  </h3>
                </div>
                
                <div className="p-6">
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Digital photos and videos</li>
                    <li>Social media posts and messages</li>
                    <li>Emails and text conversations</li>
                    <li>Voice recordings</li>
                    <li>Blog posts or online writings</li>
                    <li>Digital artwork or projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </span>
              Steps to Preserve Memories
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
                        Gather Physical Items
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Start by collecting tangible items that can serve as physical reminders of your loved one.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Create an inventory of important items</li>
                        <li>Sort items by type or time period</li>
                        <li>Handle delicate items with care</li>
                        <li>Consider using archival-quality storage materials</li>
                        <li>Label items with dates and context</li>
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
                        Digitize Important Items
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Creating digital copies ensures preservation and allows for easier sharing with family members.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Scan photographs and documents</li>
                        <li>Convert old video formats to digital</li>
                        <li>Record audio descriptions of items</li>
                        <li>Create digital backups</li>
                        <li>Store copies in multiple locations</li>
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
                        Collect Stories and Memories
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Personal narratives and shared experiences can be some of the most meaningful memories to preserve.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Interview family members and friends</li>
                        <li>Record or write down shared memories</li>
                        <li>Gather written tributes</li>
                        <li>Document family traditions</li>
                        <li>Create a memory book or journal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                className="relative"
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
                        Organize Digital Content
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4 text-[#6c757d] text-lg">Proper organization ensures memories are accessible and meaningful for years to come.</p>
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>Create organized digital folders</li>
                        <li>Use consistent naming conventions</li>
                        <li>Add metadata and tags</li>
                        <li>Back up to cloud storage</li>
                        <li>Share access with family members</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.section 
            className="bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <svg className="w-6 h-6 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Creative Ways to Honor Memories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3 text-[#6c757d]">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create a memorial website or blog</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Compile a video tribute</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Design a photo book or album</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Write a biography or life story</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-[#6c757d]">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create a memory quilt or shadowbox</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Plant a memorial garden</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#6266ea] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Establish a scholarship or foundation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.div
            className="mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
              <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Tips for Preserving Memories
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="list-disc pl-6 space-y-3 text-[#6c757d]">
                      <li>Start collecting memories as soon as possible</li>
                      <li>Include dates and context with items when possible</li>
                      <li>Use acid-free materials for physical storage</li>
                      <li>Make multiple copies of digital content</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc pl-6 space-y-3 text-[#6c757d]">
                      <li>Share preservation tasks with family members</li>
                      <li>Consider professional help for valuable or delicate items</li>
                      <li>Create a system for organizing and accessing memories</li>
                    </ul>
                  </div>
                </div>
              </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Considerations
            </h2>
            <ul className="space-y-3 text-[#6c757d]">
              <li className="pb-2 border-b border-[#6266ea]/10">
                <span className="font-medium text-[#212529] block">Take your time</span>
                Collecting memories can be emotionally challenging - proceed at your own pace.
              </li>
              <li className="pb-2 border-b border-[#6266ea]/10">
                <span className="font-medium text-[#212529] block">Involve other family members</span>
                Sharing the process can provide different perspectives and distribute the work.
              </li>
              <li className="pb-2 border-b border-[#6266ea]/10">
                <span className="font-medium text-[#212529] block">Be respectful of privacy</span>
                Consider what your loved one would have wanted shared or kept private.
              </li>
              <li className="pb-2 border-b border-[#6266ea]/10">
                <span className="font-medium text-[#212529] block">Create copies for multiple family members</span>
                This ensures more people have access to these precious memories.
              </li>
              <li>
                <span className="font-medium text-[#212529] block">Plan for long-term preservation</span>
                Consider how these memories will be accessed and maintained over time.
              </li>
            </ul>
          </motion.section>

          {/* Supportive Quote */}
          <div className="my-12 p-8 bg-[#f8f9fa] rounded-xl text-center">
            <svg className="w-10 h-10 text-[#6266ea] mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl text-[#6c757d] italic mb-4">
              "Memories are timeless treasures of the heart. Collecting them is an act of love that connects generations and preserves the essence of those we've lost."
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
        </div>
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
                  title: 'Collecting Memories',
                  text: 'Learn about collecting and preserving memories of your loved one',
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