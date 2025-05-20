
import { Card } from "@/components/ui/card";
import { ForumEvent } from "@/lib/forumData";
import { Link } from "react-router-dom";

interface CommunityEventsProps {
  events: ForumEvent[];
}

// Add default props to ensure events is always available
const CommunityEvents = ({ events }: CommunityEventsProps) => {
  return (
    <Card className="overflow-hidden border border-brand-subtle/30 shadow-sm">
      <div className="p-4 border-b border-brand-subtle/30 bg-brand-subtle/10">
        <h3 className="font-semibold text-brand-dark">Upcoming events</h3>
      </div>
      <div className="divide-y divide-brand-subtle/30">
        {events.map((event) => (
          <Link
            key={event.id}
            to={event.retreat_id ? `/retreat/${event.retreat_id}` : `/retreats?search=${encodeURIComponent(event.title)}`}
            className="block"
          >
            <div className="p-4 flex gap-3 hover:bg-brand-subtle/5 transition-colors">
              <div className="text-center w-12 bg-brand-peach/10 rounded-md p-1">
                <div className="text-lg font-bold text-brand-primary">{event.date.day}</div>
                <div className="text-xs text-brand-slate">{event.date.month}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-brand-dark">{event.title}</h4>
                <p className="text-xs text-brand-slate mt-1">{event.time}</p>
                {event.location && (
                  <p className="text-xs text-brand-slate mt-0.5">{event.location}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default CommunityEvents;
