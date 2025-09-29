import React, { useContext, useState } from 'react';
import './MemoryCard.css';
import { AuthContext } from '../store/auth';

const MemoryCard = ({ memory }) => {
  const { deleteMemory, updateMemory } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: memory.title,
    summary: memory.summary,
    location: memory.location,
    people: memory.people.join(', ')
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      people: formData.people.split(',').map(p => p.trim())
    };
    updateMemory(memory._id, updatedData);
    setShowForm(false);
  };

  return (
    <div className="memory-card">
      {memory.images?.length > 0 && (
        <img
          src={memory.images[0]}
          alt={memory.title}
          className="memory-image"
        />
      )}

      <div className="memory-content">
        <h3 className="memory-title">{memory.title}</h3>
        <p className="memory-location">{memory.location}</p>
        <p className="memory-summary">{memory.summary}</p>
        {memory.people?.length > 0 && (
          <p className="memory-people">Tagged: {memory.people.join(', ')}</p>
        )}
      </div>

      <div className='del-btn'>
        <button className="update-btn" onClick={() => setShowForm(prev => !prev)}>Update</button>
        <button className="delete-btn" onClick={() => deleteMemory(memory._id)}>Delete</button>
      </div>

      {/* Professional Update Form */}
      {showForm && (
        <div className="update-form-container">
          <form onSubmit={handleSubmit} className='update-form'>
            <h4>Update Memory</h4>
            <input
              type="text"
              name='title'
              value={formData.title}
              onChange={inputHandler}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name='summary'
              value={formData.summary}
              onChange={inputHandler}
              placeholder="Summary"
              required
            />
            <input
              type="text"
              name='people'
              value={formData.people}
              onChange={inputHandler}
              placeholder="Tag People (comma separated)"
            />
            <input
              type="text"
              name='location'
              value={formData.location}
              onChange={inputHandler}
              placeholder="Location"
            />
            <div className="form-buttons">
              <button type='submit' className="save-btn">Save</button>
              <button type='button' className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
