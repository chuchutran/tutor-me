import Post from '../components/Post'
import './Forum.css'
import { Post } from "../../../backend/types.ts"
interface PostData {
  title: string;
  description: string;
  posterId: string;
  classCode: string;
}

const posts: PostData[] = [
  {
    title: "Introduction to React",
    description: "Learn the basics of React including components, state, and props.",
    posterId: "user123",
    classCode: "CS101"
  },
  {
    title: "Advanced React Patterns",
    description: "Explore more complex patterns in React for larger applications.",
    posterId: "user456",
    classCode: "CS201"
  },
  {
    title: "Algowithms",
    description: "Bobby and Michael yapping for 50 mins straight",
    posterId: "user789",
    classCode: "CS4820"
  },
];

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      if (selectedDays.length === 0) {
        // Fetch all posts or handle this case according to your app logic
        return;
      }

      const postsRef = collection(db, "posts");
      // Create a query against the collection.
      const q = query(postsRef, where("availabilities", "array-contains-any", selectedDays));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetchedPosts);
    };

    fetchFilteredPosts();
  }, [selectedDays]);

  const handleDayChange = (day) => {
    setSelectedDays(prev => {
      // Check if day is already selected
      if (prev.includes(day)) {
        // Remove the day from the selection
        return prev.filter(d => d !== day);
      } else {
        // Add the day to the selection
        return [...prev, day];
      }
    });
  };

  return (
    <div>
      <h1>Posts Filtered by Availability</h1>
      <div>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <label key={day}>
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
            /> {day}
          </label>
        ))}
      </div>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.course}</h2>
            <p>{post.description}</p>
            <small>Available on: {post.availabilities.join(", ")}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
