import React, { useState } from 'react';
import axios from 'axios';

const ResultsUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('resultFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload-results', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Upload successful');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '400px', 
      backgroundColor:'white'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Upload Exam Results</h2>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '20px' }} />
      <button onClick={handleUpload} style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '10px 20px', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}>Upload</button>
    </div>
  );
};

export default ResultsUpload;
