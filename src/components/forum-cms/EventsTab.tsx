
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ForumEvent, forumEvents, updateForumEvents } from "@/lib/forumData";

export const EventsTab = () => {
  const [events, setEvents] = useState([...forumEvents]);
  const [editingEvent, setEditingEvent] = useState<Partial<ForumEvent> | null>(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const handleEditEvent = (event: ForumEvent) => {
    setEditingEvent({...event});
    setEventDialogOpen(true);
  };

  const handleAddEvent = () => {
    const today = new Date();
    setEditingEvent({
      id: String(Date.now()), // Convert to string for compatibility
      date: {
        day: today.getDate(),
        month: today.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      },
      title: "",
      time: "9:00 - 10:00 AM PDT",
    });
    setEventDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!editingEvent) return;

    if (!editingEvent.title || !editingEvent.time) {
      toast.error("Title and time are required");
      return;
    }

    const newEvents = [...events];
    const eventIndex = newEvents.findIndex(e => e.id === editingEvent.id);
    
    if (eventIndex === -1) {
      newEvents.push(editingEvent as ForumEvent);
    } else {
      newEvents[eventIndex] = editingEvent as ForumEvent;
    }
    
    setEvents(newEvents);
    updateForumEvents(newEvents);
    setEventDialogOpen(false);
    toast.success(eventIndex === -1 ? "Event added successfully" : "Event updated successfully");
  };

  const handleDeleteEvent = (eventId: string) => {
    const newEvents = events.filter(e => e.id !== eventId);
    
    setEvents(newEvents);
    updateForumEvents(newEvents);
    toast.success("Event deleted successfully");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Manage events displayed in the sidebar</CardDescription>
        </div>
        <Button onClick={handleAddEvent}>
          <Plus className="h-4 w-4 mr-2" /> Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="text-center min-w-16">
                  <div className="text-lg font-bold">{event.date.day}</div>
                  <div className="text-xs text-muted-foreground">{event.date.month}</div>
                </div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditEvent(event)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {events.some(e => e.id === editingEvent?.id) ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">Title</Label>
              <Input
                id="event-title"
                value={editingEvent?.title || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-time" className="text-right">Time</Label>
              <Input
                id="event-time"
                value={editingEvent?.time || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, time: e.target.value} : null)}
                placeholder="e.g. 9:00 - 10:00 AM PDT"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-day" className="text-right">Day</Label>
              <Input
                id="event-day"
                type="number"
                min="1"
                max="31"
                value={editingEvent?.date?.day || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {
                  ...prev, 
                  date: {...prev.date!, day: parseInt(e.target.value)}
                } : null)}
                className="col-span-1"
              />
              <Label htmlFor="event-month" className="text-right">Month</Label>
              <select
                id="event-month"
                value={editingEvent?.date?.month || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {
                  ...prev, 
                  date: {...prev.date!, month: e.target.value}
                } : null)}
                className="col-span-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="JAN">JAN</option>
                <option value="FEB">FEB</option>
                <option value="MAR">MAR</option>
                <option value="APR">APR</option>
                <option value="MAY">MAY</option>
                <option value="JUN">JUN</option>
                <option value="JUL">JUL</option>
                <option value="AUG">AUG</option>
                <option value="SEP">SEP</option>
                <option value="OCT">OCT</option>
                <option value="NOV">NOV</option>
                <option value="DEC">DEC</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
