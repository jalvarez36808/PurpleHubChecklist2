import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

// Add animation classes
const fadeInUp = "opacity-0 translate-y-8 transition-all duration-700 ease-out";
const fadeInUpActive = "opacity-100 translate-y-0";
const fadeInLeft = "opacity-0 -translate-x-8 transition-all duration-700 ease-out";
const fadeInLeftActive = "opacity-100 translate-x-0";
const fadeInRight = "opacity-0 translate-x-8 transition-all duration-700 ease-out";
const fadeInRightActive = "opacity-100 translate-x-0";

// Hero carousel images that correspond to each text item
const carouselImages = [
  "/GrievingWoman.png",
  "/Casket.jpeg",
  "/car accident.jpg"
];

const carouselTexts = [
  {
    title: <>Compassionate Guidance for<br />Life's <span className="text-[#6266ea]">Difficult</span> Transitions</>,
    subtitle: "A personalized journey to help you navigate the process of end-of-life arrangements with gentle care and support at every step."
  },
  {
    title: <>Thoughtful <span className="text-[#6266ea]">Checklist</span><br />for Clarity</>,
    subtitle: "Our caring checklist breaks down overwhelming tasks into manageable steps, providing a sense of direction during this challenging time."
  },
  {
    title: <>Your <span className="text-[#6266ea]">Personal</span> Guide<br />Through Grief</>,
    subtitle: "More than just a checklist - we provide emotional support, resources, and guidance tailored to your unique situation."
  }
];

