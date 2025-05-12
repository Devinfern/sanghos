
// Main export file that re-exports all forum API functionality

// Re-export types
export * from "./types";

// Re-export spaces functionality
export { 
  forumSpaces,
  loadForumSpaces,
  updateForumSpaces
} from "./spaces";

// Re-export posts functionality
export { 
  forumPosts,
  loadForumPosts,
  loadForumPostsBySpace,
  createForumPost,
  updateForumPosts 
} from "./posts";

// Re-export events functionality
export { 
  forumEvents,
  loadForumEvents,
  updateForumEvents 
} from "./events";

// Re-export trending functionality
export { 
  trendingPosts,
  loadTrendingPosts,
  updateTrendingPosts 
} from "./trending";

// Re-export user functionality
export { 
  createDemoUser,
  getDemoUser 
} from "./users";

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
