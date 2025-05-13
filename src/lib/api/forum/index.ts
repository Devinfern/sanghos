
// Main export file that re-exports all forum API functionality

// Re-export types
export * from "./types";

// Import necessary functions for re-export
import { 
  forumSpaces,
  loadForumSpaces,
  updateForumSpaces
} from "./spaces";

import { 
  forumPosts,
  loadForumPosts,
  loadForumPostsBySpace,
  createForumPost,
  updateForumPosts 
} from "./posts";

import { 
  forumEvents,
  loadForumEvents,
  updateForumEvents 
} from "./events";

import { 
  trendingPosts,
  loadTrendingPosts,
  updateTrendingPosts 
} from "./trending";

import { 
  createDemoUser,
  getDemoUser 
} from "./users";

// Re-export spaces functionality
export { 
  forumSpaces,
  loadForumSpaces,
  updateForumSpaces
};

// Re-export posts functionality
export { 
  forumPosts,
  loadForumPosts,
  loadForumPostsBySpace,
  createForumPost,
  updateForumPosts 
};

// Re-export events functionality
export { 
  forumEvents,
  loadForumEvents,
  updateForumEvents 
};

// Re-export trending functionality
export { 
  trendingPosts,
  loadTrendingPosts,
  updateTrendingPosts 
};

// Re-export user functionality
export { 
  createDemoUser,
  getDemoUser 
};

// Load all data function
export const loadAllData = async () => {
  await Promise.all([
    loadForumSpaces(),
    loadForumPosts(),
    loadForumEvents(),
    loadTrendingPosts()
  ]);
};

// Initialize data loading
loadAllData();
