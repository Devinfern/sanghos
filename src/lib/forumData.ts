
// Forum data types
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

// Forum Spaces - Edit these to change the forum categories and spaces
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
      { name: "LYF Course", icon: "MessageSquare", count: null },
      { name: "LYF Community", icon: "Users", count: null },
    ]
  },
  {
    name: "Links",
    spaces: [
      { name: "Circle Knowledge Base", icon: "MessageSquare", count: null },
    ]
  }
];

// Posts data - Edit this to change the posts showing in the feed
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

This is ...`,
    likes: 2,
    comments: 0,
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
  }
];

// Events data - Edit this to change the upcoming events in the sidebar
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
    title: "Masterclass: How to Break the Cycle of Doubt & Overthinking and Take Clear, Confident Action",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 3,
    date: { day: 16, month: "MAR" },
    title: "Workshop: Update Your Operating System → Break Patterns of Doubt & Overthinking and Take Aligned Action",
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

// Trending posts data - Edit this to change the trending posts in the sidebar
export const trendingPosts: TrendingPost[] = [
  {
    id: 1,
    title: "An Invitation to Slow Down and Return to Yourself",
    author: "Sarita Walsh",
    avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png"
  }
];
