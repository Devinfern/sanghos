
import React from 'react';

// If the component needs events data, add a props interface
interface CommunityEventsPageProps {
  events?: any[]; // Replace with proper type when available
}

// Add default props to ensure events is always available
const CommunityEventsPage: React.FC<CommunityEventsPageProps> = ({ events = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Events</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{event.title || 'Event Title'}</h2>
              <p>{event.description || 'Event Description'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events available at the moment. Check back soon!</p>
      )}
    </div>
  );
};

export default CommunityEventsPage;
