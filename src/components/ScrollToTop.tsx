
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure the scroll happens after the DOM update
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Additional check to ensure scroll worked
      if (window.pageYOffset !== 0 || document.documentElement.scrollTop !== 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute on next frame to handle any delayed renders
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // And one more time after a short delay for extra safety
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
