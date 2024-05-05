import { useState } from 'react';
import './Home.css';
import PostComponent from '../components/Post';
import SearchBar from '../components/SearchBar';
import { searchPosts } from '../utils/api'; // Adjust path if needed

interface PostData {
  id: string;
  course: string;
  userid: string;
  description: string;
  availabilities: string[];
}

const HomePage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the `searchPosts` utility function
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchPosts(query);
      setPosts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='home-page' className='hero'>
      <h1 style={{ fontSize: "4rem", marginTop: "4rem", marginBottom: "0" }}>Tutor Me</h1>
      <div style={{ fontSize: "1.1rem", marginTop: "0" }}>Student tutoring platform for Cornell Students</div>
      <div style={{ fontSize: "1.8rem", marginTop: "6rem" }}>What class do you need help with?</div>
      <SearchBar onSearch={handleSearch} />
      <div style={{ marginTop: "2rem" }}>
        <h2>Results:</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <PostComponent
                title={post.course}
                description={post.description}
                posterName={post.userid}
                availabilities={post.availabilities}
                course={post.course}
              />
            </li>
          ))
        ) : (
          <p>No posts found for this course.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
