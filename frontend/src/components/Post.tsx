import "./Post.css"

interface PostProps {
  title: string;
  course: string;
  availabilities: string[];
  description: string;
  posterName: string;
  posterEmail: string;
  classCode: string;
}



import React from 'react';

const Post: React.FC<PostProps> = ({
  title,
  description,
  posterName,
  posterEmail,
  availabilities,
  classCode
}) => {
  return (
    <div className="postItem">
      <div className="postHeader">
        <div className="postDetails">
          <div>Posted by: {posterName}</div>
          <div>Email: {posterEmail}</div>
          <div>Availability: {availabilities}</div>
          <p>{description}</p>
        </div>
        <div className="postClass">
          <h1>{title}</h1>
          <div>Class Code: {classCode}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;