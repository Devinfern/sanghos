
import { TrendingPost } from "../types";
import { defaultTrendingPosts } from "../../../data/defaultCommunityData";

// State variable to store the current data
export let trendingPosts = [...defaultTrendingPosts];

// Update the state
export const updateTrendingPostsState = (newPosts: TrendingPost[]) => {
  trendingPosts = [...newPosts];
};
