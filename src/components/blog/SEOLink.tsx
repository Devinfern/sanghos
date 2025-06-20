
import React from 'react';

interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

const SEOLink = ({ href, children, className = "text-brand-primary hover:underline", isExternal = true }: SEOLinkProps) => {
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={className}
      >
        {children}
      </a>
    );
  }
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export default SEOLink;
