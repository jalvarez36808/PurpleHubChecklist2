import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowRightCircleIcon,
  BanknotesIcon,
  ClockIcon,
  PhoneIcon,
  HeartIcon,
  UserGroupIcon,
  HomeIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  EnvelopeIcon,
  TruckIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../lib/supabase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import checklistDatabase, { getItemDetails } from "../data/checklistDatabase";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Add animation keyframe for fadeIn
const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(98, 102, 234, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(98, 102, 234, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(98, 102, 234, 0);
    }
  }
  
  @keyframes pulse-subtle {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    to {
      background-position: -200% 0;
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-slideInRight {
    animation: slideInFromRight 0.5s ease-out forwards;
  }
  
  .animate-slideInBottom {
    animation: slideInFromBottom 0.5s ease-out forwards;
  }
  
  .animate-slideInLeft {
    animation: slideInFromLeft 0.5s ease-out forwards;
  }
  
  .animate-pulse-shadow {
    animation: pulse 2s infinite;
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 3s infinite;
  }
`;

const sections = [
  {
    id: 1,
    title: "Right After the Death of a Loved One",
    categories: [
      {
        title: "Notifications",
        items: [
          "Immediate Family",
          "Close Friends & Extended Family",
          "Doctor",
          "Employer"
        ]
      },
      {
        title: "Care",
        items: [
          "Children",
          "Pets"
        ]
      },
      {
        title: "Their Wishes",
        items: [
          "Their Wishes"
        ]
      },
      {
        title: "Handling the Body",
        items: [
          "Burial, Cremation, or Donation",
          "Body Transportation"
        ]
      },
      {
        title: "Funeral Planning",
        items: [
          "Funeral Home"
        ]
      },
      {
        title: "Will & Probate",
        items: [
          "Will or Probate"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "In the Days After the Death of a Loved One",
    categories: [
      {
        title: "Obtaining a Death Certificate",
        items: [
          "Death Certificate",
          "Copies of the Certificate"
        ]
      },
      {
        title: "Obituary Options",
        items: [
          "Write an Obituary",
          "Facebook Memorial Page",
          "Legacy.com",
          "Newspaper Obituaries"
        ]
      },
      {
        title: "Making Funeral Arrangements",
        items: [
          "Important Information About Your Loved One",
          "Memories and Personal Touches",
          "Officiant or Clergy",
          "Music",
          "Flowers or Donations",
          "Eulogies",
          "Guest Book",
          "Sharing Service Info"
        ]
      },
      {
        title: "Making Local Burial Arrangements",
        items: [
          "Local Burial",
          "Sharing Burial Info"
        ]
      },
      {
        title: "Home and Property",
        items: [
          "Home Care"
        ]
      },
      {
        title: "Documents",
        items: [
          "Important Papers"
        ]
      },
      {
        title: "Financial Assistance",
        items: [
          "Life Insurance (Claiming Policies)",
          "Payment Plans",
          "Crowdfunding",
          {
            title: "Nonprofit Help",
            isDropdown: true,
            items: [
              "Funeral Consumers Alliance",
              "Modest Needs",
              "Children's Burial Assistance",
              "Community Support"
            ]
          },
          {
            title: "Government Benefits",
            isDropdown: true,
            items: [
              "State & Local Aid",
              "Bereavement Grants & Stipends",
              "Federal Employee Benefits",
              "Veterans Benefits"
            ]
          },
          {
            title: "Employer Assistance",
            isDropdown: true,
            items: [
              "Employer or Union Help",
              "Union Benefits"
            ]
          },
          {
            title: "Meal Support",
            isDropdown: true,
            items: [
              "CaringBridge",
              "Meal Train",
              "Grocery Delivery Services"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "In the Weeks After the Death of a Loved One",
    categories: [
      {
        title: "Financial Accounts and Mail",
        items: [
          "Bank Accounts",
          "Mail",
          {
            title: "Identity and Digital Security",
            isDropdown: true,
            items: [
              "Credit & Debit Cards",
              "Credit Bureaus",
              "Digital Accounts"
            ]
          }
          
        ]
      },
      {
        title: "Close or Redirect Home Accounts",
        items: [
          "Rent or Mortgage",
          "Electric Company",
          "Gas Company",
          "Phone Service",
          "Cable & Streaming Services"
        ]
      },
      {
        title: "Notifying State and Federal Agencies",
        items: [
          "DMV",
          "Voter Registration",
          "Disability Permits",
          "IRS",
          "Passport"
        ]
      },
      {
        title: "Completing Notification Process",
        items: [
          "Email Accounts",
          "Social Media",
          "Life Insurance",
          "Long-Term Care Insurance",
          "Financial Companies",
          "Deceased Do Not Contact (DDNC) List",
          "Vehicle(s)",
          "Cell Phone",
          "Online Subscriptions",
          "Physical Subscriptions",
          "Bills and Accounts to Notify"
        ]
      },
      {
        title: "Managing a Loved One's Will or Estate",
        items: [
          "Will",
          "No Will — Probate"
        ]
      },
      {
        title: "Inventory of all Assets",
        items: [
          "Assets Inventory"
        ]
      },
      {
        title: "Applying for Benefits",
        items: [
          "Insurance Claims",
          "Life Insurance (Claim Filing)",
          "Pensions & Retirement",
          "Annuities",
          "Veteran Affairs",
          "Investments",
          "One-Time Social Security Payment",
          "Monthly Social Security Benefits"
        ]
      },
      {
        title: "Finalizing",
        items: [
          "Scattering Ashes",
          "Thank You Cards"
        ]
      }
    ]
  }
];

const checklistSections = sections.reduce((acc, section) => {
  acc[section.title] = {
    title: section.title,
    tasks: section.categories.reduce((acc, category) => {
      acc[category.title] = {
        title: category.title,
        subtasks: category.items.flatMap((item) => {
          // Check if this is a dropdown/nested item
          if (typeof item === 'object' && item.title && item.items) {
            // Create a header for the dropdown
            const header = { 
              id: `${section.title}-${category.title}-${item.title}-header`, 
              title: item.title, 
              isHeader: true,
              isDropdownHeader: true, // Mark as dropdown header for special handling
              dropdownId: `dropdown-${section.title}-${category.title}-${item.title}`
            };
            
            // Create items for the dropdown
            const nestedItems = item.items.map(subItem => ({
              id: subItem, // Use just the item name as ID to match secondarySubheaderMap keys
              title: subItem,
              isDropdownItem: true, // Mark as dropdown item for special styling
              dropdownId: `dropdown-${section.title}-${category.title}-${item.title}`
            }));
            
            // Return both header and nested items
            return [header, ...nestedItems];
          } else if (typeof item === 'string' && item.startsWith('---')) {
            // This is a header/separator
            return { id: item, title: item, isHeader: true };
          } else {
            // Regular item
            return { id: item, title: item };
          }
        })
      };
      return acc;
    }, {})
  };
  return acc;
}, {});

// Create a mapping of task IDs to secondary subheaders for all sections
const secondarySubheaderMap = {
  // Section 1 - Right After the Death of a Loved One
  "Immediate Family": "Contacting Immediate Family",
  "Close Friends & Extended Family": "Notifying Close Friends and Extended Family",
  "Doctor": "Notifying Their Doctor",
  "Employer": "Notifying Their Employer",
  "Children": "Arranging Care for Children",
  "Pets": "Arranging Care for Pets",
  "Their Wishes": "Determining Your Loved One's Wishes",
  "Burial, Cremation, or Donation": "Understanding Options for a Loved One's Remains",
  "Body Transportation": "Arranging Transportation of the Body",
  "Funeral Home": "Choosing a Funeral Home",
  "Will or Probate": "How to Determine if There Is a Will and Whether Probate Is Necessary",
  
  // Section 2 - In the Days After the Death of a Loved One
  "Death Certificate": "How to Request a Death Certificate",
  "Copies of the Certificate": "How Many Death Certificate Copies You'll Need",
  "Write an Obituary": "Writing and Publishing an Obituary",
  "Facebook Memorial Page": "Creating a Facebook Memorial Page",
  "Legacy.com": "Using Legacy.com to Share an Obituary",
  "Newspaper Obituaries": "Submitting an Obituary to a Newspaper",
  "Important Information About Your Loved One": "Gathering Information for the Funeral or Memorial Service",
  "Memories and Personal Touches": "Collecting Memories to Personalize the Service",
  "Officiant or Clergy": "Choosing Someone to Lead the Service",
  "Music": "Planning Music for the Funeral or Memorial Service",
  "Flowers or Donations": "Coordinating Flowers or Charitable Donations",
  "Eulogies": "Planning and Supporting Eulogies",
  "Guest Book": "Setting Up a Guest Book for the Service",
  "Sharing Service Info": "Sharing Funeral Details with Friends and Family",
  "Local Burial": "Planning a Local Burial Service",
  "Sharing Burial Info": "Sharing Burial Details with Loved Ones",
  "Home Care": "Securing and Managing Your Loved One's Home",
  "Important Papers": "Gathering Important Legal and Financial Documents",
  "Life Insurance (Claiming Policies)": "Claiming a Life Insurance Policy",
  "Payment Plans": "Exploring Funeral Home Payment Options",
  "Crowdfunding": "Setting Up a Funeral Crowdfunding Campaign",
  "Funeral Consumers Alliance": "Getting Help from the Funeral Consumers Alliance",
  "Modest Needs": "Applying for a Funeral Grant from Modest Needs",
  "Children's Burial Assistance": "Getting Help from Children's Burial Assistance",
  "Community Support": "Finding Local Community Support",
  "CaringBridge": "Using CaringBridge for Meal Support",
  "Meal Train": "Setting Up a Meal Train",
  "Grocery Delivery Services": "Using Grocery Delivery Services",
  "State & Local Aid": "Applying for State or Local Funeral Assistance",
  "Bereavement Grants & Stipends": "Exploring Bereavement Grants and Burial Stipends",
  "Federal Employee Benefits": "Accessing Benefits for Federal Employees and Retirees",
  "Veteran Affairs": "Applying for Veterans Funeral and Burial Benefits",
  "Employer or Union Help": "Accessing Benefits from Employers or Unions",
  "Meal Support": "Coordinating Meal Support After a Loss",
  
  // Section 3 - In the Weeks After the Death of a Loved One
  "Bank Accounts": "Managing Your Loved One's Bank Accounts",
  "Credit & Debit Cards": "Closing or Settling Credit and Debit Card Accounts",
  "Mail": "Redirecting and Managing Mail",
  "Digital Accounts": "Managing Digital Accounts",
  "Credit Bureaus": "Notifying Credit Bureaus About a Death",
  "Rent or Mortgage": "Managing Rent or Mortgage After a Death",
  "Electric Company": "Handling Electric Service and Payments",
  "Gas Company": "Handling Gas Utility Accounts",
  "Phone Service": "Canceling or Transferring Phone Service",
  "Cable & Streaming Services": "Managing Cable and Streaming Subscriptions",
  "DMV": "Canceling a Driver's License and Updating Vehicle Records",
  "Voter Registration": "Canceling Voter Registration",
  "Disability Permits": "Returning or Canceling Disability Permits",
  "IRS": "Filing Taxes and Notifying the IRS",
  "Passport": "Canceling a U.S. Passport After Death",
  "Email Accounts": "Closing or Securing Email Accounts",
  "Social Media": "Managing Social Media Profiles",
  "Life Insurance (Notification)": "Notifying Life Insurance Providers",
  "Long-Term Care Insurance": "Canceling Long-Term Care Insurance Policies",
  "Financial Companies": "Contacting Financial Institutions",
  "Deceased Do Not Contact (DDNC) List": "Handling a Loved One's Vehicle After Their Passing",
  "Vehicle(s)": "Transferring or Disposing of a Loved One's Vehicle",
  "Cell Phone": "Canceling or Transferring Cell Phone Accounts",
  "Online Subscriptions": "Canceling Online Subscriptions and Apps",
  "Physical Subscriptions": "Stopping Mail Subscriptions and Deliveries",
  "Bills and Accounts to Notify": "Notifying Service Providers and Utilities",
  "Will": "How to Carry Out Your Loved One's Will",
  "No Will — Probate": "Probating an Estate Without a Will",
  "Assets Inventory": "Taking Inventory of All Assets",
  "Insurance Claims": "Filing a General Insurance Claim",
  "Life Insurance (Claim Filing)": "Filing a Life Insurance Claim",
  "Pensions & Retirement": "Applying for Pensions and Retirement Benefits",
  "Annuities": "Claiming Annuity Benefits",
  "Veteran Affairs": "Applying for VA Survivor Benefits",
  "Investments": "Claiming Investment or Brokerage Accounts",
  "One-Time Social Security Payment": "Applying for the One-Time SSA Death Payment",
  "Monthly Social Security Benefits": "Applying for Monthly Social Security Survivor Benefits",
  "Scattering Ashes": "Scattering Ashes: Rules and Permissions",
  "Thank You Cards": "Writing and Sending Thank You Cards"
};

// Mapping for popup items to their corresponding full pages
const fullPageUrlMap = {
  "Their Wishes": "/learn/determining-wishes",
  "End of Life Instructions": "/learn/end-of-life-instructions",
  "Estate Planning": "/learn/estate-planning",
  "Digital Legacy": "/learn/digital-legacy",
  "Funeral Planning": "/learn/funeral-planning",
  "Organ Donation": "/learn/organ-donation",
  "Burial, Cremation, or Donation": "/learn/understanding-remains-options",
  "Body Transportation": "/learn/body-transportation",
  "Home Care": "/learn/home-care",
  "Will": "/learn/executing-will",
  "No Will — Probate": "/learn/probate-guide",
  "Important Papers": "/learn/important-documents",
  "Write an Obituary": "/learn/write-obituary"
};

export default function ChecklistCopy() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [currentPopupContent, setCurrentPopupContent] = useState(null);
  const [saving, setSaving] = useState(false);
  // Add a new state for expanded subcategories
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [popupContent, setPopupContent] = useState({});
  // Add a new state for expanded dropdowns
  const [expandedDropdowns, setExpandedDropdowns] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a stored popup request in sessionStorage
    const popupToOpen = sessionStorage.getItem('openPopup');
    if (popupToOpen) {
      // Clear the sessionStorage item to prevent reopening on subsequent visits
      sessionStorage.removeItem('openPopup');
      
      // Use setTimeout to ensure the component is fully loaded
      setTimeout(() => {
        openInfoPopup(popupToOpen);
      }, 300);
    }
  }, []);  // Empty dependency array means this runs once when component mounts

  useEffect(() => {
    // Simple auth state subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      // If user signs in, load their tasks
      if (session?.user) {
        loadUserTasks(session.user.id);
      } else {
        // Clear tasks if user signs out
        setCompletedTasks(new Set());
      }
    });

    // Initial session check
    checkSession();

    // Initialize popup content from database
    const initPopupContent = () => {
      const content = {};
      
      // Process each section
      Object.entries(checklistSections).forEach(([sectionTitle, section]) => {
        // Extract section ID from title (assuming section titles are in the format "section-X")
        const sectionId = Object.keys({ "Right After the Death of a Loved One": 1, "In the Days After the Death of a Loved One": 2, "In the Weeks After the Death of a Loved One": 3 })
          .find(key => key === section.title) ? 
          { "Right After the Death of a Loved One": 1, "In the Days After the Death of a Loved One": 2, "In the Weeks After the Death of a Loved One": 3 }[section.title] : 
          1;
        
        // Process each category in the section
        Object.entries(section.tasks).forEach(([categoryTitle, category]) => {
          // Process regular subtasks
          if (category.subtasks) {
            category.subtasks.forEach((task) => {
              if (!task.isHeader) {
                // Get details for this task from the database
                const details = getItemDetails(sectionId, categoryTitle, task.title);
                if (details) {
                  content[task.id] = details;
                  
                  // Add fullPageUrl if it exists in the mapping
                  if (fullPageUrlMap[task.title]) {
                    content[task.id].fullPageUrl = fullPageUrlMap[task.title];
                  }
                }
              } else if (task.isDropdownItem) {
                // This is a dropdown item - try to find it in database
                const details = getItemDetails(sectionId, categoryTitle, task.title);
                if (details) {
                  content[task.id] = details;
                  
                  // Add fullPageUrl if it exists in the mapping
                  if (fullPageUrlMap[task.title]) {
                    content[task.id].fullPageUrl = fullPageUrlMap[task.title];
                  }
                }
              }
            });
          }
          
          // Process subcategories if they exist
          if (category.subCategories) {
            Object.entries(category.subCategories).forEach(([subCategoryKey, subCategory]) => {
              subCategory.subtasks.forEach((task) => {
                if (!task.isHeader) {
                  // For subcategories, use a compound category title
                  const compoundCategoryTitle = `${categoryTitle} > ${subCategory.title}`;
                  const details = getItemDetails(sectionId, compoundCategoryTitle, task.title);
                  if (details) {
                    content[task.id] = details;
                    
                    // Add fullPageUrl if it exists in the mapping
                    if (fullPageUrlMap[task.title]) {
                      content[task.id].fullPageUrl = fullPageUrlMap[task.title];
                    }
                  }
                }
              });
            });
          }
        });
      });
      
      setPopupContent(content);
    };
    
    initPopupContent();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Parse URL query parameters to expand the appropriate section and category when returning from full page
  useEffect(() => {
    // Load saved dropdown state on mount
    const savedDropdowns = localStorage.getItem('expandedDropdowns');
    const savedCategories = localStorage.getItem('expandedCategories');
    
    if (savedDropdowns) {
      try {
        setExpandedDropdowns(JSON.parse(savedDropdowns));
        console.log("Restored expanded dropdowns from localStorage:", JSON.parse(savedDropdowns));
      } catch (e) {
        console.error("Error parsing saved dropdowns:", e);
      }
    }
    
    if (savedCategories) {
      try {
        setExpandedCategories(JSON.parse(savedCategories));
        console.log("Restored expanded categories from localStorage:", JSON.parse(savedCategories));
      } catch (e) {
        console.error("Error parsing saved categories:", e);
      }
    }
    
    // Handle returning from other pages - look for special return parameters
    const queryParams = new URLSearchParams(location.search);
    const returnToChecklist = queryParams.get('returnToChecklist');
    
    if (returnToChecklist === 'true') {
      console.log("Detected return to checklist, using saved state");
      
      // The states are already loaded from localStorage above,
      // now just need to scroll to the right category if specified
      const categoryName = queryParams.get('category');
      
      if (categoryName) {
        // Scroll to the category after a slight delay to allow rendering
        setTimeout(() => {
          const categoryElement = document.getElementById(`category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`);
          if (categoryElement) {
            console.log("Scrolling to category element:", categoryElement);
            categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            console.log("Category element not found for scrolling");
          }
        }, 300);
      }
    }
    
    return () => {
      // Save state when unmounting the component
      localStorage.setItem('expandedDropdowns', JSON.stringify(expandedDropdowns));
      localStorage.setItem('expandedCategories', JSON.stringify(expandedCategories));
      console.log("Saved expanded state to localStorage on unmount");
    };
  }, []);
  
  // Add function to toggle dropdown visibility
  const toggleDropdown = (dropdownId) => {
    const newExpandedDropdowns = {
      ...expandedDropdowns,
      [dropdownId]: !expandedDropdowns[dropdownId],
    };
    
    setExpandedDropdowns(newExpandedDropdowns);
    
    // Save to localStorage whenever dropdowns change
    localStorage.setItem('expandedDropdowns', JSON.stringify(newExpandedDropdowns));
  };

  // Initial session check
  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadUserTasks(session.user.id);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  const loadUserTasks = async (userId) => {
    try {
      setLoading(true);
      const { data: userTasks, error: tasksError } = await supabase
        .from("user_tasks")
        .select("task_id")
        .eq("user_id", userId);

      if (tasksError) {
        console.error("Error loading tasks:", tasksError);
        return;
      }

      setCompletedTasks(new Set(userTasks?.map((task) => task.task_id) || []));
    } catch (error) {
      console.error("Error loading user tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    // Get current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If not logged in, prompt to sign in
    if (!session?.user) {
      setIsSignInPopupOpen(true);
      return;
    }

    try {
      setSaving(true);
      const isCompleting = !completedTasks.has(taskId);

      // If user is authenticated, save to database first
      const { error: dbError } = isCompleting
        ? await supabase.from("user_tasks").insert([
            {
              user_id: session.user.id,
              task_id: taskId,
              status: "completed",
              completed_at: new Date().toISOString(),
            },
          ])
        : await supabase
            .from("user_tasks")
            .delete()
            .eq("user_id", session.user.id)
            .eq("task_id", taskId);

      if (dbError) {
        console.error("Error updating task:", dbError);
        throw dbError;
      }

      // Update local state
      setCompletedTasks((prev) => {
        const newSet = new Set(prev);
        if (isCompleting) {
          newSet.add(taskId);
        } else {
          newSet.delete(taskId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Error toggling task completion:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (categoryKey) => {
    const newExpandedCategories = {
      ...expandedCategories,
      [categoryKey]: !expandedCategories[categoryKey],
    };
    
    setExpandedCategories(newExpandedCategories);
    
    // Save to localStorage whenever categories change
    localStorage.setItem('expandedCategories', JSON.stringify(newExpandedCategories));
  };

  const calculateProgress = () => {
    let totalTasks = 0;
    let completedCount = 0;

    Object.values(checklistSections).forEach((section) => {
      Object.values(section.tasks).forEach((category) => {
        // Handle regular subtasks
        if (category.subtasks) {
          category.subtasks.forEach((task) => {
            if (!task.isHeader) {
              totalTasks++;
              if (completedTasks.has(task.id)) {
                completedCount++;
              }
            }
          });
        }

        // Handle subcategories if they exist
        if (category.subCategories) {
          Object.values(category.subCategories).forEach((subCategory) => {
            subCategory.subtasks.forEach((task) => {
              if (!task.isHeader) {
                totalTasks++;
                if (completedTasks.has(task.id)) {
                  completedCount++;
                }
              }
            });
          });
        }
      });
    });

    return {
      percentage:
        totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100),
      completed: completedCount,
      total: totalTasks,
    };
  };

  // Calculate progress for a specific category
  const calculateCategoryProgress = (category) => {
    let totalTasks = 0;
    let completedCount = 0;

    // Handle regular subtasks
    if (category.subtasks) {
      category.subtasks.forEach((task) => {
        if (!task.isHeader) {
          totalTasks++;
          if (completedTasks.has(task.id)) {
            completedCount++;
          }
        }
      });
    }

    // Handle subcategories if they exist
    if (category.subCategories) {
      Object.values(category.subCategories).forEach((subCategory) => {
        subCategory.subtasks.forEach((task) => {
          if (!task.isHeader) {
            totalTasks++;
            if (completedTasks.has(task.id)) {
              completedCount++;
            }
          }
        });
      });
    }

    return {
      completed: completedCount,
      total: totalTasks,
      isComplete: totalTasks > 0 && completedCount === totalTasks,
    };
  };

  // Calculate progress for a specific subcategory
  const calculateSubCategoryProgress = (subCategory) => {
    let totalTasks = 0;
    let completedCount = 0;

    subCategory.subtasks.forEach((task) => {
      if (!task.isHeader) {
        totalTasks++;
        if (completedTasks.has(task.id)) {
          completedCount++;
        }
      }
    });

    return {
      completed: completedCount,
      total: totalTasks,
      isComplete: totalTasks > 0 && completedCount === totalTasks,
    };
  };

  // Calculate progress for a specific section
  const calculateSectionProgress = (section) => {
    let totalTasks = 0;
    let completedCount = 0;

    Object.values(section.tasks).forEach((category) => {
      // Handle regular subtasks
      if (category.subtasks) {
        category.subtasks.forEach((task) => {
          if (!task.isHeader) {
            totalTasks++;
            if (completedTasks.has(task.id)) {
              completedCount++;
            }
          }
        });
      }

      // Handle subcategories if they exist
      if (category.subCategories) {
        Object.values(category.subCategories).forEach((subCategory) => {
          subCategory.subtasks.forEach((task) => {
            if (!task.isHeader) {
              totalTasks++;
              if (completedTasks.has(task.id)) {
                completedCount++;
              }
            }
          });
        });
      }
    });

    return {
      completed: completedCount,
      total: totalTasks,
      isComplete: totalTasks > 0 && completedCount === totalTasks,
    };
  };

  const openInfoPopup = (taskId) => {
    const details = popupContent[taskId] || {}; // Get details from popupContent if available
    
    // Create popup content object with taskId for secondary subheader lookup
    setCurrentPopupContent({
      ...details,
      taskId, // Include the taskId to display secondary subheader
      // If no popup content but there's a secondary subheader, create minimal content
      title: details.title || taskId,
      description: details.description || getTaskDescription(taskId)
    });
    
    setIsInfoPopupOpen(true);

    // Add a small delay to ensure the dialog is rendered first before scrolling
    setTimeout(() => {
      // Find the dialog content div and scroll it to the top
      const dialogContent = document.querySelector(".overflow-y-auto");
      if (dialogContent) {
        dialogContent.scrollTop = 0;
      }
    }, 100);
  };

  // Helper function to get a description for tasks that might not have popup content
  const getTaskDescription = (taskId) => {
    // If it's in the secondarySubheaderMap but not in popupContent, create a basic description
    if (secondarySubheaderMap[taskId]) {
      const details = checklistDatabase[taskId] || {};
      return details.guidelines || `Information about ${taskId}`;
    }
    return '';
  };

  // Add a new function to toggle subcategories
  const toggleSubCategory = (subCategoryKey) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCategoryKey]: !prev[subCategoryKey],
    }));
  };

  // Add a function to switch between popups
  const switchPopup = (newTaskId) => {
    // Close current popup first
    setIsInfoPopupOpen(false);
    
    // Open new popup after a short delay to allow the first one to close
    setTimeout(() => {
      openInfoPopup(newTaskId);
    }, 100);
  };

  // Create a global function for closing the popup and reopening with a specific task
  window.closeAndOpenPopup = (newTaskId) => {
    if (isInfoPopupOpen) {
      // Close the current popup
      setIsInfoPopupOpen(false);
      
      // Open the new popup after a brief delay to allow the first one to close
      setTimeout(() => {
        openInfoPopup(newTaskId);
      }, 100);
    } else {
      // If no popup is open, just open the new one directly
      openInfoPopup(newTaskId);
    }
  };

  // Global function to close current popup and navigate to a URL
  window.closePopupAndNavigate = (url) => {
    const setIsInfoPopupOpen = window.closePopupAndOpenPopupState;
    if (typeof setIsInfoPopupOpen === 'function') {
      setIsInfoPopupOpen(false);
    }
    setTimeout(() => {
      window.open(url, '_blank'); // Open in a new tab
    }, 100);
  };

  // Global function to close current popup and open another popup
  window.closeAndOpenPopup = (popupName) => {
    setIsInfoPopupOpen(false);
    setTimeout(() => {
      openInfoPopup(popupName);
    }, 100);
  };
  
  // Make functions available globally for links in markdown content
  window.openInfoPopup = openInfoPopup;
  window.switchPopup = switchPopup;

  // Make the state setter available globally for the closePopupAndNavigate function
  window.closePopupAndOpenPopupState = setIsInfoPopupOpen;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6266ea]"></div>
      </div>
    );
  }

  // Calculate progress here before rendering
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Sign In Popup */}
      <Dialog
        open={isSignInPopupOpen}
        onClose={() => setIsSignInPopupOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl animate-fadeIn">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Sign in to use checklist
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-6">
              Please sign in or create an account to track your progress.
            </Dialog.Description>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => {
                  setIsSignInPopupOpen(false);
                  navigate("/signin");
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#6266ea] px-4 py-2 text-sm font-medium text-white hover:bg-[#4232c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6266ea] focus-visible:ring-offset-2"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignInPopupOpen(false);
                  navigate("/signup");
                }}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6266ea] focus-visible:ring-offset-2"
              >
                Create Account
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Info Popup */}
      <Dialog
        open={isInfoPopupOpen}
        onClose={() => setIsInfoPopupOpen(false)}
        className="relative z-50"
      >
        {/* Add backdrop blur effect */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl rounded-xl bg-white p-0 shadow-2xl transition-all duration-300 animate-fadeIn overflow-hidden max-h-[85vh] relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6266ea]/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#6266ea]/5 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-5 w-12 h-12 bg-[#6266ea]/10 rounded-full blur-lg animate-pulse"></div>

            {currentPopupContent && (
              <div className="relative">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-[#6266ea]/10 to-white p-6 border-b border-gray-100">
                  {/* Secondary subheader if available */}
                  {currentPopupContent.taskId && secondarySubheaderMap[currentPopupContent.taskId] && (
                    <div className="mb-0">
                      <h3 className="text-lg font-semibold text-[#4232c2] flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#6266ea]/10 flex items-center justify-center mr-2 shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#6266ea]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6266ea] to-[#4232c2]">
                          {secondarySubheaderMap[currentPopupContent.taskId]}
                        </span>
                      </h3>
                    </div>
                  )}
                  
                  {/* Dialog title removed as requested */}
                  {!secondarySubheaderMap[currentPopupContent.taskId] && (
                    <h3 className="text-xl font-bold text-gray-900 flex items-center animate-slideInLeft">
                      <div className="w-8 h-8 rounded-full bg-[#6266ea]/10 flex items-center justify-center mr-3 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#6266ea]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6266ea] to-[#4232c2]">
                        {currentPopupContent.title}
                      </span>
                    </h3>
                  )}
                </div>

                {/* Content area with scroll */}
                <div className="p-6 overflow-y-auto max-h-[50vh] relative">
                  <div className="prose prose-sm max-w-none animate-slideInBottom">
                    <PopupContentRenderer
                      content={popupContent[currentPopupContent.taskId]}
                      taskId={currentPopupContent.taskId}
                    />
                  </div>

                  {/* Scroll to top button inside popup */}
                  <button
                    onClick={() => {
                      const dialogContent =
                        document.querySelector(".overflow-y-auto");
                      if (dialogContent) {
                        dialogContent.scrollTop = 0;
                      }
                    }}
                    className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all duration-300 border border-gray-200 z-40"
                    aria-label="Scroll to top"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#6266ea]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </button>
                </div>

                {/* Action buttons with subtle shadow separation */}
                <div className="mt-2 flex justify-between p-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm relative">
                  {/* Visit Full Page link - only shown if page mapping exists */}
                  {currentPopupContent && currentPopupContent.fullPageUrl && (
                    <a
                      href={currentPopupContent.fullPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-10 w-10 transition-colors duration-200"
                    >
                      {/* Purple book icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </a>
                  )}
                  {/* Special case for specific items with their learning pages */}
                  {currentPopupContent && !currentPopupContent.fullPageUrl && 
                   (currentPopupContent.title === "Burial, Cremation, or Donation" || 
                    currentPopupContent.title === "Body Transportation" || 
                    currentPopupContent.title === "Home Care" || 
                    currentPopupContent.title === "Executing the Will" || 
                    currentPopupContent.title === "No Will — Probate" || 
                    currentPopupContent.title === "Important Papers" || 
                    currentPopupContent.title === "Write an Obituary") && (
                    <Link
                      to={fullPageUrlMap[currentPopupContent.title]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-10 w-10 transition-colors duration-200"
                      onClick={(e) => {
                        // Don't close the popup when opening in a new tab
                        e.stopPropagation();
                        
                        // Scroll to top of the page
                        window.scrollTo(0, 0);
                        
                        // Save the current state to localStorage before navigating
                        const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                        const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                        
                        // Save to localStorage
                        localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                        localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                        
                        // Close the popup
                        setIsInfoPopupOpen(false);
                      }}
                    >
                      {/* Purple book icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
                  )}
                  {/* Special case for Will or Probate */}
                  {currentPopupContent && !currentPopupContent.fullPageUrl && currentPopupContent.title === "Will or Probate" && (
                    <Link
                      to="/learn/finding-will"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-8 w-8 transition-colors duration-200"
                      onClick={(e) => {
                        // Don't close the popup when opening in a new tab
                        e.stopPropagation();
                        
                        // Scroll to top of the page
                        window.scrollTo(0, 0);
                        
                        // Save the current state to localStorage before navigating
                        const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                        const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                        
                        // Set the category to be expanded when returning
                        const sectionKey = "section-1"; // First section
                        const categoryKey = "finding-will";
                        
                        // Set the category to be expanded
                        currentExpandedCategories[`${sectionKey}-${categoryKey}`] = true;
                        
                        // Save to localStorage
                        localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                        localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                        
                        // Close the popup
                        setIsInfoPopupOpen(false);
                      }}
                    >
                      {/* Purple book icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
                  )}
                  {/* Special case for Survivor Benefits */}
                  {currentPopupContent && !currentPopupContent.fullPageUrl && currentPopupContent.title === "Survivor Benefits" && (
                    <Link
                      to="/learn/social-security-benefits"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-8 w-8 transition-colors duration-200"
                      onClick={(e) => {
                        // Don't close the popup when opening in a new tab
                        e.stopPropagation();
                        
                        // Scroll to top of the page
                        window.scrollTo(0, 0);
                        
                        // Save the current state to localStorage before navigating
                        const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                        const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                        
                        // Set the category to be expanded when returning
                        const sectionKey = "section-3"; // Third section
                        const categoryKey = "applying-for-benefits";
                        
                        // Set the category to be expanded
                        currentExpandedCategories[`${sectionKey}-${categoryKey}`] = true;
                        
                        // Save to localStorage
                        localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                        localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                        
                        // Close the popup
                        setIsInfoPopupOpen(false);
                      }}
                    >
                      {/* Purple book icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
                  )}
                  <button
                    onClick={() => setIsInfoPopupOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#6266ea]/20 bg-gradient-to-r from-[#6266ea] to-[#4232c2] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md hover:from-[#4232c2] hover:to-[#6266ea] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6266ea] focus-visible:ring-offset-2 animate-slideInBottom"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Close
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 py-2 sm:py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-300 animate-fadeIn relative overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6266ea]/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#6266ea]/5 rounded-full blur-xl"></div>

          {/* Additional decorative elements */}
          <div className="absolute top-1/2 right-12 w-16 h-16 bg-[#6266ea]/10 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-4 h-4 bg-gradient-to-r from-[#6266ea]/30 to-transparent rounded-full blur-sm"></div>
          <div className="absolute -top-2 left-1/3 w-24 h-2 bg-gradient-to-r from-[#6266ea]/30 to-transparent rounded-full blur-sm"></div>

          <div className="relative">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 flex flex-wrap items-center gap-3 animate-slideInLeft">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6266ea] to-[#4232c2] animate-shimmer">
                Checklist
              </span>
              <div className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#6266ea] to-[#4232c2] rounded-full shadow-sm animate-pulse">
                Personal Guide
              </div>
            </h1>
            <p
              className="text-sm sm:text-base text-gray-600 mb-4 max-w-2xl leading-relaxed animate-slideInBottom"
              style={{ animationDelay: "0.1s" }}
            >
              Track your progress through important tasks after the loss of a
              loved one.
              <span className="text-[#6266ea] font-medium">
                {" "}
                We're here to help you navigate this difficult time.
              </span>
            </p>

            {!user && (
              <div
                className="bg-gradient-to-r from-[#6266ea]/5 to-[#7c80ee]/5 border border-[#6266ea]/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 animate-slideInBottom"
                style={{ animationDelay: `${0.15}s` }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-[#6266ea]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-[#6266ea]">
                      Sign in to save your progress
                    </h3>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                      <p>
                        Your progress will be saved automatically when you're
                        signed in.{" "}
                        <button
                          onClick={() => setIsSignInPopupOpen(true)}
                          className="font-medium text-[#6266ea] hover:text-[#4232c2] underline"
                        >
                          Sign in now
                        </button>{" "}
                        to keep track of your completed tasks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Introduction Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-slideInBottom"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-300 flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#6266ea]/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#6266ea]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Personalized Tasks
                  </h3>
                  <p className="text-xs text-gray-500">
                    Tailored guidance based on your specific situation and
                    needs.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-300 flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#6266ea]/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#6266ea]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Track Progress
                  </h3>
                  <p className="text-xs text-gray-500">
                    Monitor completed tasks and visualize your journey.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-300 flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#6266ea]/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#6266ea]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Helpful Resources
                  </h3>
                  <p className="text-xs text-gray-500">
                    Access detailed information for each task as needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="mt-3 sm:mt-4 animate-slideInBottom"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Progress ({progress.completed}/{progress.total} tasks
                  completed)
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#6266ea]">
                  {progress.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                <div
                  className="bg-gradient-to-r from-[#6266ea] to-[#7c80ee] h-2.5 sm:h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Sections */}
        {Object.entries(checklistSections).map(
          ([sectionKey, section], sectionIndex) => (
            <div
              key={sectionKey}
              className="mb-4 sm:mb-12 bg-white rounded-xl shadow-sm p-3 sm:p-6 border border-gray-300 animate-slideInBottom"
              style={{ animationDelay: `${0.3 + sectionIndex * 0.1}s` }}
            >
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-300">
                {section.title}
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {Object.entries(section.tasks).map(
                  ([categoryKey, category], categoryIndex) => (
                    <div
                      key={categoryIndex}
                      className="rounded-xl border border-gray-300 bg-white hover:border-[#6266ea]/40 transition-colors duration-200 animate-slideInRight mb-4 sm:mb-6"
                      style={{
                        animationDelay: `${0.4 + categoryIndex * 0.1}s`,
                      }}
                      id={`category-${category.title.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <button
                        onClick={() =>
                          toggleCategory(`${sectionKey}-${categoryKey}`)
                        }
                        className="w-full flex items-center justify-between p-3 sm:p-4 text-left bg-gradient-to-r from-gray-50/70 to-white hover:from-gray-100/70 hover:to-gray-50/70 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`h-6 w-6 flex items-center justify-center rounded-full bg-[#6266ea]/10 mr-2 transition-all duration-300 ${
                              expandedCategories[`${sectionKey}-${categoryKey}`]
                                ? "bg-[#6266ea]/20"
                                : ""
                            } hover:bg-[#6266ea]/15`}
                          >
                            <span className="text-sm font-bold text-[#6266ea]">
                              {categoryIndex + 1}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-xl font-semibold text-[#6266ea] pr-2">
                            {category.title}
                            {/* Show category completion count */}
                            {(() => {
                              const progress =
                                calculateCategoryProgress(category);
                              return (
                                <span className="text-sm text-gray-600 font-normal ml-1">
                                  ({progress.completed}/{progress.total})
                                </span>
                              );
                            })()}
                          </h3>
                          {(() => {
                            const progress =
                              calculateCategoryProgress(category);
                            return (
                              progress.isComplete &&
                              progress.total > 0 && (
                                <div className="flex items-center space-x-1 bg-[#6266ea]/10 text-[#6266ea] px-2 py-1 rounded-full text-xs font-medium animate-fadeIn">
                                  <CheckIcon className="w-3 h-3" />
                                  <span>Complete</span>
                                </div>
                              )
                            );
                          })()}
                        </div>
                        <ChevronDownIcon
                          className={`w-5 h-5 flex-shrink-0 text-[#6266ea] transform transition-transform duration-300 ${
                            expandedCategories[`${sectionKey}-${categoryKey}`]
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          expandedCategories[`${sectionKey}-${categoryKey}`]
                            ? "max-h-[2000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="space-y-2 sm:space-y-4 p-2 sm:p-4">
                          {/* Render regular subtasks */}
                          {category.subtasks &&
                            category.subtasks.map((task, taskIndex) => {
                              // Special handling for dropdown items - only show if parent dropdown is expanded
                              if (task.isDropdownItem) {
                                return expandedDropdowns[task.dropdownId] ? (
                                  <div
                                    key={task.id}
                                    className="flex items-center justify-between p-2 pl-6 sm:pl-8 sm:p-4 bg-white rounded-xl border border-gray-300 hover:border-[#6266ea]/40 hover:bg-gradient-to-r hover:from-[#6266ea]/[0.05] hover:to-[#7c80ee]/[0.05] transition-all duration-200 animate-fadeIn ml-4"
                                    style={{
                                      animationDelay: `${taskIndex * 0.05}s`,
                                    }}
                                  >
                                    <div className="flex items-start sm:items-center space-x-3 flex-grow min-w-0">
                                      <button
                                        onClick={() =>
                                          toggleTaskCompletion(task.id)
                                        }
                                        className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-300 ${
                                          completedTasks.has(task.id)
                                            ? "bg-[#6266ea] border-[#6266ea] scale-105"
                                            : "border-gray-300 hover:border-[#6266ea]/70 hover:scale-105"
                                        }`}
                                      >
                                        {completedTasks.has(task.id) && (
                                          <CheckIcon className="w-3 h-3 text-white animate-fadeIn" />
                                        )}
                                      </button>
                                      <span
                                        className={`text-sm sm:text-base ${
                                          completedTasks.has(task.id)
                                            ? "text-gray-500 line-through"
                                            : "text-gray-900"
                                        } transition-all duration-300`}
                                      >
                                        {task.title}
                                      </span>
                                    </div>
                                    {(popupContent[task.id] || secondarySubheaderMap[task.id]) && (
                                      <button
                                        onClick={() => openInfoPopup(task.id)}
                                        className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-8 w-8 transition-colors duration-200"
                                      >
                                        <InformationCircleIcon className="h-5 w-5" />
                                      </button>
                                    )}
                                    {fullPageUrlMap[task.title] && (
                                      <Link
                                        to={fullPageUrlMap[task.title]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-10 w-10 transition-colors duration-200"
                                        onClick={() => {
                                          // Scroll to top of the page
                                          window.scrollTo(0, 0);
                                          
                                          // Save the current state to localStorage before navigating
                                          const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                                          const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                                          
                                          // Save to localStorage
                                          localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                                          localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                                        }}
                                      >
                                        {/* Purple book icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                      </Link>
                                    )}
                                  </div>
                                ) : null; // Don't render if dropdown is collapsed
                              }

                              // Special handling for dropdown headers
                              if (task.isDropdownHeader) {
                                return (
                                  <div
                                    key={task.id}
                                    className="flex items-center justify-between p-2 sm:p-4 bg-white rounded-xl border border-gray-300 hover:border-[#6266ea]/40 hover:bg-gradient-to-r hover:from-[#6266ea]/[0.05] hover:to-[#7c80ee]/[0.05] transition-all duration-200 cursor-pointer animate-fadeIn"
                                    style={{
                                      animationDelay: `${taskIndex * 0.05}s`,
                                    }}
                                    onClick={() => toggleDropdown(task.dropdownId)}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-sm sm:text-base font-medium text-gray-900">
                                        {task.title}
                                      </span>
                                      <ChevronDownIcon
                                        className={`w-5 h-5 flex-shrink-0 text-[#6266ea] transform transition-transform duration-300 ${
                                          expandedDropdowns[task.dropdownId]
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </div>
                                );
                              }

                              // Regular task or header rendering
                              return (
                                <div
                                  key={task.id}
                                  className={`${
                                    task.isHeader
                                      ? "mt-4 mb-2"
                                      : "flex items-center justify-between p-2 sm:p-4 bg-white rounded-xl border border-gray-300 hover:border-[#6266ea]/40 hover:bg-gradient-to-r hover:from-[#6266ea]/[0.05] hover:to-[#7c80ee]/[0.05] transition-all duration-200"
                                  } animate-fadeIn`}
                                  style={{
                                    animationDelay: `${taskIndex * 0.05}s`,
                                  }}
                                >
                                  {task.isHeader ? (
                                    <div className="font-semibold text-gray-700 text-sm sm:text-base pb-1 border-b border-gray-200">
                                      {task.title}
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-start sm:items-center space-x-3 flex-grow min-w-0">
                                        <button
                                          onClick={() =>
                                            toggleTaskCompletion(task.id)
                                          }
                                          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-300 ${
                                            completedTasks.has(task.id)
                                              ? "bg-[#6266ea] border-[#6266ea] scale-105"
                                              : "border-gray-300 hover:border-[#6266ea]/70 hover:scale-105"
                                          }`}
                                        >
                                          {completedTasks.has(task.id) && (
                                            <CheckIcon className="w-3 h-3 text-white animate-fadeIn" />
                                          )}
                                        </button>
                                        <span
                                          className={`text-sm sm:text-base ${
                                            completedTasks.has(task.id)
                                              ? "text-gray-500 line-through"
                                              : "text-gray-900"
                                          } transition-all duration-300`}
                                        >
                                          {task.title}
                                        </span>
                                      </div>
                                      {(popupContent[task.id] || secondarySubheaderMap[task.id]) && (
                                        <button
                                          onClick={() => openInfoPopup(task.id)}
                                          className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-8 w-8 transition-colors duration-200"
                                        >
                                          <InformationCircleIcon className="h-5 w-5" />
                                        </button>
                                      )}
                                      {fullPageUrlMap[task.title] && (
                                        <Link
                                          to={fullPageUrlMap[task.title]}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-10 w-10 transition-colors duration-200"
                                          onClick={() => {
                                            // Scroll to top of the page
                                            window.scrollTo(0, 0);
                                            
                                            // Save the current state to localStorage before navigating
                                            const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                                            const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                                            
                                            // Save to localStorage
                                            localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                                            localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                                          }}
                                        >
                                          {/* Purple book icon */}
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                          </svg>
                                        </Link>
                                      )}
                                      {task.hasLandingPage && (
                                        <Link
                                          to={task.landingPageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] hover:bg-[#6266ea]/5 h-8 px-3 transition-colors duration-200"
                                          onClick={() => {
                                            // Programmatically scroll to top after navigation
                                            setTimeout(() => {
                                              window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                              });
                                            }, 100);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                          </svg>
                                          <span className="text-xs font-medium">
                                            Full Page
                                          </span>
                                        </Link>
                                      )}
                                      {task.title === "Will or Probate" && (
                                        <Link
                                          to="/learn/finding-will"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 h-8 w-8 transition-colors duration-200"
                                          onClick={() => {
                                            // Scroll to top of the page
                                            window.scrollTo(0, 0);
                                            
                                            // Save the current state to localStorage before navigating
                                            const currentExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '{}');
                                            const currentExpandedDropdowns = JSON.parse(localStorage.getItem('expandedDropdowns') || '{}');
                                            
                                            // Set the category to be expanded when returning
                                            const sectionKey = "section-1"; // First section
                                            const categoryKey = "finding-will";
                                            
                                            // Set the category to be expanded
                                            currentExpandedCategories[`${sectionKey}-${categoryKey}`] = true;
                                            
                                            // Save to localStorage
                                            localStorage.setItem('expandedCategories', JSON.stringify(currentExpandedCategories));
                                            localStorage.setItem('expandedDropdowns', JSON.stringify(currentExpandedDropdowns));
                                            
                                            // Close the popup
                                            setIsInfoPopupOpen(false);
                                          }}
                                        >
                                          {/* Purple book icon */}
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                          </svg>
                                        </Link>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            })
                          }

                          {/* Render subcategories if they exist */}
                          {category.subCategories &&
                            Object.entries(category.subCategories).map(
                              ([subCategoryKey, subCategory], index) => (
                                <div
                                  key={subCategoryKey}
                                  className="mt-4 border border-gray-100 rounded-lg overflow-hidden shadow-sm animate-slideInLeft"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                  <button
                                    onClick={() =>
                                      toggleSubCategory(
                                        `${sectionKey}-${categoryKey}-${subCategoryKey}`,
                                      )
                                    }
                                    className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-gray-50/70 to-white hover:from-gray-100/70 hover:to-gray-50/70 transition-all duration-300"
                                  >
                                    <span className="font-medium text-gray-700">
                                      {subCategory.title}
                                    </span>
                                    <div className="flex items-center">
                                      {(() => {
                                        const progress =
                                          calculateSubCategoryProgress(
                                            subCategory,
                                          );
                                        return (
                                          <span className="mr-3 text-sm font-medium text-gray-600 bg-white/80 px-2 py-1 rounded-lg shadow-sm">
                                            {progress.completed}/
                                            {progress.total}
                                            {progress.isComplete &&
                                              progress.total > 0 && (
                                                <span className="ml-1 text-[#6266ea] font-medium bg-[#6266ea]/10 px-2 py-0.5 rounded-full text-xs">
                                                  COMPLETE
                                                </span>
                                              )}
                                          </span>
                                        );
                                      })()}
                                      <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-200 bg-white transition-all duration-300 ${expandedSubCategories[`${sectionKey}-${categoryKey}-${subCategoryKey}`] ? "bg-[#6266ea]/10 border-[#6266ea]/30 scale-110" : ""}`}
                                      >
                                        <svg
                                          className={`h-3 w-3 text-[#6266ea] transform transition-transform duration-300 ${expandedSubCategories[`${sectionKey}-${categoryKey}-${subCategoryKey}`] ? "rotate-180" : ""}`}
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </button>

                                  {expandedSubCategories[
                                    `${sectionKey}-${categoryKey}-${subCategoryKey}`
                                  ] && (
                                    <div className="p-4 space-y-3 bg-white animate-slideInBottom">
                                      {subCategory.subtasks.map(
                                        (task, taskIndex) => (
                                          <div
                                            key={task.id}
                                            className="flex items-start space-x-3 animate-fadeIn"
                                            style={{
                                              animationDelay: `${taskIndex * 0.05}s`,
                                            }}
                                          >
                                            {!task.isHeader && (
                                              <div className="flex-shrink-0 pt-0.5">
                                                <button
                                                  onClick={() =>
                                                    toggleTaskCompletion(
                                                      task.id,
                                                    )
                                                  }
                                                  className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6266ea] transition-all duration-300 ${
                                                    completedTasks.has(task.id)
                                                      ? "bg-[#6266ea] border-[#6266ea] scale-105"
                                                      : "border-gray-300 hover:border-[#6266ea]/70 hover:scale-105"
                                                  }`}
                                                  disabled={saving}
                                                >
                                                  {completedTasks.has(
                                                    task.id,
                                                  ) && (
                                                    <CheckIcon className="h-3 w-3 text-white animate-fadeIn" />
                                                  )}
                                                </button>
                                              </div>
                                            )}

                                            <div className="flex-grow">
                                              <div className="flex items-center flex-wrap">
                                                <span
                                                  className={`text-sm ${completedTasks.has(task.id) ? "text-gray-500 line-through" : "text-gray-700"} transition-all duration-300`}
                                                >
                                                  {task.title}
                                                </span>

                                                <div className="flex ml-2 space-x-2 items-center">
                                                  {task.info && (
                                                    <button
                                                      onClick={() =>
                                                        openInfoPopup(task.id)
                                                      }
                                                      className="group relative inline-flex items-center justify-center gap-1 text-xs font-medium text-[#6266ea] hover:text-[#4232c2] bg-white hover:bg-[#6266ea]/5 px-2 py-0.5 rounded-md transition-all duration-200 border border-[#6266ea]/10 hover:border-[#6266ea]/30 shadow-sm"
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3.5 w-3.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                      >
                                                        <path
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                      </svg>
                                                      Quick Info
                                                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-0.5 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                                        View details in popup
                                                      </span>
                                                    </button>
                                                  )}
                                                  {task.hasLandingPage && (
                                                    <Link
                                                      to={task.landingPageUrl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="ml-2 flex-shrink-0 rounded-md inline-flex items-center justify-center text-[#6266ea] hover:text-[#4232c2] hover:bg-[#6266ea]/5 h-8 px-3 transition-colors duration-200"
                                                      onClick={() => {
                                                        // Programmatically scroll to top after navigation
                                                        setTimeout(() => {
                                                          window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth",
                                                          });
                                                        }, 100);
                                                      }}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                      >
                                                        <path
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                      </svg>
                                                      <span className="text-xs font-medium">
                                                        Full Page
                                                      </span>
                                                    </Link>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </div>
                              ),
                            )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// Add this component before the return statement
const PopupContentRenderer = ({ content, taskId }) => {
  // If no content provided, show a message
  if (!content) {
    return <div className="text-gray-500 italic">No additional information available.</div>;
  }

  // Get the task object if taskId is provided
  let task = null;
  if (taskId) {
    // Simplified task search using the sections array structure
    for (const section of sections) {
      for (const category of section.categories) {
        const foundTask = category.items.find(item => item === taskId);
        if (foundTask) {
          task = { id: taskId, title: foundTask };
          break;
        }
      }
      if (task) break;
    }
  }

  // Icon mapping for headings based on heading text
  const getIconForHeading = (text) => {
    // Define specific mapping for each popup item
    const specificPopupIcons = {
      // Section 1: Notifications
      "Immediate Family": <UserGroupIcon className="w-5 h-5 text-indigo-600" />,
      "Close Friends & Extended Family": <UserGroupIcon className="w-5 h-5 text-indigo-600" />,
      "Doctor": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "Employer": <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />,
      // Section 1: Care
      "Children": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Pets": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      // Section 1: Their Wishes
      "Their Wishes": <DocumentTextIcon className="w-5 h-5 text-indigo-600" />,
      // Section 1: Handling the Body
      "Burial, Cremation, or Donation": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Body Transportation": <ClockIcon className="w-5 h-5 text-indigo-600" />,
      // Section 1: Funeral Planning
      "Funeral Home": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      // Section 1: Will & Probate
      "Will or Probate": <DocumentCheckIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2: Notifying State and Federal Agencies
      "DMV": <IdentificationIcon className="w-5 h-5 text-indigo-600" />,
      "Social Security": <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />,
      "IRS": <DocumentCheckIcon className="w-5 h-5 text-indigo-600" />,
      "Passport": <IdentificationIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2: Completing Notification Process
      "Email Accounts": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
      "Social Media": <UserGroupIcon className="w-5 h-5 text-indigo-600" />,
      "Long-Term Care Insurance": <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />,
      "Financial Companies": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "Vehicle(s)": <TruckIcon className="w-5 h-5 text-indigo-600" />,
      "Cell Phone": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "Physical Subscriptions": <NewspaperIcon className="w-5 h-5 text-indigo-600" />,
      "Bills and Accounts to Notify": <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2: Executing Will
      "Executing the Will": <DocumentCheckIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2: Applying for Benefits
      "Insurance Claims": <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />,
      "Pensions & Retirement": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "Veteran Affairs": <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />,
      "Investments": <CurrencyDollarIcon className="w-5 h-5 text-indigo-600" />,
      "Life Insurance (Claim Filing)": <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2: Finalizing
      "Scattering Ashes": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Thank You Cards": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
    };
    
    // Section heading mapping based on content
    const headingContentMapping = {
      // Section 1 mappings
      "Steps to Contact Immediate Family": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Notify the Doctor": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "Support Each Other": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Notify the Employer": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "Understand Benefit Payouts": <CurrencyDollarIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Arrange Care for Children": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Arrange Care for Pets": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Determine Their Wishes": <DocumentTextIcon className="w-5 h-5 text-indigo-600" />,
      
      // Section 2 mappings
      "Steps to Cancel a License": <IdentificationIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Take": <ArrowRightCircleIcon className="w-5 h-5 text-indigo-600" />,
      "How to Cancel a Passport": <IdentificationIcon className="w-5 h-5 text-indigo-600" />,
      "For Gmail": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
      "For Yahoo": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
      "For Outlook/Hotmail": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
      "For Other Providers": <EnvelopeIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Notify the Insurance Company": <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Notify Financial Institutions": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "Household & Utility Services": <HomeIcon className="w-5 h-5 text-indigo-600" />,
      "Financial Accounts & Insurance": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "Subscriptions & Memberships": <NewspaperIcon className="w-5 h-5 text-indigo-600" />,
      "Government & Legal Obligations": <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />,
      "Steps to Execute the Will": <DocumentCheckIcon className="w-5 h-5 text-indigo-600" />,
      "For AT\\&T Customers": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "For Verizon Customers": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
    };

    // Keyword-based mapping for general cases
    const keywordMapping = {
      "notification": <BellAlertIcon className="w-5 h-5 text-indigo-600" />,
      "notify": <BellAlertIcon className="w-5 h-5 text-indigo-600" />,
      "document": <DocumentTextIcon className="w-5 h-5 text-indigo-600" />,
      "legal": <DocumentCheckIcon className="w-5 h-5 text-indigo-600" />,
      "funeral": <HeartIcon className="w-5 h-5 text-indigo-600" />,
      "family": <UserGroupIcon className="w-5 h-5 text-indigo-600" />,
      "finance": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "money": <CurrencyDollarIcon className="w-5 h-5 text-indigo-600" />,
      "account": <BanknotesIcon className="w-5 h-5 text-indigo-600" />,
      "insurance": <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />,
      "time": <ClockIcon className="w-5 h-5 text-indigo-600" />,
      "step": <ArrowRightCircleIcon className="w-5 h-5 text-indigo-600" />,
      "contact": <PhoneIcon className="w-5 h-5 text-indigo-600" />,
      "home": <HomeIcon className="w-5 h-5 text-indigo-600" />,
      "property": <HomeIcon className="w-5 h-5 text-indigo-600" />,
      "business": <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />,
      "checklist": <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />,
      "learn": <BookOpenIcon className="w-5 h-5 text-indigo-600" />,
      "warning": <ExclamationCircleIcon className="w-5 h-5 text-indigo-600" />,
      "important": <ExclamationCircleIcon className="w-5 h-5 text-indigo-600" />,
    };

    // Default icon for headings without a specific match
    const defaultIcon = <InformationCircleIcon className="w-5 h-5 text-indigo-600" />;
    
    if (!text) return defaultIcon;
    
    // Convert text to string if it's not already
    const textStr = String(text);
    
    // First check for specific task ID mapping
    if (task && specificPopupIcons[task.title]) {
      return specificPopupIcons[task.title];
    }
    
    // Then check for specific heading content mapping
    for (const [heading, icon] of Object.entries(headingContentMapping)) {
      if (textStr.includes(heading)) {
        return icon;
      }
    }
    
    // Finally, fall back to keyword mapping
    const lowerText = textStr.toLowerCase();
    for (const [keyword, icon] of Object.entries(keywordMapping)) {
      if (lowerText.includes(keyword)) {
        return icon;
      }
    }
    
    return defaultIcon;
  };

  try {
    // Check if content has guidelines property (from checklistDatabase)
    const contentText = typeof content === 'object' && content.guidelines 
      ? content.guidelines 
      : typeof content === 'string' ? content : null;
    
    // If content is not a string, display a default message
    if (!contentText) {
      return <div className="text-gray-500 italic">Information for this task is not available in the expected format.</div>;
    }

    // Safely render the markdown content
    return (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({node, children, ...props}) => (
                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3 pb-1 border-b border-gray-100 flex items-center gap-2" {...props}>
                  {getIconForHeading(String(children))}
                  {children}
                </h3>
              ),
              h4: ({node, children, ...props}) => (
                <h4 className="text-lg font-bold text-[#4232c2] mt-6 mb-2 pb-1 border-b border-gray-100 flex items-center gap-2" {...props}>
                  {getIconForHeading(String(children))}
                  {children}
                </h4>
              ),
              h5: ({node, ...props}) => <h5 className="text-md font-bold text-gray-700 mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed my-3" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-800" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 my-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700 pl-1 py-1" {...props} />,
              a: ({node, href, children, ...props}) => {
                // Check if this is a popup link
                if (href && href.startsWith('#popup:')) {
                  const popupId = href.substring(7); // Remove '#popup:' prefix
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.preventDefault();
                        // Find the popup content for this ID
                        for (const section of sections) {
                          for (const category of section.categories) {
                            const foundItem = category.items.find(item => item === popupId);
                            if (foundItem) {
                              // Found the item, now open the popup
                              const openInfoPopup = window.openInfoPopup || null;
                              if (typeof openInfoPopup === 'function') {
                                openInfoPopup(popupId);
                              } else {
                                // Backup: Try to call our own openInfoPopup
                                openInfoPopup && openInfoPopup(popupId);
                              }
                              return;
                            }
                          }
                        }
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Handle special case for Scattering Ashes popup
                if (href === '#scattering-ashes-popup') {
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.preventDefault();
                        
                        // First close the current popup
                        setIsInfoPopupOpen(false);
                        
                        // Then open the Scattering Ashes popup after a short delay
                        setTimeout(() => {
                          openInfoPopup("Scattering Ashes");
                        }, 100);
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Handle our new custom link format for switching between popups
                if (href && href.startsWith('#link:')) {
                  const targetId = href.substring(6); // Remove '#link:' prefix
                  
                  // Map the link ID to the actual popup name
                  let popupName = "Scattering Ashes"; // Default
                  if (targetId === "scattering-ashes") {
                    popupName = "Scattering Ashes";
                  } else if (targetId === "Monthly-Social-Security-Benefits") {
                    popupName = "Monthly Social Security Benefits";
                  } else if (targetId === "social-security-benefits") {
                    popupName = "Social Security Benefits";
                  } else if (targetId === "funeral-home") {
                    popupName = "Funeral Home";
                  } else if (targetId === "Notifying_Credit_Bureaus") {
                    popupName = "Credit Bureaus";
                  } else if (targetId === "Managing-Bank-Accounts") {
                    popupName = "Bank Accounts";
                  } else if (targetId === "Closing-Credit-Debit-Cards") {
                    popupName = "Credit & Debit Cards";
                  } else if (targetId === "Inventory-Assets") {
                    popupName = "Assets Inventory";
                  }
                  
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.closeAndOpenPopup(popupName);
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Handle links to full pages using the fullPageUrlMap
                if (href && href.startsWith('#fullpage:')) {
                  const pageName = href.substring(10); // Remove '#fullpage:' prefix
                  const pageUrl = fullPageUrlMap[pageName] || '/';
                  
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.preventDefault();
                        
                        // Close the current popup first
                        setIsInfoPopupOpen(false);
                        
                        // Use React Router's navigate function or window.location
                        setTimeout(() => {
                          window.location.href = pageUrl;
                        }, 100); // Small delay to allow popup to close
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Check if the href is a direct absolute path from the fullPageUrlMap paths
                const isLearnPageLink = href && href.startsWith('/learn/');
                if (isLearnPageLink) {
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.preventDefault();
                        // Use the global function to close popup and navigate
                        window.closePopupAndNavigate(href);
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Improved default link handling for external URLs
                if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                  return (
                    <a 
                      className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(href, '_blank', 'noopener,noreferrer');
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                
                // Fallback default link handling
                return (
                  <a 
                    className="text-[#6266ea] hover:text-[#4232c2] underline hover:no-underline transition-colors" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={href}
                    {...props} 
                  />
                );
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-[#6266ea]/30 pl-4 italic text-gray-600 my-4" {...props} />
              ),
              hr: ({node, ...props}) => <hr className="my-6 border-t border-gray-200" {...props} />,
              img: ({node, ...props}) => <img className="rounded-lg my-4 max-w-full h-auto" {...props} />,
              // Ensure code blocks render properly
              code: ({node, inline, className, children, ...props}) => {
                return !inline ? (
                  <pre className="bg-gray-50 rounded p-4 overflow-x-auto my-4 text-sm border border-gray-200">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#4232c2]" {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {contentText}
          </ReactMarkdown>
        </div>

        {/* Add Learn More button if task has landing page */}
        {task && task.hasLandingPage && (
          <div className="mt-8 flex justify-center">
            <Link
              to={task.landingPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#6266ea]/20 bg-white px-6 py-3 text-sm font-medium text-[#6266ea] shadow-sm hover:shadow-md hover:bg-[#6266ea]/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6266ea] focus-visible:ring-offset-2 animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Learn More on Full Page
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering popup content:", error);
    return (
      <div className="text-gray-500 italic">
        An error occurred while rendering the popup content. {error.message}
      </div>
    );
  }
};
