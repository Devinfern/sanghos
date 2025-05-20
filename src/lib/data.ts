export type Instructor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  yearsExperience: number;
};

export type Retreat = {
  id: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    description: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  instructor: Instructor;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  remaining: number;
  category: string[];
  amenities: string[];
  featured: boolean;
  isSanghos: boolean;
  sourceUrl?: string; // Add sourceUrl for tracking the original source
};

export const instructors: Instructor[] = [
  {
    id: "insight-la",
    name: "InsightLA",
    title: "Mindfulness Organization",
    bio: "InsightLA is a non-profit mindfulness meditation center teaching the art of mindfulness and compassion. They offer classes, groups, workshops and retreats for developing greater awareness, compassion, resilience, and well-being.",
    specialties: ["Meditation", "Mindfulness", "Buddhist Practice", "Wellness"],
    image: "https://images.squarespace-cdn.com/content/v1/5c7feb97797f744d5f1c68a7/1553558094608-3P4IDOETDRUGBVPU5QQR/InsightLA_Logo_FullColor.jpg",
    yearsExperience: 15
  }
];

// This will be populated dynamically from InsightLA events
export let retreats: Retreat[] = [];

// Placeholder retreats until the real ones are loaded
const placeholderRetreats: Retreat[] = [
  {
    id: "insight-la-1",
    title: "Loading InsightLA Events...",
    description: "Please wait while we load the latest mindfulness retreats from InsightLA.",
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop",
    additionalImages: [],
    location: {
      name: "InsightLA",
      address: "4300 Melrose Ave",
      city: "Los Angeles",
      state: "CA",
      description: "InsightLA East Hollywood Center",
    },
    instructor: instructors[0],
    date: new Date().toISOString().split('T')[0],
    time: "10:00 AM",
    duration: "Full day",
    price: 180,
    capacity: 25,
    remaining: 15,
    category: ["Meditation", "Mindfulness"],
    amenities: ["Meditation cushions", "Tea service"],
    featured: true,
    isSanghos: false
  }
];

// Initialize with placeholder retreats
retreats = [...placeholderRetreats];

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
