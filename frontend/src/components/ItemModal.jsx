import { useState, useEffect, useRef } from 'react';
import { getItemDetails } from '../data/checklistDatabase';
import ReactMarkdown from 'react-markdown';

function ItemModal({ isOpen, onClose, item, itemIndex, sectionId, sectionTitle, categoryTitle }) {
  const modalRef = useRef(null);
  const [itemDetails, setItemDetails] = useState({
    guidelines: ''
  });
  
  // Load item details from database
  useEffect(() => {
    if (isOpen && item) {
      const details = getItemDetails(sectionId, categoryTitle, item);
      setItemDetails(details);
    }
  }, [isOpen, item, sectionId, categoryTitle]);
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close when clicking outside of the modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md my-2 max-h-[95vh] overflow-auto"
      >
        <div className="sticky top-0 bg-white border-b z-10 flex justify-between items-center p-3 sm:p-4">
          <div className="mr-2">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 pr-4">{item}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {sectionTitle} &gt; {categoryTitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-3 sm:p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Guidelines</h4>
              <div className="prose prose-sm max-w-none sm:text-sm prose-headings:font-semibold prose-h3:text-purple-700 prose-h3:text-base prose-h4:text-sm prose-h4:text-purple-600 prose-p:text-gray-600 prose-p:my-2 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-gray-800 prose-strong:font-medium">
                <ReactMarkdown>
                  {itemDetails.guidelines}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t p-3 sm:p-4 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal; 