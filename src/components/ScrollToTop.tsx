
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top using multiple methods
    const scrollToTop = () => {
      // Method 1: Direct window scroll
      window.scrollTo(0, 0);
      
      // Method 2: Document scroll
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Method 3: Force scroll with behavior auto (no smooth scrolling)
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'auto' 
      });
    };

    // Execute immediately - this is crucial for route changes
    scrollToTop();
    
    // Execute in next tick to handle React updates
    const immediateTimeout = setTimeout(scrollToTop, 0);
    
    // Execute after DOM painting
    const frameCallback = () => {
      scrollToTop();
      
      // Double-check after another frame for complex page layouts
      requestAnimationFrame(() => {
        scrollToTop();
        
        // Final verification - if scroll position is still not 0, force it
        setTimeout(() => {
          if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
            console.log('Forcing scroll reset after page navigation');
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }
        }, 50);
      });
    };
    
    const frameId = requestAnimationFrame(frameCallback);
    
    // Cleanup
    return () => {
      clearTimeout(immediateTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [pathname]); // This effect runs every time the route changes

  return null;
};

export default ScrollToTop;
