import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UnderstandingRemainsOptions() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  
  // Function to navigate to checklist and open popup after page load
  const navigateToPopup = (popupName) => {
    // Store the popup name in sessionStorage so checklist can read it on load
    sessionStorage.setItem('openPopup', popupName);
    // Navigate to checklist page
    navigate('/checklist');
  };
  
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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Understanding Your Options for a Loved One's Remains</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/Loved-Ones-Cremated-Remains-600x400.jpg" 
              alt="Memorial options for remains" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Choosing between cremation, burial, or body donation is a deeply personal decision. If no prior arrangements were made, 
            family members will need to decide what best honors their loved one's wishes while considering practical, emotional and financial factors.
          </p>
        </motion.div>

        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              Understanding all available options helps ensure your decisions align with your loved one's wishes and your family's needs.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </span>
            Understand Your Options
          </h2>

          <div className="space-y-10">
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Burial
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">1</div>
                    What It Involves:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
                    <li>The body is placed in a casket and interred in a cemetery.</li>
                    <li>Options include traditional burial, green (eco-friendly) burial, or mausoleum entombment.</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">2</div>
                    Considerations:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d] mb-4">
                    <li>Requires embalming (in most cases), a burial plot, casket, and headstone.</li>
                    <li>Can be one of the more expensive options due to cemetery space and maintenance fees.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">3</div>
                    Financial Assistance:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Eligible veterans may receive <strong>free or subsidized burial</strong> through the <a href="https://www.cem.va.gov/" className="text-[#6266ea] hover:text-[#4232c2]">Veterans Affairs National Cemetery Administration</a>.</li>
                    <li>Some states or counties offer <strong>low-income burial assistance</strong>.</li>
                    <li>Direct burial (without a formal service) is often a more affordable option.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  Cremation
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">1</div>
                    What It Involves:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d] mb-4">
                    <li>The body is gently cremated, and the ashes can be kept, scattered, or buried.</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">2</div>
                    Considerations:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d] mb-4">
                    <li>Often more affordable and flexible than burial.</li>
                    <li>Some areas have legal restrictions on where ashes can be scattered.</li>
                    <li>Cultural views on cremation vary.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">3</div>
                    Financial Assistance:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d]">
                    <li>Some states and counties provide <strong>cremation assistance programs</strong> for low-income families.</li>
                    <li>Eligible veterans may receive <strong>cremation benefits</strong> through the <a href="https://www.cem.va.gov/" className="text-[#6266ea] hover:text-[#4232c2]">VA National Cemetery Administration</a>.</li>
                  </ul>
                  <p className="text-[#6c757d] mt-4 pl-2 italic text-sm border-l-2 border-[#6266ea]/30 py-1">
                    <strong>Note:</strong> Need guidance? See <a 
                      className="text-[#6266ea] hover:text-[#4232c2] cursor-pointer"
                      onClick={() => navigateToPopup("Scattering Ashes")}
                    >Scattering Ashes</a> for legal and location considerations.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#6266ea]/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-[#6266ea] flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Body Donation
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">1</div>
                    What It Involves:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d] mb-4">
                    <li>The entire body is donated for <strong>medical research, training, or education</strong>.</li>
                    <li>Many programs provide free cremation and return the ashes to the family, but policies vary.</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">2</div>
                    Considerations:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d] mb-4">
                    <li>Not all donors qualify due to medical restrictions.</li>
                    <li>Some programs charge transportation fees—check with providers.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <div className="bg-[#6266ea]/10 w-6 h-6 rounded-full text-[#6266ea] inline-flex items-center justify-center mr-2 text-xs font-bold">3</div>
                    How to Donate:
                  </h4>
                  <ul className="list-disc pl-10 space-y-2 text-[#6c757d]">
                    <li>Programs vary by state. Check <a href="https://www.sciencecare.com/locations" className="text-[#6266ea] hover:text-[#4232c2]">this list</a> for available options.</li>
                    <li>Some universities and nonprofit organizations offer direct donation programs.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        <motion.section 
          className="mt-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mb-6 flex items-center">
            <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Comparing the Costs of Each Option
          </h2>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 p-1">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#6266ea]/5">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-[#212529]">Option</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-[#212529]">Average Cost</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-[#212529]">Additional Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-[#6266ea]">Burial</td>
                  <td className="border border-gray-200 px-4 py-3 font-medium">$7,000–$15,000+</td>
                  <td className="border border-gray-200 px-4 py-3 text-[#6c757d]">Cemetery plot, embalming, casket, headstone, maintenance fees</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium text-[#6266ea]">Cremation</td>
                  <td className="border border-gray-200 px-4 py-3 font-medium">$1,000–$5,000</td>
                  <td className="border border-gray-200 px-4 py-3 text-[#6c757d]">Urn, memorial service, scattering fees (if applicable)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-[#6266ea]">Body Donation</td>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Usually Free</td>
                  <td className="border border-gray-200 px-4 py-3 text-[#6c757d]">Some programs may charge transport or admin fees</td>
                </tr>
              </tbody>
            </table>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Questions to Ask Yourself
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-[#6c757d]">
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Did my loved one express a preference?</span>
              Honoring their wishes is often the most important consideration.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Does my religious or cultural background influence this decision?</span>
              Consider traditions that might guide this choice.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">What financial resources are available?</span>
              Budget constraints might influence available options.
            </li>
            <li className="pb-2 border-b border-[#6266ea]/10">
              <span className="font-medium text-[#212529] block">Do I want to keep a physical resting place?</span>
              Some find comfort in having a specific place to visit.
            </li>
            <li>
              <span className="font-medium text-[#212529] block">Would I like a memorial service? If so, when and where?</span>
              Memorial services can be held regardless of the option chosen.
            </li>
          </ul>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
            Next Steps in Making Arrangements
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#6266ea] text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#212529] mb-2">If choosing burial or cremation</h3>
                    <p className="text-[#6c757d]">Contact a funeral home or cremation provider as soon as possible. They can guide you through the entire process and help with necessary paperwork.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#6266ea] text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#212529] mb-2">If considering body donation</h3>
                    <p className="text-[#6c757d]">Contact a donation program to check eligibility and requirements. Act quickly as there are often time constraints for donation acceptance.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#6266ea] text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#212529] mb-2">For financial assistance</h3>
                    <p className="text-[#6c757d]">Ask the funeral home or local government about aid programs that may help cover costs. Don't hesitate to inquire about payment plans or reduced-cost options.</p>
                  </div>
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
            "Each choice we make to honor our loved ones becomes part of their legacy—a final expression of our enduring love and respect."
          </p>
          <p className="text-[#6266ea] font-medium">Purple Hub Support Team</p>
        </div>

        <p className="text-[#6c757d] mt-8">
          Deciding how to honor a loved one's memory is deeply personal. While this choice can be difficult, focusing on what best reflects 
          their wishes and supports your family can help. Thoughtfully considering your options can bring peace of mind and ensure you make 
          the choice that feels right.
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