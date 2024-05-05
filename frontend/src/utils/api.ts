// This file contains all functions that interact with backend endpoints
import { BACKEND_BASE_PATH } from "../constants/Navigation"; // Adjust this path if necessary

interface PostData {
  id: string;
  title: string;
  description: string;
  posterId: string;
  classCode: string;
}

/**
 * Fetch posts based on a search query.
 * @param query - The search string to filter posts.
 * @returns A promise resolving to an array of PostData objects.
 */
export const searchPosts = async (query: string): Promise<PostData[]> => {
  try {
    const response = await fetch(`${BACKEND_BASE_PATH}/posts/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error fetching posts for query: ${query}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

/**
 * Fetch all available posts.
 * @returns A promise resolving to an array of PostData objects.
 */
export const fetchAllPosts = async (): Promise<PostData[]> => {
  try {
    const response = await fetch(`${BACKEND_BASE_PATH}/posts/all`);
    if (!response.ok) {
      throw new Error('Error fetching all posts.');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

// You can add more functions here for other API endpoints as needed
