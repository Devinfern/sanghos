
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';

/**
 * This component helps debug the event loading issue
 * It monitors route changes and logs relevant information
 */
const InsightLAEventLoader: React.FC = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  
  useEffect(() => {
    console.log(`Navigation detected: ${previousPath || 'initial'} → ${location.pathname}`);
    
    // Track the previous path for navigation debugging
    setPreviousPath(location.pathname);
    
  }, [location.pathname]);

  return null; // This is a non-visual component
};

export default InsightLAEventLoader;
