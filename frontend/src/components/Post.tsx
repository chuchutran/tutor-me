import "./Post.css"

interface PostProps {
  userid: string;
  course: string;
  availabilities: string[];
  description: string;
}

import React from 'react';

const Post: React.FC<PostProps> = ({ userid, course, availabilities, description }) => {
  return (
    <div className="postItem">
      <h1>{course}</h1>
      <p>{description}</p>
      <div>Posted by: {userid}</div>
      <div>When: {availabilities}</div>
    </div>
  );
};

export default Post;
