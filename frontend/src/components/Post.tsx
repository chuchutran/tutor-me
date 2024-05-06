import "./Post.css"

interface PostProps {
  title: string;
  availabilities: string[];
  description: string;
  posterName: string;
  posterEmail: string;
  docId: string;  // Assuming each post has a document ID
  onDelete: (docId: string) => void;
}



import React from 'react';

const Post: React.FC<PostProps> = ({
  title,
  description,
  posterName,
  posterEmail,
  availabilities,
  docId,
  onDelete,
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
        <button onClick={() => onDelete(docId)} style={{ color: "black", padding: '5px 10px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default Post;