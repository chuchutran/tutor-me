import { useState } from 'react';
import './Home.css';
// import PostComponent from '../components/Post';
import SearchBar from '../components/SearchBar';
// import { BACKEND_BASE_PATH } from "../constants/Navigation";


interface PostData {
  id: string;
  title: string;
  description: string;
  userid: string;
  classCode: string;
  availabilities: string[]
}


const HomePage = () => {
  const [posts] = useState<PostData[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);


  // const handleSearch = async (query: string) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(`${BACKEND_BASE_PATH}/post/filter/${encodeURIComponent(query)}`);
  //     if (!response.ok) {
  //       throw new Error(`Error fetching posts for course: ${query}`);
  //     }
  //     const data = await response.json();
  //     setPosts(data);

  //     window.location.href = `/forum?query=${encodeURIComponent(query)}`;
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("An unknown error occurred.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (query: string) => {
    // Simply redirect to the forum page with the query as a URL parameter
    window.location.href = `/forum?query=${encodeURIComponent(query)}`;
  };

  return (
    <div id='home-page' className='hero'>
      <h1 style={{ fontSize: "4rem", marginTop: "4rem", marginBottom: "0" }}>Tutor Me</h1>
      <div style={{ fontSize: "1.ß1rem", marginTop: "0" }}>Student tutoring platform for Cornell Students</div>
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
              {/* <PostComponent
                title={post.title}
                description={post.description}
                posterName={post.userid}
                posterEmail="null"
                availabilities={post.availabilities}
              /> */}
            </li>
          ))
        ) : (
          <p>No posts found for this course.</p>
        )}
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p>1. Enter the name of the class you need help with in the search bar above.</p>
        <p>2. Browse through the tutor postings to find the right match for you.</p>
        <p>3. Contact the tutor directly using the provided contact information to arrange tutoring sessions.</p>
        <p>4. Enhance your learning experience and excel in your studies with the help of a knowledgeable tutor!</p>
      </div>
    </div>
  );
};

export default HomePage;