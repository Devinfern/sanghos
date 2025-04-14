
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { ForumEvent } from "@/lib/forumData";

interface CommunityEventsPageProps {
  events: ForumEvent[];
}

const CommunityEventsPage = ({ events }: CommunityEventsPageProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden border border-brand-subtle/30">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-brand-peach/10 rounded-lg p-3 text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-brand-primary">{event.date.day}</div>
                  <div className="text-sm text-brand-slate">{event.date.month}</div>
                </div>
                <Button variant="outline" size="sm" className="text-brand-primary border-brand-primary hover:bg-brand-primary/5">
                  Join Event
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-brand-dark mb-2">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-brand-slate">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-brand-slate">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Virtual Event</span>
                  </div>
                  <div className="flex items-center text-brand-slate">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">12 attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityEventsPage;
