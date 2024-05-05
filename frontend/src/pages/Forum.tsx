// ForumPage.tsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Post from '../components/Post';
import { searchPosts, fetchAllPosts } from '../utils/api'; // Adjust the path as needed
import './Forum.css';

interface PostData {
  id: string;
  title: string;
  description: string;
  posterId: string;
  classCode: string;
}

const ForumPage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle search queries by querying the database
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    const data = await searchPosts(query);
    if (data.length === 0) {
      setError('No posts found for this query.');
    }
    setPosts(data);
    setLoading(false);
  };

  // Optionally load all posts initially
  const loadAllPosts = async () => {
    setLoading(true);
    setError(null);

    const data = await fetchAllPosts();
    setPosts(data);
    setLoading(false);
  };

  // Load all posts once when the component mounts
  useState(() => {
    loadAllPosts();
  }, []);

  return (
    <div id='forum-page' className='pageTitle'>
      <h1>Tutor Listings</h1>

      {/* Search Bar */}
      <div className="longSearchBarContainer">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className='contentContainer'>
        <div className='filtersSection'>
          <h2>Filters</h2>
        </div>

        <div className='postsContainer'>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                description={post.description}
                posterId={post.posterId}
                classCode={post.classCode}
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
