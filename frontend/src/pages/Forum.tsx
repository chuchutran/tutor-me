import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Post from '../components/Post';
import { fetchUserDetails, searchPosts } from '../utils/api';
import './Forum.css';

interface PostWithUserDetails {
  id: string;
  title: string;
  description: string;
  userid: string;
  classCode: string;
  posterName: string;
  posterEmail: string;
  availabilities: string[]
}

const ForumPage = () => {
  const [posts, setPosts] = useState<PostWithUserDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // To hold the search term from URL

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchTerm(query); // Update the search term

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize search from URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      setSearchTerm(query);  // Set the initial search term from the URL
      handleSearch(query);   // Perform the search with the initial term
    }
  }, []);

  return (
    <div id='forum-page' className='pageTitle'>
      <h1>Tutor Listings</h1>
      {/* Search Bar */}
      <div className="longSearchBarContainer">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      </div>
      <div className="full-width-container">
        <div className='post-list'>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <div style={{ marginBottom: "2em" }}>
                <Post
                  key={index}
                  title={post.classCode} // note: displaying classCode as title
                  description={post.description}
                  posterName={post.posterName}
                  posterEmail={post.posterEmail}
                  availabilities={post.availabilities}
                />
              </div>
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
