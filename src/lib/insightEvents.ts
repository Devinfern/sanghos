
import { Instructor, Location, Retreat } from "@/lib/data";

export const fetchInsightLAEvents = async (): Promise<any[]> => {
  try {
    console.log("fetchInsightLAEvents: Loading InsightLA events...");
    
    const retreatData = [
      {
        id: "insightla-emotional-balance-retreat",
        title: "InsightLA: Cultivating Emotional Balance",
        description: "This retreat explores the relationship between thoughts, emotions, and behavior, offering practical tools for cultivating emotional balance and resilience.",
        image: "/lovable-uploads/d8aea9eb-5a8a-4820-8b0d-d0784196142f.png",
        additionalImages: [
          "/lovable-uploads/440cf0e4-ee06-4235-9ec4-b3ecdefd7ee9.jpg",
          "/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg"
        ],
        location: {
          name: "InsightLA Retreat Center",
          address: "123 Meditation Lane",
          city: "Los Angeles",
          state: "CA",
          description: "A serene retreat center in the heart of Los Angeles"
        },
        instructor: {
          id: "instructor-4",
          name: "Dr. Emily Carter",
          title: "Clinical Psychologist",
          image: "/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png",
          bio: "Dr. Carter is a clinical psychologist specializing in emotional regulation and mindfulness-based therapies.",
          specialties: ["Emotional Balance", "Mindfulness", "Cognitive Therapy"],
          yearsExperience: 15
        },
        date: "2024-07-20",
        time: "9:00 AM",
        duration: "3 days",
        price: 499,
        capacity: 30,
        remaining: 10,
        category: ["Mindfulness", "Emotional Balance", "Workshop"],
        amenities: ["Meals included", "Accommodation", "Guided meditation sessions"],
        featured: false,
        isSanghos: false,
        sourceUrl: "https://insightla.org/events/cultivating-emotional-balance/",
        bookingUrl: "https://insightla.org/events/cultivating-emotional-balance/",
        organizer: {
          name: "InsightLA",
          website: "https://insightla.org"
        },
        source: "InsightLA"
      },
      {
        id: "insightla-mindful-communication-retreat",
        title: "InsightLA: Mindful Communication Retreat",
        description: "Learn to communicate with clarity, compassion, and presence in this transformative retreat. Develop skills for resolving conflicts and building stronger relationships.",
        image: "/lovable-uploads/2c63596a-a6e6-4645-8547-54046e807b1a.png",
        additionalImages: [
          "/lovable-uploads/6bab8880-8765-4e83-9a38-d482633fdc95.png",
          "/lovable-uploads/6cfc97b1-427f-4ebf-a716-8fe99ee5694a.png"
        ],
        location: {
          name: "InsightLA Retreat Center",
          address: "123 Meditation Lane",
          city: "Los Angeles",
          state: "CA",
          description: "A serene retreat center in the heart of Los Angeles"
        },
        instructor: {
          id: "instructor-5",
          name: "Laura Rodriguez",
          title: "Communication Expert",
          image: "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png",
          bio: "Laura is a communication expert with over 20 years of experience in helping individuals and organizations improve their communication skills.",
          specialties: ["Mindful Communication", "Conflict Resolution", "Relationship Building"],
          yearsExperience: 20
        },
        date: "2024-08-15",
        time: "10:00 AM",
        duration: "2 days",
        price: 399,
        capacity: 25,
        remaining: 5,
        category: ["Communication", "Mindfulness", "Workshop"],
        amenities: ["Meals included", "Accommodation", "Interactive exercises"],
        featured: false,
        isSanghos: false,
        sourceUrl: "https://insightla.org/events/mindful-communication-retreat/",
        bookingUrl: "https://insightla.org/events/mindful-communication-retreat/",
        organizer: {
          name: "InsightLA",
          website: "https://insightla.org"
        },
        source: "InsightLA"
      },
      {
        id: "insight-retreat-center-awareness-wisdom-june-2025",
        title: "Awareness and Wisdom Daylong Online Retreat",
        description: "This retreat explores relaxed open awareness with an emphasis on qualities of mind and attitude towards one's experience. It includes alternating periods of sitting and walking meditation, instructions, and discussion, primarily in silence. Suitable for both beginners and experienced practitioners.",
        image: "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png",
        additionalImages: [
          "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png"
        ],
        location: {
          name: "Online Zoom Virtual Meditation Hall",
          address: "Virtual Event",
          city: "Online",
          state: "CA",
          description: "Join us from the comfort of your own home in our virtual meditation hall"
        },
        instructor: {
          id: "insight-retreat-center-team",
          name: "Insight Retreat Center Team",
          title: "Meditation Teachers",
          image: "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          bio: "Experienced meditation teachers from the Insight Retreat Center.",
          specialties: ["Mindfulness", "Vipassana", "Online Teaching"],
          yearsExperience: 15
        },
        date: "2025-06-21",
        time: "9:00 AM PT",
        duration: "7.5 hours",
        price: 0,
        capacity: 100,
        remaining: 85,
        category: ["Meditation", "Online", "Mindfulness"],
        amenities: ["Online platform access", "Recorded sessions", "Q&A sessions"],
        featured: true,
        isSanghos: false,
        sourceUrl: "https://www.insightretreatcenter.org/online-retreats/daylong-online-retreats/",
        bookingUrl: "https://www.insightretreatcenter.org/online-retreats/daylong-online-retreats/",
        organizer: {
          name: "Insight Retreat Center",
          website: "https://www.insightretreatcenter.org"
        },
        source: "InsightLA"
      },
      {
        id: "trinity-retreat-contemplative-photography-june-2025",
        title: "Holy in the Ordinary: A Day of Contemplative Photography",
        description: "Photographers of all levels are invited to experience the quiet joy of contemplative photography as a spiritual practice, learning to see with 'the eyes of the heart' to recognize the holy in the ordinary.",
        image: "/lovable-uploads/f0037ad0-9984-49e7-8f7f-cdb9a489329b.png",
        additionalImages: [
          "/lovable-uploads/63278e9b-148b-472f-8a90-0b044d4c7aad.png",
          "/lovable-uploads/c9aa8f45-54df-452f-85e5-4ced4b56e21a.png"
        ],
        location: {
          name: "Trinity Retreat Center",
          address: "Trinity Retreat Center",
          city: "New York",
          state: "NY",
          description: "A peaceful retreat center in the heart of the New York Metro Area"
        },
        instructor: {
          id: "trinity-retreat-photography-team",
          name: "Trinity Retreat Center Team",
          title: "Contemplative Photography Instructors",
          image: "/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png",
          bio: "Experienced instructors in contemplative photography and spiritual practices.",
          specialties: ["Contemplative Photography", "Spiritual Practice", "Mindfulness"],
          yearsExperience: 10
        },
        date: "2025-06-14",
        time: "9:00 AM ET",
        duration: "Full day",
        price: 75,
        capacity: 20,
        remaining: 12,
        category: ["Photography", "Contemplative", "Workshop"],
        amenities: ["Lunch included", "Photography equipment guidance", "Printed materials"],
        featured: true,
        isSanghos: false,
        sourceUrl: "https://trinitychurchnyc.org/trinity-retreat-center/retreats/daylong-retreats",
        bookingUrl: "https://trinitychurchnyc.org/trinity-retreat-center/retreats/daylong-retreats",
        organizer: {
          name: "Trinity Retreat Center",
          website: "https://trinitychurchnyc.org"
        },
        source: "InsightLA"
      },
      {
        id: "nyimc-day-of-insight-july-2025",
        title: "Day of Insight – A Daylong Meditation Retreat",
        description: "A special in-person or online daylong silent meditation retreat for those who want to reconnect and deepen their practice, offering an opportunity to pause, reset, and find mental space and clarity.",
        image: "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png",
        additionalImages: [
          "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png"
        ],
        location: {
          name: "New York Insight Meditation Center",
          address: "New York Insight Meditation Center",
          city: "New York",
          state: "NY",
          description: "A serene meditation center in the heart of New York City"
        },
        instructor: {
          id: "nyimc-meditation-teachers",
          name: "NYIMC Meditation Teachers",
          title: "Senior Meditation Instructors",
          image: "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          bio: "Experienced meditation teachers from the New York Insight Meditation Center.",
          specialties: ["Vipassana", "Silent Meditation", "Mindfulness"],
          yearsExperience: 20
        },
        date: "2025-07-19",
        time: "10:00 AM ET",
        duration: "7 hours",
        price: 50,
        capacity: 40,
        remaining: 25,
        category: ["Meditation", "Silent Retreat", "Mindfulness"],
        amenities: ["In-person and online options", "Meditation cushions provided", "Tea service"],
        featured: true,
        isSanghos: false,
        sourceUrl: "https://www.nyimc.org/events/category/daylong-programs/",
        bookingUrl: "https://www.nyimc.org/events/category/daylong-programs/",
        organizer: {
          name: "New York Insight Meditation Center",
          website: "https://www.nyimc.org"
        },
        source: "InsightLA"
      },
      {
        id: "ada-yoga-mindfulness-movement-august-2025",
        title: "Daylong Mindfulness + Movement Retreat",
        description: "A day dedicated to self-care, reflection, and rejuvenation in the serene environment of Green Gulch Farm & Zen Center, including two yoga practices, myofascial release, organic vegetarian lunch, and personal time for exploration.",
        image: "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
        additionalImages: [
          "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png",
          "/lovable-uploads/d8aea9eb-5a8a-4820-8b0d-d0784196142f.png"
        ],
        location: {
          name: "Green Gulch Farm & Zen Center",
          address: "Green Gulch Farm & Zen Center",
          city: "Marin County",
          state: "CA",
          description: "A peaceful zen center nestled in the beautiful Marin County landscape"
        },
        instructor: {
          id: "ada-yoga-instructors",
          name: "Ada Yoga Instructors",
          title: "Yoga and Mindfulness Teachers",
          image: "/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png",
          bio: "Experienced yoga and mindfulness instructors specializing in movement and meditation.",
          specialties: ["Yoga", "Mindfulness", "Movement Therapy"],
          yearsExperience: 12
        },
        date: "2025-08-31",
        time: "9:00 AM PT",
        duration: "8.5 hours",
        price: 180,
        capacity: 25,
        remaining: 18,
        category: ["Yoga", "Mindfulness", "Movement"],
        amenities: ["Organic vegetarian lunch", "Yoga props included", "Access to zen center grounds", "Tea service"],
        featured: false,
        isSanghos: false,
        sourceUrl: "https://www.adayoga.com/event-listings/ggf-daylong-retreat-aug-2025",
        bookingUrl: "https://www.adayoga.com/event-listings/ggf-daylong-retreat-aug-2025",
        organizer: {
          name: "Ada Yoga",
          website: "https://www.adayoga.com"
        },
        source: "InsightLA"
      },
      {
        id: "refuge-recovery-virtual-daylong-august-2025",
        title: "Virtual/In-Person Daylong Retreat",
        description: "A 6-hour retreat with guided meditation instructions and a dharma talk. Includes mindfulness and heart practices for sitting and walking meditation. Open to all levels.",
        image: "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png",
        additionalImages: [
          "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png"
        ],
        location: {
          name: "Refuge Recovery Center",
          address: "2516 Lincoln Blvd, Venice, CA 90291",
          city: "Venice",
          state: "CA",
          description: "A welcoming recovery and meditation center in Venice, Los Angeles"
        },
        instructor: {
          id: "refuge-recovery-teachers",
          name: "Refuge Recovery Teachers",
          title: "Dharma and Meditation Instructors",
          image: "/lovable-uploads/af823cb5-4260-4ec4-bbb4-d1a8cf2185ad.png",
          bio: "Compassionate teachers specializing in recovery-based meditation and dharma practices.",
          specialties: ["Recovery Dharma", "Meditation", "Mindfulness"],
          yearsExperience: 8
        },
        date: "2025-08-17",
        time: "9:00 AM PT",
        duration: "6 hours",
        price: 50,
        capacity: 30,
        remaining: 22,
        category: ["Meditation", "Recovery", "Dharma"],
        amenities: ["Online and in-person options", "Scholarship available", "Dana donations welcome"],
        featured: false,
        isSanghos: false,
        sourceUrl: "https://www.wetravel.com/trips/virtual-in-person-daylong-august2025-refuge-recovery-48552967",
        bookingUrl: "https://www.wetravel.com/trips/virtual-in-person-daylong-august2025-refuge-recovery-48552967",
        organizer: {
          name: "Refuge Recovery",
          website: "https://refugerecovery.org"
        },
        source: "InsightLA"
      },
      {
        id: "trinity-spirituality-movement-breath-august-2025",
        title: "The Spirituality of Movement and the Breath",
        description: "A day to practice trust and kindness through quiet time, group activities, and mindful movement and breath work, led by a yoga and meditation teacher.",
        image: "/lovable-uploads/d8aea9eb-5a8a-4820-8b0d-d0784196142f.png",
        additionalImages: [
          "/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png",
          "/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png"
        ],
        location: {
          name: "Trinity Retreat Center",
          address: "Trinity Retreat Center",
          city: "New York",
          state: "NY",
          description: "A peaceful retreat center in the heart of the New York Metro Area"
        },
        instructor: {
          id: "trinity-movement-teachers",
          name: "Trinity Movement Teachers",
          title: "Yoga and Meditation Instructors",
          image: "/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png",
          bio: "Experienced yoga and meditation teachers specializing in movement and breath work.",
          specialties: ["Yoga", "Breathwork", "Movement Therapy"],
          yearsExperience: 10
        },
        date: "2025-08-09",
        time: "9:00 AM ET",
        duration: "Full day",
        price: 75,
        capacity: 20,
        remaining: 14,
        category: ["Yoga", "Breathwork", "Movement"],
        amenities: ["Lunch included", "Yoga props provided", "Group activities"],
        featured: false,
        isSanghos: false,
        sourceUrl: "https://trinitychurchnyc.org/trinity-retreat-center/retreats/daylong-retreats",
        bookingUrl: "https://trinitychurchnyc.org/trinity-retreat-center/retreats/daylong-retreats",
        organizer: {
          name: "Trinity Retreat Center",
          website: "https://trinitychurchnyc.org"
        },
        source: "InsightLA"
      }
    ];

    console.log(`fetchInsightLAEvents: Loaded ${retreatData.length} InsightLA retreat events`);
    return retreatData;
  } catch (error) {
    console.error("fetchInsightLAEvents: Error loading InsightLA events", error);
    return [];
  }
};
