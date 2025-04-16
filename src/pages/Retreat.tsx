
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MapPin, Clock, Info } from "lucide-react";
import { Link } from 'react-router-dom';

// This would typically come from your data source/API
const mockRetreatData = {
  "retreat-123": {
    id: "retreat-123",
    title: "Inner Calm Meditation Retreat",
    description: "A 5-day immersive experience to develop your meditation practice in the serene mountains of California. This retreat is perfect for both beginners and experienced meditators looking to deepen their practice.",
    longDescription: "Join us for a transformative journey into mindfulness and inner peace. During this 5-day retreat, you'll disconnect from the stresses of daily life and immerse yourself in guided meditation practices, mindful movement sessions, and workshops led by experienced teachers. Nestled in the beautiful mountains, our retreat center provides the perfect environment for self-reflection and growth.",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    location: "Peaceful Valley Resort, California",
    price: 1299,
    capacity: 20,
    spotsLeft: 8,
    instructor: {
      name: "Maya Johnson",
      bio: "Maya is a certified meditation instructor with over 10 years of experience leading retreats around the world.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    schedule: [
      { day: "Day 1", title: "Arrival & Welcome", time: "2:00 PM - 7:00 PM", description: "Check-in, orientation, welcome dinner, and opening ceremony." },
      { day: "Day 2-4", title: "Full Retreat Days", time: "6:00 AM - 9:00 PM", description: "Morning meditation, breakfast, workshops, lunch, free time, afternoon practice, dinner, evening session." },
      { day: "Day 5", title: "Closing & Departure", time: "6:00 AM - 12:00 PM", description: "Morning meditation, breakfast, closing circle, and check-out." }
    ],
    amenities: ["Private & shared rooms", "All meals included", "Meditation hall", "Nature trails", "Hot springs", "Massage services (additional fee)"],
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  "retreat-456": {
    id: "retreat-456",
    title: "Yoga and Mindfulness Weekend",
    description: "Reconnect with yourself through yoga, meditation, and nature during this rejuvenating weekend retreat in Colorado.",
    longDescription: "This weekend retreat combines yoga and mindfulness practices to help you reconnect with yourself in the beautiful mountains of Colorado. Suitable for all levels, our experienced instructors will guide you through various yoga styles, meditation sessions, and mindful activities in nature. Take time to relax, reflect, and recharge in a supportive community atmosphere.",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    location: "Serenity Lodge, Colorado",
    price: 799,
    capacity: 15,
    spotsLeft: 7,
    instructor: {
      name: "David Chen",
      bio: "David is a yoga instructor and mindfulness coach with a passion for helping others find balance in their lives.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    schedule: [
      { day: "Friday", title: "Arrival Day", time: "3:00 PM - 9:00 PM", description: "Check-in, welcome session, dinner, and gentle yoga." },
      { day: "Saturday", title: "Full Day", time: "7:00 AM - 9:00 PM", description: "Morning yoga, breakfast, workshops, lunch, nature walk, restorative yoga, dinner." },
      { day: "Sunday", title: "Closing Day", time: "7:00 AM - 2:00 PM", description: "Morning meditation, breakfast, closing circle, final yoga session, and departure." }
    ],
    amenities: ["Shared cabins", "Vegetarian meals", "Yoga studio", "Hiking trails", "Campfire circles"],
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
};

const Retreat = () => {
  const { slug } = useParams();
  const [retreat, setRetreat] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the retreat data from your API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      if (slug && mockRetreatData[slug as keyof typeof mockRetreatData]) {
        setRetreat(mockRetreatData[slug as keyof typeof mockRetreatData]);
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-80 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!retreat) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Retreat Not Found</h1>
        <p className="mb-6">The retreat you're looking for doesn't seem to exist.</p>
        <Button asChild>
          <Link to="/retreats">Browse All Retreats</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{retreat.title}</h1>
          
          <div className="mb-6 aspect-video overflow-hidden rounded-lg">
            <img 
              src={retreat.image} 
              alt={retreat.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center text-sm bg-brand-subtle/10 px-3 py-1.5 rounded-full">
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>{new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm bg-brand-subtle/10 px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{retreat.location}</span>
            </div>
            <div className="flex items-center text-sm bg-brand-subtle/10 px-3 py-1.5 rounded-full">
              <Users className="h-4 w-4 mr-1.5" />
              <span>{retreat.spotsLeft} spots left</span>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <p className="text-lg mb-4">{retreat.description}</p>
              <p className="mb-6">{retreat.longDescription}</p>
            </TabsContent>
            
            <TabsContent value="schedule" className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Retreat Schedule</h3>
              <div className="space-y-4">
                {retreat.schedule.map((item: any, idx: number) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-subtle/20 p-2 rounded">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.day}: {item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{item.time}</p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="pt-4">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src={retreat.instructor.image} 
                  alt={retreat.instructor.name}
                  className="w-40 h-40 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{retreat.instructor.name}</h3>
                  <p>{retreat.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {retreat.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-brand-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="pt-4">
              <div className="text-center p-6 bg-brand-subtle/10 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Join the Retreat Community</h3>
                <p className="mb-4">
                  Connect with fellow participants before and after your retreat.
                  Share your intentions, coordinate travel plans, and continue your journey together.
                </p>
                <Button asChild>
                  <Link to={`/community/retreat/${retreat.id}`}>
                    Visit Retreat Community
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-brand-primary mb-1">${retreat.price}</h2>
            <p className="text-sm text-muted-foreground mb-4">per person, all inclusive</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dates</span>
                <span className="font-medium">{new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {Math.ceil((new Date(retreat.endDate).getTime() - new Date(retreat.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{retreat.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium">{retreat.spotsLeft} of {retreat.capacity} spots left</span>
              </div>
            </div>
            
            <Button className="w-full mb-3">Book Now</Button>
            <Button variant="outline" className="w-full">Add to Wishlist</Button>
            
            <div className="mt-6 p-4 bg-brand-subtle/10 rounded-lg text-center">
              <h4 className="font-medium mb-1">Need help?</h4>
              <p className="text-sm text-muted-foreground">
                Have questions about this retreat?
              </p>
              <Link to="/contact" className="text-brand-primary text-sm hover:underline">
                Contact us
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Retreat;
