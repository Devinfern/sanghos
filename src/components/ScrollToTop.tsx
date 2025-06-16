
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple approaches to ensure scroll works across different scenarios
    const scrollToTop = () => {
      // Method 1: Standard window scroll
      window.scrollTo(0, 0);
      
      // Method 2: Document element scroll
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 3: Smooth scroll with immediate behavior
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'auto' 
      });
    };

    // Execute immediately
    scrollToTop();
    
    // Execute after React has rendered (next tick)
    const immediateTimeout = setTimeout(() => {
      scrollToTop();
    }, 0);
    
    // Execute after DOM updates (next frame)
    const frameId = requestAnimationFrame(() => {
      scrollToTop();
      
      // Double-check after another frame for complex layouts
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });
    
    // Final safety net for stubborn cases
    const delayedTimeout = setTimeout(() => {
      scrollToTop();
      
      // Verify scroll position and force if needed
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
        console.log('Scroll position not reset, forcing scroll to top');
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(immediateTimeout);
      clearTimeout(delayedTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
