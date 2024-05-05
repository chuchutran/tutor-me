// This file contains all functions that interact with backend endpoints
import { BACKEND_BASE_PATH } from "../constants/Navigation"; // Adjust this path if necessary
import { useState } from 'react';

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
    const response = await fetch(`${BACKEND_BASE_PATH}/post/filter/${encodeURIComponent(query)}`);
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

  // Handles search operation when user submits query
  export const searchP = async (query: string) => {
    // console.log('Searching for:', query);
      setLoading(true); // indicate data is being fetched
      setError(null); // clear any existing error messages

      try {
          // Construct the URL for the specific search endpoint
          // Calls the backend endpoint directly to search posts by course; based on "query" aka user search field input
          const response = await fetch(`${BACKEND_BASE_PATH}/post/filter/${encodeURIComponent(query)}`);
          if (!response.ok) { // if failure
          // return unsuccessful response
          throw new Error(`Error fetching posts for course: ${query}`);
          }
          const data = await response.json(); // Parse the JSON response from the server
          setPosts(data); // Update "posts" with data fetched from server
      } catch (err) {
          // console.error("API Error:", err);
          console.error('API Error:', error);
          return [];
      } finally {
          setLoading(false); // indicate data fetching completed
      }
    };