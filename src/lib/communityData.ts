
// Community data types
export type ForumAuthor = {
  name: string;
  role: string; // Admin, Host, Member
  avatar: string;
  tag?: string;
};

export type ForumPost = {
  id: number;
  author: ForumAuthor;
  postedIn: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
};

export type ForumEvent = {
  id: number;
  date: {
    day: number;
    month: string;
  };
  title: string;
  time: string;
};

export type TrendingPost = {
  id: number;
  title: string;
  author: string;
  avatar: string;
};

// Community Spaces
export const forumSpaces = [
  {
    name: "Open Space",
    spaces: [
      { name: "Open Here", icon: "MessageSquare", count: 4 },
      { name: "Open Conversation", icon: "MessageSquare", count: 2 },
      { name: "Open Events", icon: "Calendar", count: 2 },
    ]
  },
  {
    name: "Loving Yourself Forward",
    spaces: [
      { name: "LYF Course", icon: "MessageSquare", count: 3 },
      { name: "LYF Community", icon: "Users", count: 5 },
    ]
  },
  {
    name: "Practice Groups",
    spaces: [
      { name: "Meditation Circle", icon: "Users", count: 8 },
      { name: "Mindfulness Practice", icon: "Users", count: 4 },
    ]
  },
  {
    name: "Links",
    spaces: [
      { name: "Knowledge Base", icon: "MessageSquare", count: null },
      { name: "Resources", icon: "MessageSquare", count: null },
    ]
  }
];

// Posts data
export const forumPosts: ForumPost[] = [
  {
    id: 1,
    author: {
      name: "Sarita Walsh",
      role: "Admin",
      avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png",
      tag: "Being° Coach"
    },
    postedIn: "Open Conversation",
    timeAgo: "4h",
    title: "Tired of Feeling Disappointed?",
    content: `Join us for a LIVE session where we'll explore a simple but powerful distinction: Agreements vs. Expectations. This one shift can change how you navigate relationships, communicate your needs, and move through life with more clarity and ease.

This is part of our ongoing series on practical wisdom for everyday challenges.`,
    likes: 12,
    comments: 3,
    bookmarked: false
  },
  {
    id: 2,
    author: {
      name: "Maya Johnson",
      role: "Host",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tag: "Retreat Host"
    },
    postedIn: "Meditation Circle",
    timeAgo: "1d",
    title: "Mindfulness Practice for Beginners",
    content: `I'm excited to share some simple mindfulness techniques that anyone can practice, regardless of experience level. These have been incredibly helpful for my retreat participants.

Would you like me to host a free online session to walk through these techniques together?`,
    likes: 15,
    comments: 7,
    bookmarked: true
  },
  {
    id: 3,
    author: {
      name: "David Chen",
      role: "Member",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    postedIn: "LYF Community",
    timeAgo: "2d",
    title: "My LYF Journey - Month 3 Reflections",
    content: `I wanted to share some reflections after completing my third month in the Loving Yourself Forward program. The changes I've experienced have been profound, especially around my relationship with self-criticism.

Before LYF, I was constantly in a state of self-judgment. Now I'm finding moments of genuine self-compassion. Has anyone else noticed similar shifts?`,
    likes: 24,
    comments: 12,
    bookmarked: false
  },
  {
    id: 4,
    author: {
      name: "Aisha Williams",
      role: "Host",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tag: "Wellness Guide"
    },
    postedIn: "Mindfulness Practice",
    timeAgo: "3d",
    title: "Creating a Consistent Practice",
    content: `Many of you have asked how to maintain consistency with mindfulness practice when life gets busy. Here are a few practical tips that have worked for my students:

1. Start with just 5 minutes daily
2. Connect it to an existing habit (like morning coffee)
3. Use environmental cues (place a cushion somewhere visible)
4. Join a practice group for accountability

What helps you stay consistent with your practice?`,
    likes: 18,
    comments: 9,
    bookmarked: false
  }
];

// Events data
export const forumEvents: ForumEvent[] = [
  {
    id: 1,
    date: { day: 11, month: "MAR" },
    title: "Support Our Event Test + Discover a Powerful Distinction",
    time: "9:00 - 10:00 AM PDT"
  },
  {
    id: 2,
    date: { day: 14, month: "MAR" },
    title: "Masterclass: How to Break the Cycle of Doubt & Overthinking",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 3,
    date: { day: 16, month: "MAR" },
    title: "Workshop: Update Your Operating System → Break Patterns of Doubt",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 4,
    date: { day: 22, month: "APR" },
    title: "Quarterly Being° Gathering (Q2)",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 5,
    date: { day: 22, month: "JUL" },
    title: "Quarterly Being° Gathering (Q3)",
    time: "9:00 - 10:30 AM PDT"
  }
];

// Trending posts data
export const trendingPosts: TrendingPost[] = [
  {
    id: 1,
    title: "An Invitation to Slow Down and Return to Yourself",
    author: "Sarita Walsh",
    avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png"
  },
  {
    id: 2,
    title: "How to Practice Self-Compassion in Difficult Moments",
    author: "Maya Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Finding Peace in Uncertainty",
    author: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];
