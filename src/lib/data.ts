
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
};

// This is where you modify the data with your own instructors
export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Emily Rodriguez",
    title: "Mindfulness Coach & Yoga Instructor",
    bio: "Emily has been practicing mindfulness meditation and yoga for over 12 years. She combines traditional yogic teachings with modern psychological approaches to help students develop greater self-awareness and inner calm.",
    specialties: ["Vinyasa Yoga", "Mindfulness Meditation", "Stress Reduction", "Corporate Wellness"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    yearsExperience: 12
  },
  {
    id: "inst-2",
    name: "Marcus Johnson",
    title: "Sound Healer & Breathwork Facilitator",
    bio: "Marcus discovered sound healing during his journey recovering from burnout. He now combines therapeutic sound practices with breathwork techniques to create deeply restorative experiences for participants at all levels.",
    specialties: ["Sound Baths", "Breathwork", "Stress Release", "Gong Meditation"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    yearsExperience: 8
  },
  {
    id: "inst-3",
    name: "Sophia Chang",
    title: "Nature Connection Guide & Qigong Teacher",
    bio: "With a background in environmental science and traditional Chinese medicine, Sophia specializes in helping people reconnect with nature through mindful practices. Her retreats focus on finding balance and energy through gentle movement and nature immersion.",
    specialties: ["Qigong", "Nature Therapy", "Forest Bathing", "Traditional Chinese Medicine"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    yearsExperience: 15
  }
];

// This is where you modify the data with your own retreats
export const retreats: Retreat[] = [
  {
    id: "ret-1",
    title: "Weekend Mindfulness Immersion",
    description: "Disconnect from the digital world and reconnect with yourself in this rejuvenating weekend retreat. Through guided meditation, mindful movement, and nature connection practices, you'll learn practical tools to bring greater presence and peace into your everyday life.",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
    additionalImages: [
      "https://images.unsplash.com/photo-1510137600163-2729bc6959e4",
      "https://images.unsplash.com/photo-1604881991720-f91add269bed"
    ],
    location: {
      name: "Cedar Ridge Retreat Center",
      address: "142 Mountain View Road",
      city: "Malibu",
      state: "CA",
      description: "Nestled in the Santa Monica Mountains with stunning ocean views, this peaceful property features meditation gardens, hiking trails, and comfortable eco-friendly accommodations."
    },
    instructor: instructors[0], // Reference to Emily Rodriguez
    date: "2023-12-08",
    time: "5:00 PM Friday - 2:00 PM Sunday",
    duration: "2 days",
    price: 695,
    capacity: 15,
    remaining: 6,
    category: ["Meditation", "Mindfulness", "Yoga"],
    amenities: ["Organic meals included", "Private and shared rooms", "Hot tub", "Hiking trails", "Meditation cushions provided"],
    featured: true
  },
  {
    id: "ret-2",
    title: "Sound Healing Journey",
    description: "Experience the profound healing effects of sound vibration in this immersive day retreat. Using Tibetan singing bowls, gongs, and other instruments, Marcus will guide you through a sound journey combined with breathwork to release tension, reduce stress, and promote deep relaxation.",
    image: "https://images.unsplash.com/photo-1578091879915-33e3a8338cde",
    additionalImages: [
      "https://images.unsplash.com/photo-1504417930654-1aa74d1cb4d8",
      "https://images.unsplash.com/photo-1616897350333-fd12b303e234"
    ],
    location: {
      name: "Urban Sanctuary",
      address: "521 Oak Street",
      city: "San Francisco",
      state: "CA",
      description: "A tranquil space in the heart of the city with hardwood floors, floor-to-ceiling windows, and a peaceful courtyard garden."
    },
    instructor: instructors[1], // Reference to Marcus Johnson
    date: "2023-11-18",
    time: "10:00 AM - 4:00 PM",
    duration: "6 hours",
    price: 185,
    capacity: 20,
    remaining: 8,
    category: ["Sound Healing", "Breathwork", "Stress Reduction"],
    amenities: ["Plant-based lunch", "Tea service", "Yoga mats and blankets provided", "Journal for reflection"],
    featured: true
  },
  {
    id: "ret-3",
    title: "Forest Qigong Retreat",
    description: "Connect with the healing energy of the forest through gentle qigong practices, guided forest bathing, and mindful awareness exercises. This retreat is perfect for anyone seeking to recharge their energy and deepen their relationship with the natural world.",
    image: "https://images.unsplash.com/photo-1513806562344-c75007ad303d",
    additionalImages: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
      "https://images.unsplash.com/photo-1636407689567-393eb213c0c4"
    ],
    location: {
      name: "Redwood Sanctuary",
      address: "789 Forest Way",
      city: "Santa Cruz",
      state: "CA",
      description: "A serene property surrounded by ancient redwood trees with meandering paths, a flowing creek, and a spacious indoor practice space with forest views."
    },
    instructor: instructors[2], // Reference to Sophia Chang
    date: "2023-12-02",
    time: "9:00 AM - 5:00 PM",
    duration: "8 hours",
    price: 210,
    capacity: 12,
    remaining: 5,
    category: ["Qigong", "Forest Bathing", "Nature Connection"],
    amenities: ["Local seasonal lunch", "Herbal teas", "Rain gear if needed", "Qigong props provided"],
    featured: false
  }
];

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper to get remaining spots text
export const getRemainingText = (remaining: number): string => {
  if (remaining <= 0) return "Sold out";
  if (remaining === 1) return "Only 1 spot left";
  if (remaining <= 3) return `Only ${remaining} spots left`;
  return `${remaining} spots available`;
};
