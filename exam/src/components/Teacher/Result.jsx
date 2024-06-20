import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';


function Result() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/scores')
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error('Failed to fetch scores:', error));
  }, []);

  return (
    <>
      <Dashboard />
      <div style={{marginLeft:'300px'}}>
      <div style={{
    
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ color: 'black' }}>All Scores</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '20px 0',
          fontSize: '16px',
          textAlign: 'left'
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '12px 15px',
                backgroundColor: '#009879',
                color: 'white'
              }}>Name</th>
              <th style={{
                padding: '12px 15px',
                backgroundColor: '#009879',
                color: 'white'
              }}>Score</th>
              <th style={{
                padding: '12px 15px',
                backgroundColor: '#009879',
                color: 'white'
              }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.id} style={{
                borderBottom: '1px solid #dddddd',
                backgroundColor: score.id % 2 === 0 ? '#f3f3f3' : 'white'
              }}>
                <td style={{ padding: '12px 15px' }}>{score.name}</td>
                <td style={{ padding: '12px 15px' }}>{score.score}</td>
                <td style={{ padding: '12px 15px' }}>{new Date(score.timestamp).toLocaleString()}</td>
              </tr>
            ))}
            {scores.length > 0 && (
              <tr style={{ borderBottom: '2px solid #009879' }}>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default Result;
