import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

function TeacherDetails() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    fetch('http://localhost:3001/teachers')
      .then(response => response.json())
      .then(data => {
        setTeachers(data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  };

  return (
    <>
      <AdminDashboard />
      <div style={{ marginLeft: '320px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}><b>Teacher Details</b></h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Last Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }}>
                <td style={{ padding: '12px', textAlign: 'center' }}>{teacher.id}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{teacher.name}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{teacher.lastName}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{teacher.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeacherDetails;
