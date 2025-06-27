
import React from 'react';

interface BlogPostIntroProps {
  children: React.ReactNode;
}

const BlogPostIntro = ({ children }: BlogPostIntroProps) => {
  return (
    <div className="bg-sage-50 rounded-2xl p-8 mb-12">
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
};

export default BlogPostIntro;
