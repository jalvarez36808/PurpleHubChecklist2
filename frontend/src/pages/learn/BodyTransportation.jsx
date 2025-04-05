import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BodyTransportation() {
  const [activeAccordion, setActiveAccordion] = useState(null);
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

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
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
      title: "Important Documents",
      description: "Learn which documents are needed to settle financial, legal, and estate matters after a loss.",
      image: "/Legal.jpg",
      link: "/learn/important-documents"
    },
    {
      title: "Determining Wishes",
      description: "Guide to understanding and honoring your loved one's final wishes and preferences.",
      image: "/Community Support.jpg",
      link: "/learn/determining-wishes"
    }
  ];

  const faqItems = [
    {
      question: "How quickly should I arrange for transportation after death?",
      answer: "It's best to arrange transportation as soon as possible, ideally within a few hours. Most funeral homes offer 24/7 services and can help immediately after a death occurs."
    },
    {
      question: "What documentation is needed for body transportation?",
      answer: "Typically, you'll need a death certificate, burial transit permit (for crossing state lines), and in some cases, embalming verification. The funeral home or transport service usually handles these documents."
    },
    {
      question: "Is embalming required for transportation?",
      answer: "Embalming may be required for long-distance transportation, crossing state lines, or international transport. Local regulations vary, so check with your funeral provider about specific requirements."
    },
    {
      question: "How much does body transportation cost?",
      answer: "Local transportation is often included in basic funeral service fees. Long-distance transport can range from $1,000 to $5,000+ depending on distance and method. International transport may cost $10,000 or more."
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
          <h1 className="text-4xl font-bold text-[#212529] mb-8">Arranging Transportation of the Body</h1>
          
          {/* Hero Banner Image - Using airplane.jpg */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src="/airplane.jpg" 
              alt="Airplane flying in a dusky pink sky" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <p className="text-white text-xl font-medium px-8 max-w-2xl">
                Guidance for navigating body transportation arrangements with dignity and care
              </p>
            </div>
          </div>
          
          <p className="text-[#6c757d] mb-8">
            Making arrangements to transport a loved one's body can feel overwhelming, but knowing the right steps 
            can ease the process. Whether your loved one will be buried, cremated, or donated, ensuring their body 
            reaches the appropriate facility is a crucial first step.
          </p>
        </motion.div>

        {/* Feature Callout Box */}
        <div className="bg-[#f8f9fa] border-l-4 border-[#6266ea] p-4 rounded shadow-sm mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-[#6266ea] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#212529] font-medium">
              Most funeral homes offer 24/7 transportation services and can guide you through each step of the process.
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
            Who Handles Body Transportation?
          </h2>
          
          {/* Illustrated Information Card - Using "Funeral Home.jpg" */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <img 
                src="/Funeral Home.jpg" 
                alt="Funeral home with caskets" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Funeral homes and cremation providers typically arrange transport from a hospital, hospice, nursing home, or private residence.</li>
                <li>Hospitals and care facilities may provide short-term morgue storage while arrangements are made.</li>
                <li>Specialized transport services exist for cases involving long-distance transport or out-of-state relocation.</li>
              </ul>
            </div>
            <div className="bg-[#6266ea]/5 rounded-lg p-5 border border-[#6266ea]/10 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-[#212529] mb-4">Important Considerations</h3>
              <div className="flex items-start mb-3">
                <svg className="w-5 h-5 text-[#6266ea] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-[#6c757d]">Ensure the transportation provider is licensed and reputable.</p>
              </div>
              <div className="flex items-start mb-3">
                <svg className="w-5 h-5 text-[#6266ea] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-[#6c757d]">Ask about their availability and response time.</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#6266ea] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-[#6c757d]">Confirm all fees and what services are included.</p>
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
          <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6 flex items-center">
            <span className="bg-[#6266ea] text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            How to Arrange Transportation
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">1</span>
                Contact the Disposition Provider
              </h3>
              <div className="pl-9">
                <img 
                  src="/Contact disposition.png" 
                  alt="Woman researching funeral arrangements on her smartphone" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>If your loved one prearranged services, notify the funeral home, cremation provider, or body donation program.</li>
                  <li>If no plans were made, research local providers and select one that meets your needs.</li>
                  <li>Many funeral homes offer 24/7 transportation services and can assist immediately after a death.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">2</span>
                Provide Important Information
              </h3>
              <div className="pl-9">
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>Confirm pickup location (hospital, hospice, nursing home, private residence).</li>
                  <li>Inform the provider if your loved one had:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>A pacemaker or medical implants that must be removed before cremation.</li>
                      <li>Gold teeth or other valuables that you may wish to recover before disposition.</li>
                      <li>Jewelry or personal items to be kept by the family.</li>
                    </ul>
                  </li>
                  <li>If a viewing is planned, timely transportation is essential for preparation.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4 flex items-center">
                <span className="bg-[#6266ea] text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">3</span>
                Transportation for Out-of-State or International Travel
              </h3>
              <div className="pl-9">
                <img 
                  src="/Transportation accross states.jpeg" 
                  alt="Funeral professionals loading casket into hearse" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="bg-[#f8f9fa] p-4 rounded-lg mb-4">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={false}
                    pagination={{ 
                      clickable: true,
                      bulletActiveClass: 'swiper-pagination-bullet-active bg-[#6266ea]',
                      bulletClass: 'swiper-pagination-bullet bg-gray-300 inline-block w-3 h-3 rounded-full mx-1'
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    className="relative rounded-lg overflow-hidden h-64 group"
                  >
                    <SwiperSlide>
                      <div className="bg-[#6266ea]/10 h-full p-6 flex flex-col justify-center relative">
                        <div className="absolute top-4 right-4 bg-[#6266ea] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          1/3
                        </div>
                        <h4 className="text-lg font-semibold text-[#212529] mb-3">Domestic Transport Requirements</h4>
                        <p className="text-[#6c757d]">Most states require a burial transit permit when crossing state lines. Your funeral director can help arrange all necessary documentation.</p>
                        <div className="mt-3 flex">
                          <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="ml-2 text-sm text-[#6266ea] font-medium">Documentation is essential</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="bg-[#6266ea]/10 h-full p-6 flex flex-col justify-center relative">
                        <div className="absolute top-4 right-4 bg-[#6266ea] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          2/3
                        </div>
                        <h4 className="text-lg font-semibold text-[#212529] mb-3">International Transport</h4>
                        <p className="text-[#6c757d]">International transportation requires additional documentation, including consular approval, death certificates translated into the local language, and embalming verification.</p>
                        <div className="mt-3 flex">
                          <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="ml-2 text-sm text-[#6266ea] font-medium">Country-specific regulations apply</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="bg-[#6266ea]/10 h-full p-6 flex flex-col justify-center relative">
                        <div className="absolute top-4 right-4 bg-[#6266ea] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          3/3
                        </div>
                        <h4 className="text-lg font-semibold text-[#212529] mb-3">Air Transport</h4>
                        <p className="text-[#6c757d]">When transporting by air, bodies must be properly embalmed and contained in an approved shipping container. Airlines have specific requirements that must be followed.</p>
                        <div className="mt-3 flex">
                          <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="ml-2 text-sm text-[#6266ea] font-medium">Special containment needed</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    
                    {/* Custom Pagination */}
                    <div className="swiper-pagination !bottom-3"></div>
                  </Swiper>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                  <li>If your loved one needs to be transported to another state, check the legal requirements, as permits may be required.</li>
                  <li>Embalming or refrigeration may be necessary for long-distance transport.</li>
                  <li>If international transport is needed, contact the U.S. embassy or consulate in the destination country to understand specific regulations.</li>
                  <li>Many funeral homes coordinate with mortuary shipping services to handle documentation and transport logistics.</li>
                </ul>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Understanding Costs and Financial Assistance
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src="/Understanding costs.jpg" 
                alt="Professional analyzing financial documents on computer" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li><strong>Local transport (within the same city)</strong>: Usually included in funeral home or cremation service fees.</li>
                <li><strong>Long-distance transport (state-to-state or international)</strong>: Additional fees apply, and costs vary based on distance and required permits.</li>
                <li><strong>Veteran benefits</strong>: Eligible veterans may receive assistance with transportation and burial through the <a href="https://www.cem.va.gov/" className="text-[#6266ea] hover:text-[#4232c2]">VA National Cemetery Administration</a>.</li>
                <li><strong>Low-income assistance</strong>: Some states and counties provide financial aid for transportation and disposition—ask the funeral provider about available options.</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#212529] mb-4">Estimated Cost Ranges</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-[#6c757d] mb-1">
                    <span>Local Transportation (within city)</span>
                    <span className="font-medium">$150-$500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#6266ea] h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-[#6c757d] mb-1">
                    <span>State-to-State Transport</span>
                    <span className="font-medium">$1,000-$3,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#6266ea] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-[#6c757d] mb-1">
                    <span>International Transport</span>
                    <span className="font-medium">$6,000-$15,000+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#6266ea] h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
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
            <svg className="w-6 h-6 text-[#6266ea] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Legal Considerations for Body Transportation
          </h2>
          
          <img 
            src="/Legal Section.jpg" 
            alt="Person stamping legal documents" 
            className="w-full h-56 object-cover rounded-lg mb-6"
          />
          
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li>Most states require a burial transit permit for moving a body across county or state lines.</li>
            <li>If transporting remains by air, airlines have specific policies regarding embalming, packaging, and required documentation.</li>
            <li>Body donation programs often handle all necessary paperwork and transportation arrangements if your loved one has chosen donation.</li>
          </ul>
        </motion.section>

        {/* Interactive FAQ Accordion */}
        <motion.section 
          className="mt-12 bg-white border border-gray-200 rounded-xl shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-[#212529]">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <div key={index} className="p-6">
                <button
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-medium text-[#212529]">{item.question}</h3>
                  <svg
                    className={`w-5 h-5 text-[#6266ea] transition-transform ${
                      activeAccordion === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeAccordion === index && (
                  <div className="mt-4 text-[#6c757d] animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <p className="text-[#6c757d] mt-8">
          Considering this information will help ensure that your loved one is cared for with dignity and that 
          all necessary logistics are handled with professionalism and care.
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
            "In difficult times, compassionate guidance through practical matters can bring comfort and clarity."
          </p>
          <p className="text-[#6266ea] font-medium">Purple Hub Support Team</p>
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
      </div>
    </div>
  );
} 