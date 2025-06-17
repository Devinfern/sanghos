export type Instructor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  yearsExperience: number;
};

// Add the instructors data
export const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Sarah Johnson",
    title: "Meditation Teacher & Yoga Instructor",
    bio: "Sarah has been teaching meditation and mindfulness for over 15 years. She specializes in helping beginners develop a consistent practice and has led retreats across North America and Europe. Her approach combines traditional meditation techniques with modern neuroscience insights.",
    specialties: ["Mindfulness Meditation", "Yoga", "Stress Reduction"],
    image: "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
    yearsExperience: 15
  },
  {
    id: "instructor-2",
    name: "Michael Chen",
    title: "Wellness Coach & Tai Chi Master",
    bio: "With roots in traditional Chinese medicine and modern wellness practices, Michael brings a holistic approach to his teaching. He has spent the last decade helping people find balance through movement, breathwork, and mindful living practices.",
    specialties: ["Tai Chi", "Qigong", "Breathwork"],
    image: "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png",
    yearsExperience: 12
  },
  {
    id: "instructor-3",
    name: "Elena Rodriguez",
    title: "Sound Healer & Retreat Facilitator",
    bio: "Elena combines her background in music therapy and meditation to create transformative sound healing experiences. Her retreats are known for their deep emotional healing properties and ability to help participants release long-held tensions.",
    specialties: ["Sound Healing", "Music Therapy", "Emotional Release"],
    image: "/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png",
    yearsExperience: 8
  }
];

export interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Retreat {
  id: string;
  title: string;
  description: string;
  image: string;
  additionalImages?: string[];
  location: Location;
  instructor: Instructor;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  remaining: number;
  category: string[];
  amenities?: string[];
  featured?: boolean;
  isSanghos?: boolean;
  sourceUrl?: string;
  bookingUrl?: string;
  organizer?: {
    name: string;
    website?: string;
  };
  source?: string;
}

