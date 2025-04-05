// Local storage keys for our checklist app
const STORAGE_KEY = 'bereavement-checklist-data';
const NOTES_KEY = 'bereavement-checklist-notes';

// Save checklist data to local storage
export const saveChecklistData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving checklist data:', error);
    return false;
  }
};

// Load checklist data from local storage
export const loadChecklistData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading checklist data:', error);
    return null;
  }
};

// Save notes for a specific checklist item
export const saveItemNotes = (sectionId, categoryTitle, itemIndex, notes) => {
  try {
    // Create a unique key for this item
    const itemKey = `section-${sectionId}-${categoryTitle}-item-${itemIndex}`;
    
    // Load existing notes data
    const notesData = loadAllNotes() || {};
    
    // Update notes for this item
    notesData[itemKey] = notes;
    
    // Save back to local storage
    localStorage.setItem(NOTES_KEY, JSON.stringify(notesData));
    return true;
  } catch (error) {
    console.error('Error saving item notes:', error);
    return false;
  }
};

// Load notes for a specific checklist item
export const loadItemNotes = (sectionId, categoryTitle, itemIndex) => {
  try {
    // Create a unique key for this item
    const itemKey = `section-${sectionId}-${categoryTitle}-item-${itemIndex}`;
    
    // Load all notes data
    const notesData = loadAllNotes() || {};
    
    // Return notes for this specific item
    return notesData[itemKey] || '';
  } catch (error) {
    console.error('Error loading item notes:', error);
    return '';
  }
};

// Load all notes data
export const loadAllNotes = () => {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading notes data:', error);
    return null;
  }
};

// Clear all saved checklist data
export const clearChecklistData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NOTES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing checklist data:', error);
    return false;
  }
}; 