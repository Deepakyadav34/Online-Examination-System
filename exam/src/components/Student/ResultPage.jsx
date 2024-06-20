import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('results'));
    if (storedResults) {
      setResults(storedResults);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3001/result');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to fetch results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);


  return (
    <>
      <Sidebar />
      <div style={{
        margin: '20px auto',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Results</h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Name</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Roll No</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Class</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Subject</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Marks Obtained</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result.id}>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.name}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.rollNo}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.class}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.subject}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.marksObtained}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'left'
                }}>{result.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ResultsPage;