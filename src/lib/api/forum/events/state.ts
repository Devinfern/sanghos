
import { ForumEvent } from "../types";
import { defaultForumEvents } from "../../../data/defaultCommunityData";

// State variable to store the current data
export let forumEvents = [...defaultForumEvents];

// Update the state
export const updateEventsState = (newEvents: ForumEvent[]) => {
  forumEvents = [...newEvents];
};
