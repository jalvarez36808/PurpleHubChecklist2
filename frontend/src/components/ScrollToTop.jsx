import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component scrolls the window to the top whenever
 * the pathname in the URL changes, except when navigating from checklist popups 
 * to full pages.
 */
export default function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // Skip scrolling if explicitly requested via state
    if (state?.maintainScrollPosition) {
      return;
    }
    
    // If there's a hash in the URL, scroll to it
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Skip scroll if navigating from checklist to a full page
    // This assumes links from checklist use target="_blank"
    if (window.opener) {
      return;
    }
    
    // Otherwise scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname, hash, state]);

  return null;
}