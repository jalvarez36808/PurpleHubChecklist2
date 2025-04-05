import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProbateGuide() {
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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Probating an Estate Without a Will: A Step-by-Step Guide</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/Female-looking-through-documents.jpg" 
              alt="Woman searching through legal documents" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                A step-by-step guide to navigating the probate process when there is no will
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Losing a loved one is very painful, and the added responsibility of managing their estate without a will can feel overwhelming. 
            This guide aims to provide clear, concise steps to help you navigate the probate process during this challenging time.
          </p>
        </motion.div>
        
        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              When there is no will, state laws known as "intestate succession" determine how assets are distributed among heirs.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Understanding Intestate Succession
            </h2>
            <p className="text-[#6c757d] mb-4">
              When someone passes away without a will, they are said to have died "intestate." In such cases, state laws determine how the deceased's assets are distributed. 
              These laws, known as intestate succession laws, prioritize heirs based on their relationship to the deceased. Typically, the surviving spouse and children are first in line, 
              followed by other family members. It's important to note that intestate succession laws vary by state, so understanding your state's specific regulations is crucial.
            </p>
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
              Steps to Probate an Estate Without a Will
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
                        Initiate the Probate Process
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>
                          <span className="font-medium text-[#212529]">File a Petition with the Probate Court:</span> Begin by submitting a petition to the probate court in the county where the deceased resided. 
                          This legal step initiates the probate process and requests the court to appoint an estate administrator.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Appointment of an Administrator:</span> In the absence of a will, the court appoints an administrator to manage the estate. 
                          This individual is often a close family member, such as a spouse or adult child. The administrator's responsibilities mirror those of an executor, 
                          including settling debts and distributing assets.
                        </li>
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
                        Identify and Inventory Assets
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>
                          <span className="font-medium text-[#212529]">Gather Essential Documents:</span> Collect all pertinent financial records, property deeds, titles, 
                          and other relevant documents to identify the deceased's assets.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Create a Detailed Inventory:</span> List all assets, including real estate, bank accounts, investments, 
                          personal property, and any other valuables. This comprehensive inventory is vital for both the probate process and eventual asset distribution.
                        </li>
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
                        Notify Creditors and Settle Debts
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>
                          <span className="font-medium text-[#212529]">Inform Known Creditors:</span> Notify all known creditors of the deceased's passing, 
                          allowing them to present any claims against the estate.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Public Notice:</span> Publish a notice of death in local newspapers as required by state law. 
                          This public announcement serves to inform unknown creditors and provides them an opportunity to submit claims.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Review and Pay Claims:</span> Assess the validity of all claims and use estate funds to settle outstanding debts, 
                          including medical bills, loans, and taxes. It's essential to ensure all legitimate debts are paid before distributing assets to heirs.
                        </li>
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
                        Distribute Remaining Assets
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>
                          <span className="font-medium text-[#212529]">Follow State Intestate Succession Laws:</span> After settling debts, distribute the remaining assets 
                          according to your state's intestate succession laws. These laws dictate the hierarchy of heirs and the portion of the estate each is entitled to receive.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Transfer of Ownership:</span> Facilitate the legal transfer of assets to the rightful heirs, 
                          which may involve updating property titles, transferring financial accounts, and distributing personal belongings.
                        </li>
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
                        Close the Estate
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <ul className="list-disc pl-6 space-y-4 text-[#6c757d] text-lg">
                        <li>
                          <span className="font-medium text-[#212529]">Final Accounting:</span> Prepare a detailed report outlining all financial transactions conducted during the probate process, 
                          including asset distributions and debt settlements.
                        </li>
                        <li>
                          <span className="font-medium text-[#212529]">Court Approval:</span> Submit the final accounting to the probate court for review and approval. 
                          Once approved, the court will officially close the estate, concluding the administrator's responsibilities.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

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
              Additional Considerations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="list-disc pl-6 space-y-4 text-[#6c757d]">
                  <li className="pb-2">
                    <span className="font-medium text-[#212529] block">Seek Legal Assistance</span>
                    Probating an estate without a will can be complex. 
                    Consulting with an experienced probate attorney can provide valuable guidance, ensure compliance with state laws, and help navigate potential challenges.
                  </li>
                  <li className="pb-2">
                    <span className="font-medium text-[#212529] block">Understand State-Specific Laws</span>
                    Intestate succession laws vary by state. 
                    Familiarize yourself with your state's specific regulations to ensure the estate is administered correctly.
                  </li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-6 space-y-4 text-[#6c757d]">
                  <li className="pb-2">
                    <span className="font-medium text-[#212529] block">Timely Action</span>
                    Initiate the probate process promptly to prevent potential complications, 
                    such as asset depreciation or legal disputes among potential heirs.
                  </li>
                  <li className="pb-2">
                    <span className="font-medium text-[#212529] block">Communication with Heirs</span>
                    Keep all potential heirs informed about the probate process and any developments.
                    Open communication helps prevent misunderstandings and conflicts.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 p-6 bg-[#f8f9fa] rounded-lg border border-[#6266ea]/10"
          >
            <p className="text-[#6c757d] italic">
              Navigating the probate process without a will is undoubtedly challenging, but by following these structured steps and seeking appropriate support, 
              you can honor your loved one's legacy and ensure their assets are distributed fairly and lawfully.
            </p>
          </motion.div>

          {/* Supportive Quote */}
          <div className="my-12 p-8 bg-[#f8f9fa] rounded-xl text-center">
            <svg className="w-10 h-10 text-[#6266ea] mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl text-[#6c757d] italic mb-4">
              "During the difficult time following a loved one's passing, the probate process may seem overwhelming. Remember that you're not alone, and there are resources and professionals available to help guide you through each step."
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
                  src="/Finding a will.jpg"
                  alt="Finding a Will"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#212529] mb-2">How to Find a Will</h3>
                  <p className="text-[#6c757d] text-sm mb-4">Guide to locating a will and understanding what to do after finding one.</p>
                  <Link to="/learn/finding-will" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
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
                  src="/When a Death Occurs.jpeg"
                  alt="Managing finances"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#212529] mb-2">Managing Finances After Death</h3>
                  <p className="text-[#6c757d] text-sm mb-4">Tips for handling financial matters after the loss of a loved one.</p>
                  <Link to="/learn/managing-finances" className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center" target="_blank" rel="noopener noreferrer">
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
                  title: 'Probating an Estate Without a Will',
                  text: 'Guide to navigating the probate process when there is no will',
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