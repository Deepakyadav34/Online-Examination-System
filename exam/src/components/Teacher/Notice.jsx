import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const Notice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [notices, setNotices] = useState([]);

  const loadNotices = async () => {
    try {
      const response = await fetch('http://localhost:3001/notices');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noticeData = {
      title,
      description,
      targetClass,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3001/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticeData),
      });

      if (response.ok) {
        const newNotice = await response.json(); 
        setNotices([...notices, newNotice]); 
        alert('Notice submitted successfully!');
        setTitle('');
        setDescription('');
        setTargetClass('');
      } else {
        alert('Failed to submit notice.');
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      alert('Error submitting notice.');
    }
  };

  const deleteNotice = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notices/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Notice deleted successfully!');
        const updatedNotices = notices.filter((notice) => notice.id !== id);
        setNotices(updatedNotices);
      } else {
        alert('Failed to delete notice.');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Error deleting notice.');
    }
  };

  return (
    <>
    <Dashboard/>
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '600px', 
      backgroundColor:'white',
     
    }}>
      <h2>Submit a Notice</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Title:</label><br/>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' ,width:'300px'}}>
          <label htmlFor="description">Description:</label><br/>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="targetClass">Target Class:</label><br/>
          <select
            id="targetClass"
            value={targetClass}
            onChange={(e) => setTargetClass(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            <option value="Class 1">1st year</option>
            <option value="Class 2">2nd year</option>
            <option value="Class 3">3rd year</option>
            <option value="Class 3">4th year</option>
          </select>
        </div>
        <button type="submit">Submit Notice</button>
      </form>
      <button  style={{marginTop:'30px'}}onClick={loadNotices}>Show Notices</button>
      <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
  {notices.map((notice) => (
    <li key={notice.id} style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '15px', 
      margin: '10px 0', 
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <strong style={{ fontSize: '1.2em', display: 'block' }}>{notice.title}</strong>
      </div>
      <div style={{ marginBottom: '10px', color: '#555' }}>
        {notice.description}
      </div>
      <div style={{ marginBottom: '10px', fontStyle: 'italic', color: '#777' }}>
        Target Class: {notice.targetClass}
      </div>
      <div style={{ marginBottom: '10px', color: '#999' }}>
        Posted on: {new Date(notice.createdAt).toLocaleString()}
      </div>
      <button 
        onClick={() => deleteNotice(notice.id)} 
        style={{ 
          padding: '8px 12px', 
          border: 'none', 
          borderRadius: '3px', 
          backgroundColor: '#d9534f', 
          color: '#fff', 
          cursor: 'pointer' ,
          width:'100px',
          marginLeft:'50px'
        }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>

    </div>
    </>
  );
};

export default Notice;
