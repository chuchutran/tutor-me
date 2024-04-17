import "./Post.css"

interface PostProps {
  title: string;
  description: string;
  posterId: string;
  classCode: string;
}

import React from 'react';

const Post: React.FC<PostProps> = ({ title, description, posterId, classCode }) => {
  return (
    <div className="postItem">
      <h1>{title}</h1>
      <p>{description}</p>
      <div>Posted by: {posterId}</div>
      <div>Class Code: {classCode}</div>
    </div>
  );
};

export default Post;
