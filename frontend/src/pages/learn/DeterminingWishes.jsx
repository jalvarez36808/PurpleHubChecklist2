import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DeterminingWishes() {
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

  const relatedArticles = [
    {
      title: "Deciding on a Cremation or Burial",
      description: "Understand your options for a loved one's remains and factors to consider when making this important decision.",
      image: "/Loved-Ones-Cremated-Remains-600x400.jpg",
      link: "/learn/understanding-remains-options"
    },
    {
      title: "Body Transportation",
      description: "Learn about the logistics of transporting your loved one's body and what to expect during this process.",
      image: "/Transportation accross states.jpeg",
      link: "/learn/body-transportation"
    },
    {
      title: "Important Documents",
      description: "Guide to the essential paperwork needed after the loss of a loved one.",
      image: "/Legal.jpg",
      link: "/learn/important-documents"
    }
  ];

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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Determining Your Loved One's Wishes</h1>
          
          {/* Hero Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/When a Death Occurs.jpeg" 
              alt="Family discussing important matters" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                Honoring your loved one's final wishes with dignity and respect
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Understanding your loved one's final wishes can help guide important decisions regarding their remains, 
            memorial services, and estate matters. If no prior arrangements were made, taking the time to review 
            available documents and discuss options with family members can ensure their wishes are honored respectfully.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6 flex items-center">
            <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            How to Determine Their Wishes
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">1</span>
                Check for Legal Documents
              </h3>
              <div className="pl-9">
                <img 
                  src="/Sifting for documents.jpg" 
                  alt="Magnifying glass examining documents" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Look for a will, advance directive, or estate planning documents that may outline final wishes.</li>
                  <li>Review any prepaid funeral or burial plans or insurance policies that include funeral expenses.</li>
                  <li>Search for a written statement or letter of instruction regarding burial, cremation, or donation.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">2</span>
                Review Personal Records & Communications
              </h3>
              <div className="pl-9 bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#212529]">Personal Documents</h4>
                    <p className="text-[#6c757d] text-sm">Safe deposit boxes, file cabinets, and personal storage may contain important information.</p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-[#6266ea]/10 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#212529]">Digital Records</h4>
                    <p className="text-[#6c757d] text-sm">Email accounts, cloud storage, or password-protected files might contain directives.</p>
                  </div>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Check safe deposit boxes, personal files, or digital records for any notes on end-of-life preferences.</li>
                  <li>Speak with attorneys, financial advisors, or close family members who may have insight into the deceased's wishes.</li>
                  <li>Consider reviewing past conversations where they may have shared their preferences verbally.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">3</span>
                Consult Family Members & Close Friends
              </h3>
              <div className="pl-9">
                <img 
                  src="/Community Support.jpg" 
                  alt="Family discussing important decisions" 
                  className="w-full h-72 object-cover object-top rounded-md mb-4"
                />
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>If no written instructions exist, discuss with immediate family and close friends to see if the deceased ever expressed their preferences informally.</li>
                  <li>If there are conflicting opinions, work together to make a decision that best reflects the deceased's values and beliefs.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">4</span>
                Consider Religious and Cultural Beliefs
              </h3>
              <div className="pl-9">
                <div className="bg-[#f8f9fa] p-5 rounded-lg">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="bg-white px-3 py-2 rounded-full text-sm font-medium text-[#6266ea] border border-[#6266ea]/20">
                      <span>Religious Traditions</span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-full text-sm font-medium text-[#6266ea] border border-[#6266ea]/20">
                      <span>Cultural Practices</span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-full text-sm font-medium text-[#6266ea] border border-[#6266ea]/20">
                      <span>Family Heritage</span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-full text-sm font-medium text-[#6266ea] border border-[#6266ea]/20">
                      <span>Spiritual Preferences</span>
                    </div>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                    <li>Many traditions have specific customs regarding burial, cremation, or body donation.</li>
                    <li>If no instructions were left, consider what would best align with both the deceased's values and family preferences.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">5</span>
                Explore Practical Considerations
              </h3>
              <div className="pl-9">
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>If no explicit wishes were left, consider financial, logistical, and emotional factors when making a decision.</li>
                  <li>Ensure decisions align with legal requirements in your state regarding burial, cremation, or donation.</li>
                  <li>Funeral homes and cremation providers can guide legal next steps.</li>
                </ul>

                <div className="bg-[#6266ea]/5 p-4 rounded-lg mt-4">
                  <h4 className="font-medium text-[#212529] mb-2 flex items-center">
                    <svg className="w-5 h-5 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Timeline Considerations
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-[#6c757d] mb-2">
                    <div className="bg-[#6266ea] w-2 h-2 rounded-full"></div>
                    <p><span className="font-medium text-[#212529]">Immediate decisions</span> - Within 24-48 hours</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6c757d] mb-2">
                    <div className="bg-[#6266ea] w-2 h-2 rounded-full"></div>
                    <p><span className="font-medium text-[#212529]">Service planning</span> - Within 3-7 days</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6c757d]">
                    <div className="bg-[#6266ea] w-2 h-2 rounded-full"></div>
                    <p><span className="font-medium text-[#212529]">Legal matters</span> - Ongoing for several months</p>
                  </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Handling Situations Where No Wishes Were Stated
          </h2>
          
          <div className="mb-6">
            <p className="text-[#6c757d] mb-4 text-lg">
              If no formal plans were made, the legal next of kin typically has the authority to decide on final arrangements.
            </p>
            <h4 className="text-lg font-medium text-[#6266ea] mb-4">In such cases, consider the following:</h4>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <h3 className="text-xl font-semibold text-[#212529] mb-4">Decision-Making Process</h3>
            <ul className="list-disc pl-6 space-y-4 text-[#6c757d]">
              <li className="pb-4 border-b border-gray-100">
                <span className="font-medium text-[#212529] block mb-1">Family Consensus</span>
                Family discussions should aim for consensus, keeping in mind what would best honor the individual.
              </li>
              <li className="pb-4 border-b border-gray-100">
                <span className="font-medium text-[#212529] block mb-1">Professional Guidance</span>
                Consulting a funeral home, cremation provider, or estate attorney can provide guidance on legal requirements and available options.
              </li>
              <li>
                <span className="font-medium text-[#212529] block mb-1">Conflict Resolution</span>
                If there are disputes, mediation services may help reach an agreement.
              </li>
            </ul>
          </div>
        </motion.section>

        <p className="text-[#6c757d] mt-8">
          Taking the time to determine a loved one's wishes can provide peace of mind and ensure their memory 
          is honored in a way that reflects their values and preferences.
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
            {relatedArticles.map((article, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-transform hover:transform hover:scale-105">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#212529] mb-2">{article.title}</h3>
                  <p className="text-[#6c757d] text-sm mb-4">{article.description}</p>
                  <Link to={article.link} className="text-[#6266ea] hover:text-[#4232c2] font-medium text-sm flex items-center">
                    Read Article
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Supportive Quote */}
        <div className="my-12 p-8 bg-[#f8f9fa] rounded-xl text-center">
          <svg className="w-10 h-10 text-[#6266ea] mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl text-[#6c757d] italic mb-4">
            "Honoring a loved one's wishes is the final gift we can give them—a testament to the respect and love we shared."
          </p>
          <p className="text-[#6266ea] font-medium">Purple Hub Support Team</p>
        </div>
      </article>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link 
          to="/checklist?section=1&category=Their+Wishes&item=Their+Wishes" 
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