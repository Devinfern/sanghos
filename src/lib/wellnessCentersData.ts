
export interface RetreatCenter {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  image: string;
  description: string;
}

export const featuredCenters: RetreatCenter[] = [
    {
        id: 'esalen-institute',
        name: 'Esalen Institute',
        location: 'Big Sur, California',
        specialties: ['Human Potential', 'Meditation'],
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A legendary center for personal and social transformation, offering workshops on yoga, massage, and more.'
    },
    {
        id: 'kripalu-center',
        name: 'Kripalu Center for Yoga & Health',
        location: 'Stockbridge, Massachusetts',
        specialties: ['Yoga', 'Wellness'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'The largest retreat center in North America, offering immersive experiences in yoga, health, and spiritual practice.'
    },
    {
        id: 'omega-institute',
        name: 'Omega Institute',
        location: 'Rhinebeck, New York',
        specialties: ['Holistic Studies', 'Workshops'],
        image: 'https://images.unsplash.com/photo-1506126613408-2e61add503fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A premier destination for holistic learning and retreats, with a wide range of workshops from leading teachers.'
    },
    {
        id: 'the-ranch-malibu',
        name: 'The Ranch Malibu',
        location: 'Malibu, California',
        specialties: ['Luxury Wellness', 'Fitness'],
        image: 'https://images.unsplash.com/photo-1575052814080-3841be292723?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'An exclusive and results-oriented luxury fitness and wellness retreat focused on hiking and plant-based cuisine.'
    },
    {
        id: 'corepower-yoga',
        name: 'CorePower Yoga',
        location: 'Denver, Colorado',
        specialties: ['Heated Yoga', 'Sculpt'],
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A nationwide brand known for its intensely physical and dynamic heated yoga classes in a modern studio setting.'
    },
    {
        id: 'yogaworks',
        name: 'YogaWorks',
        location: 'Santa Monica, California',
        specialties: ['Vinyasa', 'Teacher Training'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'One of the most respected names in yoga, offering a blend of traditional and modern practices for all levels.'
    },
    {
        id: 'insightla',
        name: 'InsightLA',
        location: 'Los Angeles, California',
        specialties: ['Mindfulness', 'Vipassana'],
        image: 'https://images.unsplash.com/photo-1528716321680-815a4cdb8cbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A leading meditation center in Los Angeles, providing a wide array of secular mindfulness and Buddhist classes.'
    },
    {
        id: 'spirit-rock',
        name: 'Spirit Rock',
        location: 'Woodacre, California',
        specialties: ['Insight Meditation', 'Retreats'],
        image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A renowned meditation center dedicated to the teachings of the Buddha, located in the serene hills of Marin County.'
    },
    {
        id: 'alo-yoga',
        name: 'Alo Yoga Studio',
        location: 'Beverly Hills, California',
        specialties: ['Premium Yoga', 'Community'],
        image: 'https://images.unsplash.com/photo-1628125807998-2508f323fa3c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'The studio extension of the popular apparel brand, offering a high-end yoga experience in stunning spaces.'
    },
    {
        id: 'pure-yoga',
        name: 'Pure Yoga',
        location: 'New York, New York',
        specialties: ['Luxury Yoga', 'Varied Styles'],
        image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A luxury yoga studio offering a wide variety of yoga styles and classes taught by world-class instructors.'
    },
    {
        id: 'dharma-ocean',
        name: 'Dharma Ocean',
        location: 'San Rafael, California',
        specialties: ['Somatic Meditation', 'Dharma'],
        image: 'https://images.unsplash.com/photo-1597843799564-33827d6a13c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A global community practicing Somatic Meditation, a tradition that emphasizes the body as the path to awakening.'
    },
    {
        id: 'wanderlust',
        name: 'Wanderlust',
        location: 'Various Locations',
        specialties: ['Festivals', 'Global Retreats'],
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'Famous for its large-scale yoga festivals and global retreats that combine yoga, music, and nature.'
    },
];
