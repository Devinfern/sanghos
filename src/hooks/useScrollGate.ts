
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
      if (!contentRef.current || hasTriggeredGate) return;

      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.scrollHeight;
      
      // Calculate how much of the content has been scrolled past
      const scrolled = Math.max(0, -rect.top);
      const scrollPercentage = scrolled / (elementHeight - windowHeight);
      
      if (scrollPercentage >= threshold) {
        setShouldShowGate(true);
        setHasTriggeredGate(true);
        // Store that gate was shown today
        localStorage.setItem(gateKey, Date.now().toString());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
