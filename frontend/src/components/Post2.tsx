import "./Post.css"

interface PostProps {
  title: string;
  availabilities: string[];
  description: string;
  posterName: string;
  posterEmail: string;
  docId: string;  // Assuming each post has a document ID
}



import React from 'react';

const Post2: React.FC<PostProps> = ({
  title,
  description,
  posterName,
  posterEmail,
  availabilities,
  docId,
}) => {
  return (
    <div className="postItem">
      <div className="postHeader">

        <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>{posterName}</div>
        <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>{title}</div>

      </div>
      <div className="postDetails">
        <div>Email: {posterEmail}</div>
        <div>Availability: {availabilities}</div>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};

export default Post2;