
import { Calendar, Users, BookOpen, Heart, Star, MapPin } from "lucide-react";

export interface MegaMenuContent {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuContent[];
}

export const megaMenuData: Record<string, MegaMenuSection[]> = {
  retreats: [
    {
      title: "Browse Retreats",
      items: [
        {
          title: "All Retreats",
          description: "Explore our full collection of wellness retreats",
          href: "/retreats",
          icon: Calendar
        },
        {
          title: "Sanghos Retreats",
          description: "Curated experiences in unique private spaces",
          href: "/retreats?tab=sanghos",
          icon: Star,
          badge: "Featured"
        },
        {
          title: "Partner Retreats",
          description: "Retreats from our trusted wellness partners",
          href: "/retreats?tab=thirdparty",
          icon: Heart
        }
      ]
    },
    {
      title: "Popular Categories",
      items: [
        {
          title: "Mindfulness",
          description: "Find peace through guided meditation",
          href: "/retreats?category=Mindfulness",
          icon: Heart
        },
        {
          title: "Yoga",
          description: "Movement and breath practices",
          href: "/retreats?category=Yoga",
          icon: Users
        },
        {
          title: "Wellness",
          description: "Holistic health and wellbeing",
          href: "/retreats?category=Wellness",
          icon: Star
        }
      ]
    }
  ],
  insights: [
    {
      title: "Learn & Grow",
      items: [
        {
          title: "All Insights",
          description: "Latest wellness articles and guides",
          href: "/blog",
          icon: BookOpen
        },
        {
          title: "Mindfulness News",
          description: "Stay updated with mindfulness trends",
          href: "/blog/mindfulness-news",
          icon: Heart
        }
      ]
    }
  ],
  community: [
    {
      title: "Connect",
      items: [
        {
          title: "Community Hub",
          description: "Connect with like-minded wellness enthusiasts",
          href: "/community",
          icon: Users,
          badge: "Members Only"
        },
        {
          title: "Community Preview",
          description: "See what our community is all about",
          href: "/community-teaser",
          icon: Heart
        }
      ]
    }
  ],
  about: [
    {
      title: "About Sanghos",
      items: [
        {
          title: "Our Story",
          description: "Learn about our mission and values",
          href: "/about-us",
          icon: Heart
        },
        {
          title: "Teach With Us",
          description: "Share your expertise with our community",
          href: "/teach-with-us",
          icon: Users
        },
        {
          title: "Become a Host",
          description: "Open your space for wellness retreats",
          href: "/become-host",
          icon: MapPin
        }
      ]
    }
  ]
};

export const getLayoutConfig = (sections: MegaMenuSection[]) => {
  const totalSections = sections.length;
  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  
  const useSingleColumn = totalSections === 1 || totalItems <= 3;
  
  return {
    useSingleColumn,
    gridCols: useSingleColumn ? 1 : 2
  };
};
