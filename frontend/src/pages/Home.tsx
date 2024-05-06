import './Home.css';
import SearchBar from '../components/SearchBar';
import { BACKEND_BASE_PATH } from "../constants/Navigation";

const HomePage = () => {
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`${BACKEND_BASE_PATH}/post/filter/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error fetching posts for course: ${query}`);
      }

      window.location.href = `/forum?query=${encodeURIComponent(query)}`;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div id='home-page' className='hero'>
      <h1 style={{ fontSize: "4rem", marginTop: "4rem", marginBottom: "0" }}>Tutor Me</h1>
      <div style={{ fontSize: "1.ß1rem", marginTop: "0" }}>Student tutoring platform for Cornell Students</div>
      <div style={{ fontSize: "1.8rem", marginTop: "6rem" }}>What class do you need help with?</div>
      <SearchBar onSearch={handleSearch} />

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
