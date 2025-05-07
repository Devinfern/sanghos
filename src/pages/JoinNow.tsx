
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinNow = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page with join=true parameter
    navigate('/login?join=true');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting to signup form...</p>
    </div>
  );
};

export default JoinNow;
