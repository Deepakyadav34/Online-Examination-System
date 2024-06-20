import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

function Approvals() {
  const [pendingTeachers, setPendingTeachers] = useState([]);

  useEffect(() => {
    const fetchPendingTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pending-teachers');
        setPendingTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch pending teachers:', error);
      }
    };

    fetchPendingTeachers();
  }, []);

  const handleApprove = async (teacherId) => {
    try {
      await axios.post(`http://localhost:3001/approve-teacher/${teacherId}`);
      setPendingTeachers(pendingTeachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error('Failed to approve teacher:', error);
    }
  };

  const handleReject = async (teacherId) => {
    try {
      await axios.post(`http://localhost:3001/reject-teacher/${teacherId}`);
      setPendingTeachers(pendingTeachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error('Failed to reject teacher:', error);
    }
  };

  return (
    <>
      <AdminDashboard/>
    <div style={{marginLeft:'310px'}}>
  
      <h1 style={{color:'black'}}>Pending Teacher Approvals</h1>
      {pendingTeachers.length > 0 ? (
        <ul>
          {pendingTeachers.map(teacher => (
            <li key={teacher.id}>
              {teacher.name} - {teacher.email}
              <button onClick={() => handleApprove(teacher.id)} style={{width:'200px',marginLeft:'200px'}}>Approve</button>
              <button onClick={() => handleReject(teacher.id)} style={{width:'200px',marginLeft:'100px'}}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending approvals.</p>
      )}
    </div>
    </>
  );
}

export default Approvals;
