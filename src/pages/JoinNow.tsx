
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinNow = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page with join=true parameter
    navigate('/login?join=true');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-light">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-brand-primary border-b-brand-primary border-r-brand-sand border-l-brand-sand rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-brand-dark">Redirecting to signup form...</p>
      </div>
    </div>
  );
};

export default JoinNow;
