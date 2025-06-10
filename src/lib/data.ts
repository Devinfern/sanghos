
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
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    yearsExperience: 15
  },
  {
    id: "instructor-2",
    name: "Michael Chen",
    title: "Wellness Coach & Tai Chi Master",
    bio: "With roots in traditional Chinese medicine and modern wellness practices, Michael brings a holistic approach to his teaching. He has spent the last decade helping people find balance through movement, breathwork, and mindful living practices.",
    specialties: ["Tai Chi", "Qigong", "Breathwork"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    yearsExperience: 12
  },
  {
    id: "instructor-3",
    name: "Elena Rodriguez",
    title: "Sound Healer & Retreat Facilitator",
    bio: "Elena combines her background in music therapy and meditation to create transformative sound healing experiences. Her retreats are known for their deep emotional healing properties and ability to help participants release long-held tensions.",
    specialties: ["Sound Healing", "Music Therapy", "Emotional Release"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0fGVufDB8fDB8fHww",
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
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
        additionalImages: [],
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
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop",
        additionalImages: [],
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
