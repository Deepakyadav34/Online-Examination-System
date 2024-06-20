import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

const RegisterDetails = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3001/students");
        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.statusText}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <AdminDashboard />
      <div style={{ marginLeft: '320px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}><b>Registered Students</b></h1>
        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Roll No</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f4f4f4', fontWeight: 'bold' }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }}>
                <td style={{ padding: '12px', textAlign: 'center' }}>{student.name} {student.lastName}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{student.rollNo}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{student.userId}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{student.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisterDetails;