// Create a new async function to fetch retreats from Supabase
export const fetchSanghosRetreats = async (): Promise<Retreat[]> => {
  try {
    // Since we're not actually fetching from the database in this demo,
    // we'll just return placeholder retreats for now
    return [
      {
        id: "sanghos-retreat-1",
        title: "Forest Meditation Weekend",
        description: "Immerse yourself in the serene beauty of nature with our forest meditation weekend. Practice mindfulness among ancient trees and gentle streams.",
        image: "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png",
        additionalImages: ["/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png", "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png"],
        location: {
          name: "Redwood Sanctuary",
          address: "123 Forest Path",
          city: "Mill Valley",
          state: "CA",
          description: "A secluded meditation center nestled in redwood groves",
        },
        instructor: instructors[0],
        date: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0], // 1 week from now
        time: "9:00 AM",
        duration: "Weekend",
        price: 299,
        capacity: 20,
        remaining: 8,
        category: ["Meditation", "Nature", "Wellness"],
        amenities: ["Meals included", "Accommodation", "Guided hikes"],
        featured: false, // Changed to false so the new retreats can be featured
        isSanghos: true
      },
      {
        id: "sanghos-retreat-2",
        title: "Urban Mindfulness Day",
        description: "Find peace in the midst of city life. This one-day retreat offers tools for bringing mindfulness into your everyday urban environment.",
        image: "/lovable-uploads/f0037ad0-9984-49e7-8f7f-cdb9a489329b.png",
        additionalImages: ["/lovable-uploads/63278e9b-148b-472f-8a90-0b044d4c7aad.png", "/lovable-uploads/c9aa8f45-54df-452f-85e5-4ced4b56e21a.png"],
        location: {
          name: "Downtown Zen Center",
          address: "456 Calm Street",
          city: "San Francisco",
          state: "CA",
          description: "A peaceful oasis in the heart of the city",
        },
        instructor: instructors[0],
        date: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0], // 2 weeks from now
        time: "10:00 AM",
        duration: "Full day",
        price: 150,
        capacity: 30,
        remaining: 15,
        category: ["Mindfulness", "Workshop"],
        amenities: ["Lunch included", "Journal materials"],
        featured: false, // Changed to false so the new retreats can be featured
        isSanghos: true
      },
      {
        id: "sanghos-retreat-3",
        title: "Transformative Movement Practice",
        description: "Experience the power of conscious movement in this transformative retreat that combines dance, yoga, and expressive arts therapy.",
        image: "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
        additionalImages: ["/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png"],
        location: {
          name: "Movement Studio Sanctuary",
          address: "789 Flow Avenue",
          city: "Berkeley",
          state: "CA",
          description: "A spacious studio designed for movement and expression",
        },
        instructor: instructors[1],
        date: new Date(Date.now() + 21*24*60*60*1000).toISOString().split('T')[0], // 3 weeks from now
        time: "2:00 PM",
        duration: "Half day",
        price: 125,
        capacity: 25,
        remaining: 12,
        category: ["Movement", "Expressive Arts", "Healing"],
        amenities: ["Movement props provided", "Refreshments"],
        featured: true,
        isSanghos: true
      },
      {
        id: "sanghos-retreat-4",
        title: "Cultivating Emotional Balance",
        description: "Learn to navigate emotions with grace and develop lasting emotional resilience through mindfulness and self-compassion practices.",
        image: "/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg",
        additionalImages: ["/lovable-uploads/440cf0e4-ee06-4235-9ec4-b3ecdefd7ee9.jpg", "/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg"],
        location: {
          name: "Serenity Gardens",
          address: "321 Peaceful Way",
          city: "Marin",
          state: "CA",
          description: "A tranquil garden setting perfect for emotional healing",
        },
        instructor: instructors[2],
        date: new Date(Date.now() + 28*24*60*60*1000).toISOString().split('T')[0], // 4 weeks from now
        time: "1:00 PM",
        duration: "Full day",
        price: 175,
        capacity: 18,
        remaining: 6,
        category: ["Emotional Wellness", "Mindfulness", "Self-Compassion"],
        amenities: ["Healthy lunch", "Take-home resources", "Group support"],
        featured: true,
        isSanghos: true
      },
      {
        id: "sanghos-retreat-5",
        title: "Mindful Communication Retreat",
        description: "Transform your relationships through conscious communication, deep listening, and compassionate dialogue techniques.",
        image: "/lovable-uploads/60c5a966-4e10-4c09-af70-bfafe90c0630.png",
        additionalImages: ["/lovable-uploads/6bab8880-8765-4e83-9a38-d482633fdc95.png", "/lovable-uploads/6cfc97b1-427f-4ebf-a716-8fe99ee5694a.png", "/lovable-uploads/6d18343c-7100-4964-a39e-2a3215536423.png"],
        location: {
          name: "Connection Center",
          address: "456 Harmony Lane",
          city: "Sausalito",
          state: "CA",
          description: "A welcoming space designed for authentic connection",
        },
        instructor: instructors[0],
        date: new Date(Date.now() + 35*24*60*60*1000).toISOString().split('T')[0], // 5 weeks from now
        time: "9:30 AM",
        duration: "Weekend",
        price: 225,
        capacity: 16,
        remaining: 9,
        category: ["Communication", "Relationships", "Mindfulness"],
        amenities: ["All meals included", "Communication toolkit", "Practice partners"],
        featured: true,
        isSanghos: true
      }
    ];
  } catch (error) {
    console.error("Error fetching Sanghos retreats:", error);
    return [];
  }
};

// This will now be populated dynamically from InsightLA events and won't be used as a static import
export let retreats: Retreat[] = [];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getRemainingText = (remaining: number): string => {
  if (remaining <= 0) return "Sold out";
  if (remaining === 1) return "Only 1 spot left";
  if (remaining <= 3) return `Only ${remaining} spots left`;
  return `${remaining} spots available`;
};
