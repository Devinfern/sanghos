
import React from 'react';
import GatedContent from './GatedContent';

interface BlogPostConclusionProps {
  title: string;
  children: React.ReactNode;
  isGated?: boolean;
}

const BlogPostConclusion = ({ title, children, isGated = false }: BlogPostConclusionProps) => {
  return (
    <GatedContent isGated={isGated}>
      <div className="bg-gradient-to-r from-sage-50 to-brand-subtle/10 rounded-2xl p-8 mb-10">
        <h3 className="text-2xl font-bold text-brand-dark mb-6">{title}</h3>
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </GatedContent>
  );
};

export default BlogPostConclusion;
