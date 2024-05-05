import { useState } from 'react';
import './Home.css';
import Post from '../components/Post'
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import searchIcon from '../assets/searchIcon.svg';

const HomePage = () => {
    // setQuery updates the search "query" based on user input 
    const [query, setQuery] = useState('');
    // setPosts updates "posts" [] with results of search
    const [posts, setPosts] = useState<Post[]>([]);
    // loading indicates if data is currently being fetched; setLoading toggles
    const [loading, setLoading] = useState(false);
    // setError sets "error" to an error message if any issues occur
    const [error, setError] = useState(null);

    // Updates "query" state whenever search bar text changes
    const handleSearchChange = (event) => {
    // Updates "query" state with current value from search input field
    setQuery(event.target.value);
    };

    // Handles search operation when user submits query
    const handleSearchSubmit = async () => {
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
        setError(err.message || "An unknown error occurred.");
    } finally {
        setLoading(false); // indicate data fetching completed
    }
    };

  // Detects "Enter" key to submit the search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div id='home-page' className='hero'>
      <h1 style={{ fontSize: "4rem", marginTop: "4rem", marginBottom: "0" }}>Tutor Me</h1>
      <div style={{ fontSize: "1.1rem", marginTop: "0" }}>Student tutoring platform for Cornell Students</div>
      <div style={{ fontSize: "1.8rem", marginTop: "6rem" }}>What class do you need help with?</div>
      {/* Search Bar */}
      <div className="searchContainer">
        <img
            src={searchIcon}
            alt="Search Icon"
            className="searchIcon"
        />
        <input 
            type='text'
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder='Enter a class number here (ex. CS4820)'
            className="searchInput"
        />
      </div>
      {/* Display Posts */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Results:</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.description}</li>
            ))}
          </ul>
        ) : (
          <p>No posts found for this course.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
