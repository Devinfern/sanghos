
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

    // Simple scroll handler
    const handleScroll = () => {
      if (hasTriggeredGate) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate how far user has scrolled as percentage
      const scrolled = scrollTop / (documentHeight - windowHeight);
      
      console.log('Scroll check:', {
        scrollTop,
        scrolled: Math.round(scrolled * 100) + '%',
        threshold: Math.round(threshold * 100) + '%',
        shouldTrigger: scrolled >= threshold
      });
      
      // Trigger gate when user has scrolled past threshold
      if (scrolled >= threshold) {
        console.log('🚀 Triggering content gate!');
        setShouldShowGate(true);
        setHasTriggeredGate(true);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
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
