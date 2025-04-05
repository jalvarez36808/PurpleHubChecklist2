import { useState, useEffect } from 'react';
import { saveChecklistData, loadChecklistData } from '../utils/storage';
import ItemModal from './ItemModal';

function ChecklistCategory({ title, items = [], sectionId, parentCategory }) {
  const [expanded, setExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  // Create a unique key for this category in local storage
  const storageKey = parentCategory 
    ? `section-${sectionId}-${parentCategory}-${title}` 
    : `section-${sectionId}-${title}`;

  // Get section title based on sectionId
  useEffect(() => {
    const sectionTitles = {
      1: "Right After the Death of a Loved One",
      2: "In the Days After the Death of a Loved One",
      3: "In the Weeks After the Death of a Loved One"
    };
    setSectionTitle(sectionTitles[sectionId] || '');
  }, [sectionId]);

  // Initialize expanded sections
  useEffect(() => {
    // Set the initial state for expanded sections
    const sections = {};
    items.forEach((item, index) => {
      if (isHeader(item)) {
        const sectionName = getHeaderName(item);
        // Start with sections expanded
        sections[sectionName] = true;
      }
    });
    setExpandedSections(sections);
  }, [items]);

  // Load saved state from local storage
  useEffect(() => {
    const savedData = loadChecklistData();
    if (savedData && savedData[storageKey]) {
      setCheckedItems(savedData[storageKey]);
    }
  }, [storageKey]);

  // Toggle item checked state
  const toggleItem = (id) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: !checkedItems[id]
    };
    
    setCheckedItems(newCheckedItems);
    
    // Save to local storage
    const savedData = loadChecklistData() || {};
    saveChecklistData({
      ...savedData,
      [storageKey]: newCheckedItems
    });
  };

  // Open modal for an item
  const openItemDetails = (event, item, index) => {
    // Prevent the click from toggling the checkbox
    event.preventDefault();
    event.stopPropagation();
    
    // Don't open modal for section headers
    if (item.startsWith('---') && item.endsWith('---')) return;
    
    setActiveItem(item);
    setActiveItemIndex(index);
  };

  // Close the modal
  const closeModal = () => {
    setActiveItem(null);
    setActiveItemIndex(null);
  };

  // Toggle section expansion
  const toggleSection = (e, sectionName) => {
    e.stopPropagation(); // Prevent toggling the whole category
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Calculate completion stats
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = items.filter(item => !item.startsWith('---')).length;
  const percentComplete = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // For display in the modal - if this is a subcategory, show the parent category
  const displayCategoryTitle = parentCategory 
    ? `${parentCategory} > ${title}` 
    : title;

  // Check if an item is a section header
  const isHeader = (item) => item && typeof item === 'string' && item.startsWith('---') && item.endsWith('---');
  
  // Extract section name from header format
  const getHeaderName = (header) => header.replace(/---/g, '').trim();

  // Determine if an item belongs to a specific section
  const getSectionForItem = (index) => {
    let currentSection = null;
    for (let i = 0; i < index; i++) {
      if (isHeader(items[i])) {
        currentSection = getHeaderName(items[i]);
      }
    }
    return currentSection;
  };

  // Check if an item should be displayed based on section expansion state
  const shouldShowItem = (item, index) => {
    if (isHeader(item)) return true;
    
    const section = getSectionForItem(index);
    if (!section) return true; // Not in a section, always show
    
    return expandedSections[section]; // Show only if section is expanded
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
      <div 
        className="flex justify-between items-center p-3 sm:p-4 cursor-pointer bg-white hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base mr-2 truncate">{title}</h3>
          <div className="ml-auto flex items-center flex-shrink-0">
            {percentComplete > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                {percentComplete}%
              </span>
            )}
            <span className="ml-2 text-xs text-gray-500">
              {completedCount}/{totalItems}
            </span>
          </div>
        </div>
        <button className="ml-3 text-purple-600 text-xs sm:text-sm flex-shrink-0 px-2 py-1 rounded hover:bg-purple-50">
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {expanded && items.length > 0 && (
        <div className="border-t border-gray-100">
          <ul className="divide-y divide-gray-100">
            {items.map((item, index) => {
              if (!shouldShowItem(item, index)) return null;
              
              if (isHeader(item)) {
                const sectionName = getHeaderName(item);
                return (
                  <li key={index} className="border-t border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100">
                      <h4 className="text-sm font-semibold text-purple-700">{sectionName}</h4>
                      <button 
                        onClick={(e) => toggleSection(e, sectionName)}
                        className="px-3 py-1 text-xs bg-white text-purple-700 border border-purple-200 rounded-full hover:bg-purple-100"
                      >
                        {expandedSections[sectionName] ? 'Collapse' : 'Expand'}
                      </button>
                    </div>
                  </li>
                );
              }
              
              return (
                <li key={index} className="hover:bg-gray-50">
                  <div className="flex items-start p-3 group">
                    <div className="flex items-start flex-1 min-w-0">
                      <input
                        type="checkbox"
                        id={`item-${sectionId}-${title}-${index}`}
                        checked={checkedItems[`${title}-${index}`] || false}
                        onChange={() => toggleItem(`${title}-${index}`)}
                        className="mt-1 mr-3 h-4 w-4 text-purple-600 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <label 
                          htmlFor={`item-${sectionId}-${title}-${index}`}
                          className={`text-sm block truncate ${checkedItems[`${title}-${index}`] ? 'line-through text-gray-400' : 'text-gray-700'}`}
                        >
                          {item}
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={(e) => openItemDetails(e, item, index)}
                      className="ml-2 text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                      aria-label="View details"
                    >
                      Details
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          
          <div className="p-3 border-t text-xs text-right text-gray-500">
            {completedCount} of {totalItems} completed
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      <ItemModal 
        isOpen={activeItem !== null}
        onClose={closeModal}
        item={activeItem}
        itemIndex={activeItemIndex}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        categoryTitle={displayCategoryTitle}
      />
    </div>
  );
}

export default ChecklistCategory; 