const dashboardFeatures = [
  {
    title: "Document Organization",
    description: "Securely store and organize essential documents like wills, death certificates, and insurance policies in one accessible place. No more searching through stacks of papers during an already overwhelming time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6266ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Progress Tracking",
    description: "Gently track your progress through necessary tasks, giving you a sense of accomplishment and direction. Our compassionate dashboard helps you focus on one step at a time without feeling overwhelmed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6266ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: "Personalized Guidance",
    description: "Receive gentle reminders and thoughtful guidance tailored to your specific situation. Our dashboard adapts to your needs, providing relevant resources exactly when you need them.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6266ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  },
  {
    title: "File Uploads & Storage",
    description: "Easily upload and store digital copies of important documents. Keep everything securely organized in one place, accessible whenever you need them during this difficult time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6266ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    )
  }
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState({});
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isFeatureVisible, setIsFeatureVisible] = useState(true);

  const nextSlide = () => {
    setIsTextVisible(false);
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % carouselTexts.length);
      setIsTextVisible(true);
      setIsImageVisible(true);
    }, 500);
  };

  const prevSlide = () => {
    setIsTextVisible(false);
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentTextIndex((prev) => (prev - 1 + carouselTexts.length) % carouselTexts.length);
      setIsTextVisible(true);
      setIsImageVisible(true);
    }, 500);
  };

  const nextFeature = () => {
    setIsFeatureVisible(false);
    setTimeout(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % dashboardFeatures.length);
      setIsFeatureVisible(true);
    }, 500);
  };

  const prevFeature = () => {
    setIsFeatureVisible(false);
    setTimeout(() => {
      setCurrentFeatureIndex((prev) => (prev - 1 + dashboardFeatures.length) % dashboardFeatures.length);
      setIsFeatureVisible(true);
    }, 500);
  };

  useEffect(() => {
    const textInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(nextFeature, 6000);
    return () => clearInterval(featureInterval);
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntersecting(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative min-h-[500px] sm:min-h-[600px] h-auto md:h-[calc(100vh-64px)] overflow-hidden">
        {/* Hero Images */}
        <div className="absolute inset-0 w-full h-full">
          {carouselImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentTextIndex === index && isImageVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Hero image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'grayscale(15%) brightness(0.95)',
                  opacity: 0.85
                }}
              />
              <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#6266ea]/20 to-[#6266ea]/30 mix-blend-overlay z-10" />
          
          {/* Additional Purple Accent */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#6266ea]/15 mix-blend-multiply z-10" />
        </div>
        
        {/* Content - Overlaid on image on both mobile and desktop */}
        <div className="relative z-20 h-full">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-start md:items-center pt-16 sm:pt-20 md:pt-0">
              {/* Text Content */}
              <div 
                className={`w-full transition-opacity duration-500 ${
                  isTextVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="max-w-3xl lg:pl-8 xl:pl-20">
                  {/* Award Badge */}
                  <div className="inline-block mb-3 sm:mb-6">
                    <Link to="/checklist">
                      <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-200 animate-pulse">
                        🏆 Award-Winning Checklist
                      </div>
                    </Link>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-[#212529] mb-3 sm:mb-4 md:mb-8">
                    {carouselTexts[currentTextIndex].title}
                  </h1>
                  <div className="h-1 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] mb-3 sm:mb-4 md:mb-8 rounded-full shadow-lg" />
                  <p className="text-sm sm:text-base md:text-xl text-[#6c757d] max-w-2xl">
                    {carouselTexts[currentTextIndex].subtitle}
                  </p>
                  <div className="mt-4 sm:mt-6 md:mt-10">
                    <Link
                      to="/signup"
                      className="inline-block px-5 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 border-2 border-[#6266ea] text-[#6266ea] text-sm md:text-base font-medium rounded-md hover:bg-[#6266ea] hover:text-white transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-30">
          {carouselTexts.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === currentTextIndex 
                  ? 'w-4 sm:w-6 md:w-8 bg-[#6266ea]' 
                  : 'w-1.5 sm:w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Work Section with To-Do List */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div 
            id="work-text"
            data-animate
            className={`text-center lg:text-left ${fadeInLeft} ${
              isIntersecting['work-text'] ? fadeInLeftActive : ''
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-[#212529] mb-4 sm:mb-6 leading-tight">
              Your <span className="text-[#6266ea] font-normal">Companion</span> Through Each Step
            </h2>
            <p className="text-base sm:text-lg text-[#6c757d] max-w-xl mx-auto lg:mx-0 mb-6">
              Our compassionate checklist system guides you through each aspect of end-of-life arrangements, providing clarity and support when you need it most.
            </p>
            <Link
              to="/checklist"
              className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span>View Checklist</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>

          {/* To-Do List Card */}
          <div 
            id="todo-card"
            data-animate
            className={`bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-[#6266ea]/10 relative overflow-hidden mt-6 lg:mt-0 ${fadeInRight} ${
              isIntersecting['todo-card'] ? fadeInRightActive : ''
            }`}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6266ea]/5 to-[#7c80ee]/5 rounded-full blur-2xl transform -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6266ea]/5 to-[#7c80ee]/5 rounded-full blur-xl transform translate-x-6 translate-y-6"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#6266ea] flex flex-wrap items-center">
                  <span className="mr-2">Personal Guide</span>
                  <span className="text-xs bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-white px-2 py-1 rounded-full mt-1 sm:mt-0">
                    Step by Step
                  </span>
                </h3>
              </div>
              
              <div className="mb-6">
                <div className="bg-[#6266ea]/5 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                  <div className="flex items-center mb-2">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-[#6266ea]/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#6266ea] font-bold">1</span>
                    </div>
                    <span className="font-medium text-gray-800">Initial Steps</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">Immediate arrangements and notifications</p>
                </div>
                
                <div className="bg-[#6266ea]/5 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                  <div className="flex items-center mb-2">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-[#6266ea]/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#6266ea] font-bold">2</span>
                    </div>
                    <span className="font-medium text-gray-800">Documentation</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">Gathering essential legal and financial documents</p>
                </div>
                
                <div className="bg-[#6266ea]/5 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-[#6266ea]/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#6266ea] font-bold">3</span>
                    </div>
                    <span className="font-medium text-gray-800">Long-term Planning</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">Estate settlement and future arrangements</p>
                </div>
              </div>
            </div>
            {/* Enhanced Checklist Link Icon - Hide on small screens */}
            <Link 
              to="/checklist" 
              className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 group hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-[#6266ea]/10 to-[#7c80ee]/10 rounded-full p-3 sm:p-4 group-hover:from-[#6266ea]/20 group-hover:to-[#7c80ee]/20 transition-all duration-300">
                <ClipboardDocumentListIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#6266ea] transform group-hover:rotate-3 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#212529] mb-4">
              Guiding You <span className="text-[#6266ea] font-normal">Through Difficult Times</span>
            </h2>
            <p className="text-[#6c757d] max-w-2xl mx-auto">
              Hear from others who have found clarity and comfort using our personalized checklist system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {/* Testimonial 1 */}
            <div 
              id="testimonial-1"
              data-animate
              className={`bg-white p-5 sm:p-8 rounded-xl shadow-md border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['testimonial-1'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.1s"}}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6266ea]/20 flex items-center justify-center text-[#6266ea] font-bold flex-shrink-0">
                  M
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-[#212529]">Michael R.</h4>
                  <p className="text-sm text-[#6c757d]">Lost his father</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#6c757d] italic">
                "This checklist gave me structure during a chaotic time. It helped me manage all the necessary tasks while giving me space to grieve."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div 
              id="testimonial-2"
              data-animate
              className={`bg-white p-5 sm:p-8 rounded-xl shadow-md border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['testimonial-2'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.2s"}}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6266ea]/20 flex items-center justify-center text-[#6266ea] font-bold flex-shrink-0">
                  S
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-[#212529]">Sarah L.</h4>
                  <p className="text-sm text-[#6c757d]">Lost her grandmother</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#6c757d] italic">
                "The detailed guides and resources made a world of difference. I didn't feel alone navigating the complex paperwork and arrangements."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div 
              id="testimonial-3"
              data-animate
              className={`bg-white p-5 sm:p-8 rounded-xl shadow-md border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['testimonial-3'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.3s"}}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6266ea]/20 flex items-center justify-center text-[#6266ea] font-bold flex-shrink-0">
                  J
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-[#212529]">Jennifer T.</h4>
                  <p className="text-sm text-[#6c757d]">Lost her spouse</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#6c757d] italic">
                "Having a clear path to follow during the most difficult time of my life was invaluable. The emotional support resources were especially helpful."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#212529] mb-4">
            How Our <span className="text-[#6266ea] font-normal">Checklist</span> Works
          </h2>
          <p className="text-[#6c757d] max-w-2xl mx-auto">
            A compassionate, step-by-step approach to guide you through each necessary task
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div 
            id="step-1"
            data-animate
            className={`relative ${fadeInUp} ${
              isIntersecting['step-1'] ? fadeInUpActive : ''
            }`}
            style={{animationDelay: "0.1s"}}
          >
            <div className="absolute -left-2 sm:-left-4 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6266ea] text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg z-10">
              1
            </div>
            <div className="ml-4 sm:ml-5 pt-3 pl-4 sm:pl-6 pr-3 sm:pr-4 pb-6 bg-white rounded-xl shadow-md border border-[#6266ea]/10 relative overflow-hidden min-h-[280px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6266ea]/5 rounded-full blur-2xl transform -translate-x-20 -translate-y-20"></div>
              
              <h3 className="text-lg sm:text-xl font-bold text-[#212529] mb-3 sm:mb-4 mt-2">Organized Checklist</h3>
              <p className="text-[#6c757d] mb-4">
                Access your personalized checklist, broken down into manageable categories and tasks with clear instructions and resources.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Track progress as you complete tasks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Detailed explanations for each step</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Step 2 */}
          <div 
            id="step-2"
            data-animate
            className={`relative ${fadeInUp} ${
              isIntersecting['step-2'] ? fadeInUpActive : ''
            }`}
            style={{animationDelay: "0.2s"}}
          >
            <div className="absolute -left-2 sm:-left-4 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6266ea] text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg z-10">
              2
            </div>
            <div className="ml-4 sm:ml-5 pt-3 pl-4 sm:pl-6 pr-3 sm:pr-4 pb-6 bg-white rounded-xl shadow-md border border-[#6266ea]/10 relative overflow-hidden min-h-[280px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6266ea]/5 rounded-full blur-2xl transform -translate-x-20 -translate-y-20"></div>
              
              <h3 className="text-lg sm:text-xl font-bold text-[#212529] mb-3 sm:mb-4 mt-2">Comprehensive Dashboard</h3>
              <p className="text-[#6c757d] mb-4">
                Begin with a dashboard that helps us understand your specific situation and organize your tasks during this difficult time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Tailored to your relationship to the deceased</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Adjusts based on immediate priorities</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Step 3 */}
          <div 
            id="step-3"
            data-animate
            className={`relative ${fadeInUp} ${
              isIntersecting['step-3'] ? fadeInUpActive : ''
            }`}
            style={{animationDelay: "0.3s"}}
          >
            <div className="absolute -left-2 sm:-left-4 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6266ea] text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg z-10">
              3
            </div>
            <div className="ml-4 sm:ml-5 pt-3 pl-4 sm:pl-6 pr-3 sm:pr-4 pb-6 bg-white rounded-xl shadow-md border border-[#6266ea]/10 relative overflow-hidden min-h-[280px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6266ea]/5 rounded-full blur-2xl transform -translate-x-20 -translate-y-20"></div>
              
              <h3 className="text-lg sm:text-xl font-bold text-[#212529] mb-3 sm:mb-4 mt-2">Learning Pages</h3>
              <p className="text-[#6c757d] mb-4">
                Access in-depth educational content about various aspects of end-of-life arrangements and grief support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Extensive knowledge resources</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#6266ea] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#6c757d]">Step-by-step guides and tutorials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Features Section */}
      <div className="bg-gray-50 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#212529] mb-4">
              Your <span className="text-[#6266ea] font-normal">Personal Dashboard</span>
            </h2>
            <p className="text-[#6c757d] max-w-2xl mx-auto">
              A secure space to organize important documents and track your progress during this difficult time
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div 
              id="dashboard-image"
              data-animate
              className={`rounded-xl overflow-hidden shadow-lg border border-[#6266ea]/10 ${fadeInLeft} ${
                isIntersecting['dashboard-image'] ? fadeInLeftActive : ''
              }`}
            >
              <div className="relative bg-gradient-to-br from-[#6266ea]/10 to-[#7c80ee]/10 p-3 sm:p-4 md:p-6 lg:p-8 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6266ea]/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6266ea]/10 rounded-full blur-lg"></div>
                
                <div className="relative bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#6266ea] flex items-center justify-center text-white mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Your Progress Overview</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-1 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">Important Documents</span>
                        <span className="text-[#6266ea]">4/7 Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-1.5 sm:h-2 rounded-full" style={{width: "57%"}}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-1 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">Notifications</span>
                        <span className="text-[#6266ea]">10/12 Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-1.5 sm:h-2 rounded-full" style={{width: "83%"}}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-1 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">Arrangements</span>
                        <span className="text-[#6266ea]">2/5 Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-1.5 sm:h-2 rounded-full" style={{width: "40%"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              id="dashboard-text"
              data-animate
              className={`space-y-5 sm:space-y-6 mt-6 lg:mt-0 ${fadeInRight} ${
                isIntersecting['dashboard-text'] ? fadeInRightActive : ''
              }`}
            >
              {/* Feature Carousel */}
              <div className="relative">
                {/* Feature Card */}
                <div 
                  className={`bg-white p-4 sm:p-6 rounded-xl shadow-md border border-[#6266ea]/10 transition-opacity duration-500 ${
                    isFeatureVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ minHeight: '220px' }}
                >
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="bg-[#6266ea]/10 p-2 rounded-lg mb-3 sm:mb-0 sm:mr-4">
                      {dashboardFeatures[currentFeatureIndex].icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-2 sm:mb-3">
                        {dashboardFeatures[currentFeatureIndex].title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {dashboardFeatures[currentFeatureIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={prevFeature}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-[#6266ea]/20 text-[#6266ea] hover:bg-[#6266ea]/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Feature Indicators */}
                  <div className="flex space-x-2">
                    {dashboardFeatures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsFeatureVisible(false);
                          setTimeout(() => {
                            setCurrentFeatureIndex(index);
                            setIsFeatureVisible(true);
                          }, 500);
                        }}
                        className={`w-2 h-2 rounded-full ${
                          currentFeatureIndex === index
                            ? 'bg-[#6266ea]'
                            : 'bg-[#6266ea]/30'
                        }`}
                        aria-label={`Go to feature ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextFeature}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-[#6266ea]/20 text-[#6266ea] hover:bg-[#6266ea]/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="text-center sm:text-left mt-5 sm:mt-6">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span>Access Your Dashboard</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative bg-gradient-to-br from-[#6266ea] to-[#7c80ee] py-10 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="resources-header"
            data-animate
            className={`text-center ${fadeInUp} ${
              isIntersecting['resources-header'] ? fadeInUpActive : ''
            }`}
          >
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-0.5 w-4 sm:w-6 bg-white/30"></div>
                <span className="text-white/90 uppercase text-xs sm:text-sm tracking-wider font-medium">Explore Our</span>
                <div className="h-0.5 w-4 sm:w-6 bg-white/30"></div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
              Supportive <span className="font-normal relative inline-block">
                Resources
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white/20 rounded-full"></span>
                <span className="absolute -right-4 -top-4 w-8 h-8 bg-white/10 rounded-full blur-lg"></span>
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Access our thoughtfully curated resources designed to support you through each step of this difficult journey.
            </p>
            <div className="mt-4 sm:mt-6 md:mt-8">
              <div className="inline-flex items-center space-x-2 text-white/90 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated resources available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Financial Resources */}
            <div 
              id="financial-card"
              data-animate
              className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['financial-card'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.1s"}}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Financial Assistance</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Government Benefits
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Insurance Claims
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Funeral Cost Support
                </li>
              </ul>
              <Link to="/signup" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>

            {/* Legal Resources */}
            <div 
              id="legal-card"
              data-animate
              className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['legal-card'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.2s"}}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Legal Guidance</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Legal Documents
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Estate Planning
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Probate Process
                </li>
              </ul>
              <Link to="/signup" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>

            {/* Emotional Support Resources */}
            <div 
              id="emotional-card"
              data-animate
              className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['emotional-card'] ? fadeInUpActive : ''
              }`}
              style={{animationDelay: "0.3s"}}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Emotional Support</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Grief Counseling
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Support Groups
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Mental Health Resources
                </li>
              </ul>
              <Link to="/signup" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center text-[#6266ea] hover:text-[#4232c2] transition-colors duration-200"
            >
              <span>View All Resources</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="cta-section"
            data-animate
            className={`bg-white rounded-2xl shadow-xl overflow-hidden ${fadeInUp} ${
              isIntersecting['cta-section'] ? fadeInUpActive : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#212529] mb-4">
                  Begin Your <span className="text-[#6266ea] font-normal">Guided Journey</span> Today
                </h2>
                <p className="text-[#6c757d] mb-6 sm:mb-8 text-sm sm:text-base">
                  Take the first step toward clarity and support during this difficult time. 
                  Our compassionate checklist system is here to guide you every step of the way.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    to="/signup"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/checklist"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 border border-[#6266ea] text-[#6266ea] rounded-md hover:bg-[#6266ea]/5 transition-all duration-200 text-sm sm:text-base"
                  >
                    View Checklist
                  </Link>
                </div>
              </div>
              <div className="lg:flex items-center justify-center hidden lg:block">
                <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: 'url("/SupportiveHand.jpg")'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 