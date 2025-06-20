
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BlogPostCTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

const BlogPostCTA = ({ 
  title, 
  description, 
  primaryButtonText, 
  primaryButtonLink, 
  secondaryButtonText, 
  secondaryButtonLink 
}: BlogPostCTAProps) => {
  return (
    <div className="text-center bg-white border border-sage-200 rounded-xl p-8">
      <h3 className="text-xl font-bold text-brand-dark mb-4">{title}</h3>
      <p className="text-brand-slate mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
          <Link to={primaryButtonLink}>{primaryButtonText}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPostCTA;
