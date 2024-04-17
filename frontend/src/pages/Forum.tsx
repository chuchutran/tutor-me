import Post from '../components/Post'
import './Forum.css'
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

  return (
    <div id='forum-page'>
      <h1 className='hero'>All the posts show here</h1>
      <div className='postsContainer'>
        {posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            description={post.description}
            posterId={post.posterId}
            classCode={post.classCode}
          />
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
