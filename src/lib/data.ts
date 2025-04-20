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
};

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

export const retreats: Retreat[] = [
  {
    id: "ret-1",
    title: "Forest Meditation & Yoga Immersion",
    description: "Connect deeply with nature through mindful movement and meditation practices in the heart of an ancient forest. This transformative retreat combines gentle yoga, forest bathing, and guided meditations to help you find inner peace and renewal.",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
    additionalImages: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
    ],
    location: {
      name: "Sacred Grove Retreat Center",
      address: "789 Redwood Way",
      city: "Mount Shasta",
      state: "CA",
      description: "Nestled among ancient redwoods with stunning mountain views, our eco-friendly retreat center offers a perfect sanctuary for deep nature connection."
    },
    instructor: instructors[2],
    date: "2025-04-12",
    time: "3:00 PM Friday - 11:00 AM Monday",
    duration: "3 days",
    price: 895,
    capacity: 20,
    remaining: 15,
    category: ["Meditation", "Yoga", "Forest Bathing"],
    amenities: ["Organic meals", "Private rooms", "Meditation cushions", "Yoga equipment", "Guided hikes"],
    featured: false,
    isSanghos: false
  },
  {
    id: "ret-2",
    title: "High Desert Wellness Journey",
    description: "Experience profound healing in the serene desert landscape. This unique retreat combines sound healing, breathwork, and mindfulness practices with the naturally grounding energy of the high desert environment.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    additionalImages: [
      "https://images.unsplash.com/photo-1513806562344-c75007ad303d",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    ],
    location: {
      name: "Desert Sage Retreat",
      address: "1422 Mesa Verde Road",
      city: "Sedona",
      state: "AZ",
      description: "A sustainable desert oasis with panoramic red rock views, meditation gardens, and sacred ceremony spaces."
    },
    instructor: instructors[1],
    date: "2025-04-18",
    time: "4:00 PM Thursday - 2:00 PM Sunday",
    duration: "4 days",
    price: 1295,
    capacity: 16,
    remaining: 12,
    category: ["Sound Healing", "Breathwork", "Meditation"],
    amenities: ["Farm-to-table meals", "Luxury tents", "Sound healing equipment", "Hot springs access", "Guided ceremonies"],
    featured: true,
    isSanghos: false
  },
  {
    id: "ret-3",
    title: "Mountain Wellness Reset",
    description: "Reset your mind and body in the crisp mountain air. This comprehensive wellness retreat offers a perfect blend of yoga, hiking, meditation, and nutritional guidance to help you establish healthy habits that last.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    additionalImages: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    ],
    location: {
      name: "Alpine Wellness Lodge",
      address: "542 Mountain View Drive",
      city: "Aspen",
      state: "CO",
      description: "A luxurious mountain retreat center featuring panoramic views, spa facilities, and direct access to hiking trails."
    },
    instructor: instructors[0],
    date: "2025-04-25",
    time: "2:00 PM Friday - 11:00 AM Monday",
    duration: "3 days",
    price: 1495,
    capacity: 18,
    remaining: 16,
    category: ["Yoga", "Hiking", "Wellness", "Nutrition"],
    amenities: ["Gourmet spa cuisine", "Luxury suites", "Spa access", "Yoga equipment", "Guided adventures"],
    featured: false,
    isSanghos: false
  }
];

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
