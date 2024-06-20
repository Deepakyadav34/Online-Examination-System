import React, { useState, useEffect, useRef } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ResultsAnalysis = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

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

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    renderChart();
  }, [results]);

  const renderChart = () => {
    const marksObtained = results.map(result => result.marksObtained);
    const totalMarks = results.map(result => result.totalMarks);

    const ctx = document.getElementById('resultsChart');

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: results.map(result => result.name),
        datasets: [
          {
            label: 'Marks Obtained',
            data: marksObtained,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Marks',
            data: totalMarks,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <>
      <AdminDashboard />
      <div style={{
        margin: '20px auto',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Student Results</h2>
        <canvas id="resultsChart" width="400" height="200"></canvas>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px'
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

export default ResultsAnalysis;
