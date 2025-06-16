
export interface RetreatCenter {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  image: string;
  description: string;
  website: string;
  propertyType: 'Hotel' | 'Retreat Center' | 'Studio' | 'Wellness Stay';
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  amenities: string[];
}

export const featuredCenters: RetreatCenter[] = [
  // Hotels
  {
    id: 'miraval-arizona',
    name: 'Miraval Arizona Resort & Spa',
    location: 'Tucson, Arizona',
    specialties: ['Luxury Spa', 'Mindfulness', 'Wellness Programs'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A luxury wellness resort offering transformative experiences in the beautiful Sonoran Desert.',
    website: 'https://www.miravalresorts.com',
    propertyType: 'Hotel',
    priceRange: '$$$$',
    rating: 4.8,
    amenities: ['Spa Services', 'Desert Hiking', 'Meditation Gardens', 'Fitness Center']
  },
  {
    id: 'canyon-ranch-lenox',
    name: 'Canyon Ranch Lenox',
    location: 'Lenox, Massachusetts',
    specialties: ['Health & Fitness', 'Spa Treatments', 'Nutrition'],
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A premier health and fitness resort nestled in the beautiful Berkshire Mountains.',
    website: 'https://www.canyonranch.com',
    propertyType: 'Hotel',
    priceRange: '$$$$',
    rating: 4.7,
    amenities: ['Medical Spa', 'Hiking Trails', 'Nutrition Counseling', 'Fitness Classes']
  },
  {
    id: '1-hotels-west-hollywood',
    name: '1 Hotels West Hollywood',
    location: 'West Hollywood, California',
    specialties: ['Sustainable Luxury', 'Rooftop Wellness', 'Urban Retreat'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Eco-luxury hotel with wellness programming and stunning city views.',
    website: 'https://www.1hotels.com',
    propertyType: 'Hotel',
    priceRange: '$$$',
    rating: 4.6,
    amenities: ['Rooftop Pool', 'Wellness Programming', 'Farm-to-Table Dining', 'Eco-Friendly']
  },

  // Retreat Centers
  {
    id: 'esalen-institute',
    name: 'Esalen Institute',
    location: 'Big Sur, California',
    specialties: ['Human Potential', 'Meditation', 'Hot Springs'],
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A legendary center for personal and social transformation, offering workshops on yoga, massage, and more.',
    website: 'https://www.esalen.org',
    propertyType: 'Retreat Center',
    priceRange: '$$$',
    rating: 4.8,
    amenities: ['Hot Springs', 'Ocean Views', 'Workshops', 'Organic Garden']
  },
  {
    id: 'kripalu-center',
    name: 'Kripalu Center for Yoga & Health',
    location: 'Stockbridge, Massachusetts',
    specialties: ['Yoga', 'Wellness', 'Meditation'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The largest retreat center in North America, offering immersive experiences in yoga, health, and spiritual practice.',
    website: 'https://kripalu.org',
    propertyType: 'Retreat Center',
    priceRange: '$$',
    rating: 4.7,
    amenities: ['Yoga Studios', 'Meditation Halls', 'Hiking Trails', 'Healthy Cuisine']
  },
  {
    id: 'omega-institute',
    name: 'Omega Institute',
    location: 'Rhinebeck, New York',
    specialties: ['Holistic Studies', 'Workshops', 'Learning'],
    image: 'https://images.unsplash.com/photo-1506126613408-2e61add503fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A premier destination for holistic learning and retreats, with a wide range of workshops from leading teachers.',
    website: 'https://www.omega.org',
    propertyType: 'Retreat Center',
    priceRange: '$$',
    rating: 4.6,
    amenities: ['Workshop Spaces', 'Lake Activities', 'Organic Meals', 'Nature Trails']
  },
  {
    id: 'spirit-rock',
    name: 'Spirit Rock Meditation Center',
    location: 'Woodacre, California',
    specialties: ['Insight Meditation', 'Retreats', 'Buddhist Teachings'],
    image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A renowned meditation center dedicated to the teachings of the Buddha, located in the serene hills of Marin County.',
    website: 'https://www.spiritrock.org',
    propertyType: 'Retreat Center',
    priceRange: '$',
    rating: 4.9,
    amenities: ['Silent Retreats', 'Meditation Halls', 'Walking Paths', 'Teacher Training']
  },

  // Studios
  {
    id: 'corepower-yoga',
    name: 'CorePower Yoga',
    location: 'Denver, Colorado',
    specialties: ['Heated Yoga', 'Sculpt', 'Power Yoga'],
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A nationwide brand known for its intensely physical and dynamic heated yoga classes in a modern studio setting.',
    website: 'https://www.corepoweryoga.com',
    propertyType: 'Studio',
    priceRange: '$$',
    rating: 4.4,
    amenities: ['Heated Studios', 'Sculpt Classes', 'Membership Options', 'Multiple Locations']
  },
  {
    id: 'yogaworks',
    name: 'YogaWorks',
    location: 'Santa Monica, California',
    specialties: ['Vinyasa', 'Teacher Training', 'Traditional Yoga'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'One of the most respected names in yoga, offering a blend of traditional and modern practices for all levels.',
    website: 'https://www.yogaworks.com',
    propertyType: 'Studio',
    priceRange: '$$',
    rating: 4.5,
    amenities: ['Teacher Training', 'Multiple Class Styles', 'Experienced Instructors', 'Community Focus']
  },
  {
    id: 'alo-yoga',
    name: 'Alo Yoga Studio',
    location: 'Beverly Hills, California',
    specialties: ['Premium Yoga', 'Community', 'Lifestyle'],
    image: 'https://images.unsplash.com/photo-1628125807998-2508f323fa3c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The studio extension of the popular apparel brand, offering a high-end yoga experience in stunning spaces.',
    website: 'https://www.aloyoga.com',
    propertyType: 'Studio',
    priceRange: '$$$',
    rating: 4.6,
    amenities: ['Premium Studios', 'Designer Spaces', 'Brand Experience', 'Exclusive Classes']
  },
  {
    id: 'pure-yoga',
    name: 'Pure Yoga',
    location: 'New York, New York',
    specialties: ['Luxury Yoga', 'Varied Styles', 'Urban Wellness'],
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A luxury yoga studio offering a wide variety of yoga styles and classes taught by world-class instructors.',
    website: 'https://www.pure-yoga.com',
    propertyType: 'Studio',
    priceRange: '$$$',
    rating: 4.5,
    amenities: ['Luxury Facilities', 'Expert Instructors', 'Multiple Styles', 'Premium Equipment']
  },

  // Wellness Stays
  {
    id: 'the-ranch-malibu',
    name: 'The Ranch Malibu',
    location: 'Malibu, California',
    specialties: ['Luxury Wellness', 'Fitness', 'Detox'],
    image: 'https://images.unsplash.com/photo-1575052814080-3841be292723?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'An exclusive and results-oriented luxury fitness and wellness retreat focused on hiking and plant-based cuisine.',
    website: 'https://www.theranchmalibu.com',
    propertyType: 'Wellness Stay',
    priceRange: '$$$$',
    rating: 4.9,
    amenities: ['Personal Training', 'Detox Programs', 'Hiking', 'Plant-Based Cuisine']
  },
  {
    id: 'insightla',
    name: 'InsightLA',
    location: 'Los Angeles, California',
    specialties: ['Mindfulness', 'Vipassana', 'Urban Meditation'],
    image: 'https://images.unsplash.com/photo-1528716321680-815a4cdb8cbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A leading meditation center in Los Angeles, providing a wide array of secular mindfulness and Buddhist classes.',
    website: 'https://insightla.org',
    propertyType: 'Wellness Stay',
    priceRange: '$',
    rating: 4.7,
    amenities: ['Meditation Classes', 'Day Programs', 'Community Events', 'Teacher Training']
  },
  {
    id: 'dharma-ocean',
    name: 'Dharma Ocean',
    location: 'San Rafael, California',
    specialties: ['Somatic Meditation', 'Dharma', 'Body-Based Practice'],
    image: 'https://images.unsplash.com/photo-1597843799564-33827d6a13c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A global community practicing Somatic Meditation, a tradition that emphasizes the body as the path to awakening.',
    website: 'https://www.dharmaocean.org',
    propertyType: 'Wellness Stay',
    priceRange: '$$',
    rating: 4.8,
    amenities: ['Somatic Training', 'Body Work', 'Retreat Programs', 'Online Classes']
  },
  {
    id: 'wanderlust',
    name: 'Wanderlust',
    location: 'Various Locations',
    specialties: ['Festivals', 'Global Retreats', 'Yoga Events'],
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Famous for its large-scale yoga festivals and global retreats that combine yoga, music, and nature.',
    website: 'https://wanderlust.com',
    propertyType: 'Wellness Stay',
    priceRange: '$$$',
    rating: 4.6,
    amenities: ['Festival Events', 'Global Locations', 'Music & Yoga', 'Community Experience']
  }
];

export const propertyTypes = ['All', 'Hotel', 'Retreat Center', 'Studio', 'Wellness Stay'] as const;
export const priceRanges = ['All', '$', '$$', '$$$', '$$$$'] as const;
