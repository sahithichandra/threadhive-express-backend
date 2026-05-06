import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";
import { createAppError } from "../utils/createAppError.js";

export const fetchAllSubreddits = async () => {
  const subreddits = await Subreddit.find();
  // Add error handling for no subreddits found
  if(subreddits.length === 0) {
      const error = createAppError(404, "No subreddits found");
      throw error;
  }

  return subreddits;
};

export const createNewSubreddit = async (name, description, author) => {
  const existingSubreddit = await Subreddit.findOne({ name });

  // Add error handling for duplicate subreddit name
  if (existingSubreddit) {
      const error = createAppError(400, "Subreddit with this name already exists");
      throw error;
  } 

  const newSubreddit = new Subreddit({ name, description, author });
  await newSubreddit.save();

  return newSubreddit;
};

export const fetchSubredditWithThreads = async (id) => {
  const subreddit = await Subreddit.findById(id);
  // Add error handling for subreddit not found
  if (!subreddit) {
      const error = createAppError(404, "Subreddit not found");
      throw error;
  } 

  const threads = await Thread.find({ subreddit: id })
    .populate("author")
    .sort({ createdAt: -1 });

  return { subreddit, threads };
};
