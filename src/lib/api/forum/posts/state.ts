
import { ForumPost } from "../types";
import { defaultForumPosts } from "../../../data/defaultCommunityData";

// State variable to store the current data
export let forumPosts = [...defaultForumPosts];

// Update the state
export const updatePostsState = (newPosts: ForumPost[]) => {
  forumPosts = [...newPosts];
};
