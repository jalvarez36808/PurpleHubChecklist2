import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useSearchParams, Link } from 'react-router-dom';

export default function WriteObituary() {
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draft');

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    dateOfBirth: '',
    dateOfDeath: '',
    placeOfDeath: '',
    causeOfDeath: '',
    residenceHistory: '',
    education: '',
    career: '',
    achievements: '',
    hobbies: '',
    familyMembers: '',
    predeceased: '',
    funeralDetails: '',
    donations: '',
    specialMessage: ''
  });

  const [preview, setPreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    loadSavedTemplate();
  }, [draftId]);

  const loadSavedTemplate = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user found during template load');
        setIsLoading(false);
        return;
      }

      console.log('Loading template for user:', user.id);
      if (draftId) {
        console.log('Loading specific draft:', draftId);
      }

      let query = supabase
        .from('obituary_templates')
        .select('content, updated_at')
        .eq('user_id', user.id);

      if (draftId) {
        query = query.eq('id', draftId);
      } else {
        query = query.order('updated_at', { ascending: false });
      }

      const { data, error } = await query.single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('No saved template found for user');
        } else {
          console.error('Database error loading template:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
        }
        return;
      }

      if (data) {
        console.log('Successfully loaded template, last updated:', data.updated_at);
        setFormData(data.content);
        setLastSaved(new Date(data.updated_at));
      }
    } catch (error) {
      console.error('Unexpected error loading template:', {
        error: error.message,
        stack: error.stack
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePreview = () => {
    const obituaryText = `
${formData.fullName}, age ${formData.age}, passed away on ${formData.dateOfDeath} in ${formData.placeOfDeath}${formData.causeOfDeath ? ` due to ${formData.causeOfDeath}` : ''}.

${formData.fullName} was born on ${formData.dateOfBirth}. ${formData.residenceHistory}

${formData.education} ${formData.career}

${formData.achievements}

${formData.hobbies}

${formData.fullName} is survived by ${formData.familyMembers}. ${formData.predeceased ? `They were predeceased by ${formData.predeceased}.` : ''}

${formData.funeralDetails}

${formData.donations ? `In lieu of flowers, donations may be made to ${formData.donations}.` : ''}

${formData.specialMessage}
    `.trim();

    setPreview(obituaryText);
  };

  const saveTemplate = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Authentication error:', {
          code: authError.code,
          message: authError.message,
          status: authError.status
        });
        setSaveMessage('Authentication error. Please try signing in again.');
        return;
      }
      
      if (!user) {
        console.log('Save attempt without authentication');
        setSaveMessage('Please sign in to save your template');
        return;
      }

      console.log('Attempting to save template for user:', user.id);

      // Validate required fields
      if (!formData.fullName.trim()) {
        console.log('Save attempted without required field: fullName');
        setSaveMessage('Please enter at least the full name before saving');
        return;
      }

      const templateData = {
        user_id: user.id,
        title: formData.fullName.trim() || 'Untitled Draft',
        content: formData,
        updated_at: new Date().toISOString()
      };

      console.log('Saving template with data:', {
        userId: templateData.user_id,
        title: templateData.title,
        updatedAt: templateData.updated_at,
        contentKeys: Object.keys(templateData.content)
      });

      let result;
      if (draftId) {
        console.log('Updating existing draft:', draftId);
        result = await supabase
          .from('obituary_templates')
          .update(templateData)
          .eq('id', draftId)
          .eq('user_id', user.id);
      } else {
        console.log('Creating new draft');
        result = await supabase
          .from('obituary_templates')
          .insert([templateData]);
      }

      const { error: dbError, data, status } = result;

      if (dbError) {
        console.error('Database error:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          status,
          operation: draftId ? 'update' : 'insert',
          draftId: draftId || 'new',
          userId: user.id
        });
        throw dbError;
      }

      console.log('Template saved successfully:', {
        operation: draftId ? 'update' : 'insert',
        status,
        data
      });
      
      setLastSaved(new Date());
      setSaveMessage('Template saved successfully');
    } catch (error) {
      console.error('Unexpected error saving template:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        draftId: draftId || 'new draft',
        formDataKeys: Object.keys(formData)
      });
      setSaveMessage(
        error.message && error.message !== 'Failed to fetch' 
          ? `Error: ${error.message}` 
          : 'Failed to save template. Please check your connection and try again.'
      );
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <Link 
          to="/checklist?returnToChecklist=true" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
          onClick={() => {
            console.log("Returning to checklist with saved state");
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>

      <h1 className="text-3xl font-light text-gray-900 mb-4">
        How to Write an <span className="text-[#6266ea] font-normal">Obituary</span>
      </h1>
      <div className="h-1 w-20 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] mb-6 rounded-full" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600 max-w-3xl mb-2 sm:mb-0">
          Create a meaningful tribute to honor your loved one's memory. Fill out the form below to generate a well-structured obituary.
        </p>
        {lastSaved && (
          <p className="text-sm text-gray-500">
            Last saved: {lastSaved.toLocaleString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Obituary Information</h2>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#6266ea] mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., John Robert Smith"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                      placeholder="e.g., 75"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                      placeholder="e.g., June 15, 1948"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Death
                    </label>
                    <input
                      type="text"
                      name="dateOfDeath"
                      value={formData.dateOfDeath}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                      placeholder="e.g., July 1, 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Place of Death
                    </label>
                    <input
                      type="text"
                      name="placeOfDeath"
                      value={formData.placeOfDeath}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                      placeholder="e.g., Memorial Hospital, Denver, CO"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cause of Death (Optional)
                  </label>
                  <input
                    type="text"
                    name="causeOfDeath"
                    value={formData.causeOfDeath}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="Leave blank if you prefer not to include"
                  />
                </div>
              </div>
            </div>

            {/* Life History */}
            <div>
              <h3 className="text-lg font-semibold text-[#6266ea] mb-4">Life History</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residence History
                  </label>
                  <textarea
                    name="residenceHistory"
                    value={formData.residenceHistory}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They lived most of their life in Denver, Colorado, before moving to..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They graduated from University of Colorado with a degree in..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Career
                  </label>
                  <textarea
                    name="career"
                    value={formData.career}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They spent 30 years as a dedicated teacher at..."
                  />
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-[#6266ea] mb-4">Personal Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievements & Community Involvement
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They were active in their community, serving as..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hobbies & Interests
                  </label>
                  <textarea
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They enjoyed gardening, reading, and spending time with..."
                  />
                </div>
              </div>
            </div>

            {/* Family & Services */}
            <div>
              <h3 className="text-lg font-semibold text-[#6266ea] mb-4">Family & Services</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surviving Family Members
                  </label>
                  <textarea
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., their loving spouse Jane, children Tom and Sarah..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Predeceased By (Optional)
                  </label>
                  <textarea
                    name="predeceased"
                    value={formData.predeceased}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., their parents John and Mary Smith..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funeral/Memorial Service Details
                  </label>
                  <textarea
                    name="funeralDetails"
                    value={formData.funeralDetails}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., A memorial service will be held on..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memorial Donations (Optional)
                  </label>
                  <textarea
                    name="donations"
                    value={formData.donations}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., the American Heart Association..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Message or Quote (Optional)
                  </label>
                  <textarea
                    name="specialMessage"
                    value={formData.specialMessage}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6266ea] focus:border-[#6266ea]"
                    placeholder="e.g., They will be remembered for their kindness..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={generatePreview}
              className="flex-1 px-4 py-2 bg-[#6266ea] text-white rounded-lg hover:bg-[#4232c2] transition-colors duration-200"
            >
              Generate Preview
            </button>
            <button
              onClick={saveTemplate}
              disabled={isSaving}
              className="flex-1 px-4 py-2 border border-[#6266ea] text-[#6266ea] rounded-lg hover:bg-[#6266ea] hover:text-white transition-colors duration-200"
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
          {saveMessage && (
            <div className="mt-4 text-center text-sm font-medium text-[#6266ea]">
              {saveMessage}
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preview</h2>
          <div className="prose max-w-none">
            {preview ? (
              <div className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                {preview}
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Fill out the form and click "Generate Preview" to see your obituary here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 