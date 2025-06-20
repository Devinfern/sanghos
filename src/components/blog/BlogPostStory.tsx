
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BlogPostStoryProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  date?: string;
  source?: string;
  children: React.ReactNode;
}

const BlogPostStory = ({ icon: Icon, title, subtitle, date, source, children }: BlogPostStoryProps) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-6 w-6 text-brand-primary" />
        <h2 className="text-3xl font-bold text-brand-dark">{title}</h2>
      </div>
      
      {(subtitle || date || source) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          {date && source && (
            <p className="text-sm text-gray-600 mb-2 font-medium">{date} - {source}</p>
          )}
          {subtitle && (
            <p className="font-semibold text-lg">{subtitle}</p>
          )}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
};

export default BlogPostStory;
