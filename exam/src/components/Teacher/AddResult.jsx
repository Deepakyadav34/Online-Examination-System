import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

const AddResult = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollNo: '',
    class: '',
    subject: '',
    marksObtained: '',
    totalMarks: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3001/result');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to fetch results.');
      }
    };

    fetchResults();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/submit-result', studentDetails);
      alert('Result added successfully!');
      setResults([...results, response.data]);
      setStudentDetails({
        name: '',
        rollNo: '',
        class: '',
        subject: '',
        marksObtained: '',
        totalMarks: ''
      });
    } catch (error) {
      console.error('Error adding result:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response was received
        setError('Error: No response received from server.');
      } else {
        // Something else caused the error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/result/${id}`);
      setResults(results.filter(result => result.id !== id));
      alert('Result deleted successfully!');
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Failed to delete result. Please try again.');
    }
  };
  return (
    <>
      <Dashboard />
      <div style={{ margin: '20px auto', maxWidth: '600px' }}>
        <h2>Add Student Result</h2>
        <form onSubmit={handleAddResult}>
          <input
            type="text"
            name="name"
            value={studentDetails.name}
            onChange={handleChange}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            name="rollNo"
            value={studentDetails.rollNo}
            onChange={handleChange}
            placeholder="Roll Number"
            required
          />
          <input
            type="text"
            name="class"
            value={studentDetails.class}
            onChange={handleChange}
            placeholder="Class"
            required
          />
          <input
            type="text"
            name="subject"
            value={studentDetails.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
          <input
            type="number"
            name="marksObtained"
            value={studentDetails.marksObtained}
            onChange={handleChange}
            placeholder="Marks Obtained"
            required
          />
          <input
            type="number"
            name="totalMarks"
            value={studentDetails.totalMarks}
            onChange={handleChange}
            placeholder="Total Marks"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Result'}
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Student Results</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Roll No</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Class</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Subject</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Marks Obtained</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Total Marks</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.rollNo}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.class}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.subject}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.marksObtained}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{result.totalMarks}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <button style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDeleteResult(result.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddResult;
