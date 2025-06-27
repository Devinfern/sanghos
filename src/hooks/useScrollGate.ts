
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseScrollGateOptions {
  threshold?: number; // Percentage of content to show before gating (0-1)
  enabled?: boolean;
}

export const useScrollGate = ({ threshold = 0.3, enabled = true }: UseScrollGateOptions = {}) => {
  const [shouldShowGate, setShouldShowGate] = useState(false);
  const [hasTriggeredGate, setHasTriggeredGate] = useState(false);
  const { user } = useAuth();
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Don't gate for authenticated users
    if (user || !enabled) {
      setShouldShowGate(false);
      return;
    }

    // Check if user has already seen the gate today (localStorage)
    const gateKey = `sanghos_gate_${window.location.pathname}`;
    const lastGateTime = localStorage.getItem(gateKey);
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    if (lastGateTime && parseInt(lastGateTime) > oneDayAgo) {
      return;
    }

    const handleScroll = () => {
      if (hasTriggeredGate) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Ensure we have valid measurements
      if (documentHeight <= windowHeight) {
        console.log('Document height too small for gating');
        return;
      }
      
      // Calculate scroll percentage more reliably
      const maxScrollTop = documentHeight - windowHeight;
      const scrollPercentage = Math.min(scrollTop / maxScrollTop, 1);
      
      console.log('Scroll data:', {
        scrollTop,
        windowHeight,
        documentHeight,
        maxScrollTop,
        scrollPercentage,
        threshold,
        shouldTrigger: scrollPercentage >= threshold
      });
      
      if (scrollPercentage >= threshold) {
        console.log('Triggering gate at scroll percentage:', scrollPercentage);
        setShouldShowGate(true);
        setHasTriggeredGate(true);
        // Store that gate was shown today
        localStorage.setItem(gateKey, Date.now().toString());
      }
    };

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Check initial scroll position after a brief delay
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [user, enabled, threshold, hasTriggeredGate]);

  const dismissGate = () => {
    setShouldShowGate(false);
  };

  return {
    shouldShowGate,
    contentRef,
    dismissGate
  };
};
