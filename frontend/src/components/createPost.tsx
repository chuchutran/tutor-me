import React, { useState } from 'react';
import { BACKEND_BASE_PATH } from "../constants/Navigation";

interface Props {
  userId: string;
  onClose: () => void;  // Function to close the modal
}


const CreatePostModal: React.FC<Props> = ({ userId, onClose }) => {
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [availabilities, setAvailabilities] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      userid: userId,
      course,
      description,
      availabilities
    };
    try {
        const query = encodeURIComponent(userId);  
        const response = await fetch(`${BACKEND_BASE_PATH}/post/${query}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create post');
      onClose();  // Close modal on success
      alert('Post created successfully!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="modal" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2>What class are you tutoring?</h2>
            
            <label htmlFor="course">Course:</label>
            <input
                id="course"
                type="text"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="ex: CS1110"
                required
            />

            <label htmlFor="availabilities">Availabilities:</label>
            <input
                id="availabilities"
                type="text"
                value={availabilities}
                onChange={e => setAvailabilities(e.target.value)}
                placeholder="ex: Monday, Tuesday"
                required
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="ex: I'm really good at this!"
                required
                style={{ height: '100px', resize: 'none' }}  // Make the textarea a bit larger and non-resizable
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="submit" style={{ padding: '10px', fontSize: '16px', margin: '10px 0', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Create Post
                </button>
                <button type="button" onClick={onClose} style={{ padding: '10px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
);

};

export default CreatePostModal;