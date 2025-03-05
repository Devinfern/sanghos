
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

export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Maya Johnson",
    title: "Yoga Therapist & Meditation Guide",
    bio: "Maya has been teaching yoga and meditation for over 15 years. Her approach combines traditional yogic practices with modern therapeutic techniques, creating a unique experience that nurtures both body and mind. She specializes in helping individuals navigate stress and anxiety through mindful movement and breath.",
    specialties: ["Hatha Yoga", "Meditation", "Stress Reduction", "Breathwork"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    yearsExperience: 15
  },
  {
    id: "inst-2",
    name: "David Chen",
    title: "Breathwork Specialist & Sound Healer",
    bio: "David discovered the transformative power of breathwork during his own healing journey. Now, he guides others through profound breathing experiences combined with sound healing. His sessions are known for creating deep states of relaxation and emotional release.",
    specialties: ["Pranayama", "Sound Baths", "Wim Hof Method", "Meditation"],
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    yearsExperience: 8
  },
  {
    id: "inst-3",
    name: "Sarah Williams",
    title: "Mindfulness Coach & Forest Therapy Guide",
    bio: "Sarah combines her background in psychology with certified training in mindfulness and forest therapy. Her retreats emphasize the healing connection between humans and nature, guiding participants to slow down and awaken their senses to the natural world.",
    specialties: ["Forest Bathing", "Mindfulness", "Ecotherapy", "Nature Connection"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    yearsExperience: 10
  }
];

export const retreats: Retreat[] = [
  {
    id: "ret-1",
    title: "Day of Calm: Meditation & Movement Retreat",
    description: "Escape the hustle and immerse yourself in a day of mindful movement and guided meditation. This retreat balances gentle yoga with sitting and walking meditation practices, helping you cultivate a sense of inner peace that extends beyond the retreat day. Suitable for all levels, including beginners.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    additionalImages: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    ],
    location: {
      name: "Hillside Haven",
      address: "123 Tranquil Lane",
      city: "Berkeley",
      state: "CA",
      description: "A modern hillside home with panoramic views of the bay. The space features floor-to-ceiling windows, a spacious deck for outdoor practice, and a peaceful garden."
    },
    instructor: instructors[0],
    date: "2023-11-15",
    time: "9:00 AM - 4:00 PM",
    duration: "7 hours",
    price: 225,
    capacity: 12,
    remaining: 4,
    category: ["Meditation", "Yoga", "Mindfulness"],
    amenities: ["Organic lunch provided", "Tea & refreshments", "Meditation cushions", "Yoga mats available"],
    featured: true
  },
  {
    id: "ret-2",
    title: "Breathe & Restore: Pranayama & Sound Bath Experience",
    description: "This transformative day retreat focuses on the healing power of breath and sound. You'll learn powerful breathing techniques to increase vitality and reduce stress, followed by a deeply restorative sound bath experience. The day concludes with integration practices to bring these tools into your daily life.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    additionalImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    ],
    location: {
      name: "Redwood Retreat",
      address: "456 Forest Way",
      city: "Mill Valley",
      state: "CA",
      description: "A secluded mid-century home nestled among redwood trees. Features include a meditation room with wooden floors, a cozy fireplace, and a private garden patio."
    },
    instructor: instructors[1],
    date: "2023-11-22",
    time: "10:00 AM - 5:00 PM",
    duration: "7 hours",
    price: 250,
    capacity: 10,
    remaining: 2,
    category: ["Breathwork", "Sound Healing", "Relaxation"],
    amenities: ["Plant-based lunch", "Herbal teas", "Meditation cushions", "Blankets & bolsters"],
    featured: true
  },
  {
    id: "ret-3",
    title: "Forest Immersion: Nature Connection & Mindfulness Retreat",
    description: "Connect deeply with the natural world in this forest immersion retreat. Through guided sensory activities, mindfulness practices, and gentle movement, you'll experience the healing benefits of nature connection. This retreat is perfect for those seeking to slow down and rediscover their place within the natural world.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    additionalImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb", 
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    ],
    location: {
      name: "Woodland Sanctuary",
      address: "789 Oak Drive",
      city: "Woodside",
      state: "CA",
      description: "A rustic-modern home surrounded by oak and madrone trees. Featuring a wraparound deck with forest views, a spacious living area with a vaulted ceiling, and direct access to hiking trails."
    },
    instructor: instructors[2],
    date: "2023-12-03",
    time: "9:30 AM - 4:30 PM",
    duration: "7 hours",
    price: 210,
    capacity: 8,
    remaining: 3,
    category: ["Nature Connection", "Forest Therapy", "Mindfulness"],
    amenities: ["Local, seasonal lunch", "Wildcrafted teas", "Journal materials", "Rain gear if needed"],
    featured: false
  },
  {
    id: "ret-4",
    title: "Inner Balance: Yoga & Meditation Day Retreat",
    description: "Find your inner balance through a day of harmonizing yoga and meditation practices. This retreat offers a blend of dynamic and restorative yoga, complemented by guided meditations that foster self-awareness and inner peace. Suitable for yoga practitioners of all levels.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    additionalImages: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    ],
    location: {
      name: "Bayview Studio",
      address: "101 Marina Boulevard",
      city: "Sausalito",
      state: "CA",
      description: "A light-filled contemporary home with stunning bay views. Features include a spacious practice room with hardwood floors, an outdoor deck, and a peaceful meditation garden."
    },
    instructor: instructors[0],
    date: "2023-12-10",
    time: "8:00 AM - 3:00 PM",
    duration: "7 hours",
    price: 230,
    capacity: 15,
    remaining: 7,
    category: ["Yoga", "Meditation", "Wellness"],
    amenities: ["Nutritious lunch", "Kombucha & teas", "Yoga props provided", "Journal for reflections"],
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
