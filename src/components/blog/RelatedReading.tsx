
import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedReadingProps {
  internalLinks: Array<{
    title: string;
    href: string;
  }>;
  externalLinks?: Array<{
    title: string;
    href: string;
  }>;
  exploreLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const RelatedReading = ({ internalLinks, externalLinks, exploreLinks }: RelatedReadingProps) => {
  return (
    <div className="bg-white border border-sage-200 rounded-xl p-8 mb-12">
      <h3 className="text-xl font-bold text-brand-dark mb-6">Related Reading</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Internal Blog Links */}
        <div>
          <h4 className="font-semibold mb-3">From Our Blog:</h4>
          <ul className="space-y-2">
            {internalLinks.map((link, index) => (
              <li key={index}>
                • <Link to={link.href} className="text-brand-primary hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* External Resources */}
        {externalLinks && (
          <div>
            <h4 className="font-semibold mb-3">Research & Resources:</h4>
            <ul className="space-y-2">
              {externalLinks.map((link, index) => (
                <li key={index}>
                  • <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-primary hover:underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Explore Further */}
        <div>
          <h4 className="font-semibold mb-3">Explore Further:</h4>
          <ul className="space-y-2">
            {exploreLinks ? exploreLinks.map((link, index) => (
              <li key={index}>
                • <Link to={link.href} className="text-brand-primary hover:underline">
                  {link.title}
                </Link>
              </li>
            )) : (
              <>
                <li>• <Link to="/retreats" className="text-brand-primary hover:underline">Browse Mindfulness Retreats</Link></li>
                <li>• <Link to="/instructors" className="text-brand-primary hover:underline">Find Qualified Instructors</Link></li>
                <li>• <Link to="/wellness-studios" className="text-brand-primary hover:underline">Discover Wellness Studios</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelatedReading;
