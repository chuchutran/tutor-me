// ForumPage.tsx
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Post from '../components/Post';
import { fetchUserDetails, searchPosts, fetchAllPosts } from '../utils/api'; // Adjust path as needed
import './Forum.css';

// interface PostData {
//   userid: string;
//   course: string;
//   availabilities: string[];
//   description: string;
// }

interface PostWithUserDetails {
  id: string;
  title: string;
  description: string;
  userid: string;
  classCode: string;
  posterName: string;
  posterEmail: string;
  availabilities: string[]
  // Add additional user details if necessary
}


const ForumPage = () => {
  const [posts, setPosts] = useState<PostWithUserDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all posts and user details
  const fetchAllPostsWithUserDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const postData = await fetchAllPosts();
      const detailedPosts = await Promise.all(
        postData.map(async (post) => {
          const user = await fetchUserDetails(post.userid);
          // Log the result for debugging
          console.log(`User details for ${post.userid}:`, user);

          return {
            ...post,
            posterName: user?.name || "Unknown",
            posterEmail: user?.email || "No email available"
          };
        })
      );
      setPosts(detailedPosts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };




  // Function to handle search queries and fetch user details
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const postData = await searchPosts(query);
      const detailedPosts = await Promise.all(
        postData.map(async (post) => {
          const user = await fetchUserDetails(post.userid);
          return {
            ...post,
            posterName: user?.name || "Unknown",
            posterEmail: user?.email || "No email available"
          };
        })
      );
      setPosts(detailedPosts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Load all posts initially
  useEffect(() => {
    fetchAllPostsWithUserDetails();
  }, []);

  return (
    <div id='forum-page' className='pageTitle'>
      <h1>Tutor Listings</h1>

      {/* Search Bar */}
      <div className="longSearchBarContainer">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className='contentContainer'>


        <div className='postsContainer'>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <Post
                key={index}
                title={post.title} //course name
                description={post.description}
                posterName={post.posterName}
                posterEmail={post.posterEmail}
                availabilities={post.availabilities}
              />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
