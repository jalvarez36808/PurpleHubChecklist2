import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Begin by signing up for an account. Once logged in, you'll have access to our comprehensive checklist and resources. We recommend starting with the checklist to track your progress and organize tasks."
  },
  {
    question: "What documents do I need?",
    answer: "Essential documents include the death certificate, deceased's ID, insurance policies, will (if available), and any relevant financial documents. Our checklist provides a detailed breakdown of required documents."
  },
  {
    question: "How do I write an obituary?",
    answer: "Our obituary writing tool guides you through the process step by step. You can access it from your dashboard or the learning resources section. The tool helps you create a meaningful tribute while ensuring all important information is included."
  },
  {
    question: "Can I save my progress?",
    answer: "Yes, all your progress is automatically saved when you're logged in. You can access your saved information and continue from where you left off at any time."
  }
];

export default function Help() {
  const [openFaqs, setOpenFaqs] = useState(new Set());

  const toggleFaq = (index) => {
    setOpenFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            How Can We <span className="text-[#6266ea] font-normal">Help?</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need during this difficult time.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            to="/checklist"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#6266ea]/20 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#6266ea]/10 rounded-full p-3">
                <DocumentTextIcon className="w-6 h-6 text-[#6266ea]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Checklist</h3>
            </div>
            <p className="text-gray-600">Access your personalized checklist to track progress</p>
          </Link>

          <Link 
            to="/learn/write-obituary"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#6266ea]/20 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#6266ea]/10 rounded-full p-3">
                <BookOpenIcon className="w-6 h-6 text-[#6266ea]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Resources</h3>
            </div>
            <p className="text-gray-600">Browse our library of helpful guides and articles</p>
          </Link>

          <Link 
            to="/support-us"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#6266ea]/20 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#6266ea]/10 rounded-full p-3">
                <QuestionMarkCircleIcon className="w-6 h-6 text-[#6266ea]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Community</h3>
            </div>
            <p className="text-gray-600">Connect with others who understand your journey</p>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openFaqs.has(index) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-200 ${
                      openFaqs.has(index) ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 pb-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}