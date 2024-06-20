import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket.js';
import Dashboard from './Dashboard.jsx';


const StudentMonitoring = () => {
  const [students, setStudents] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('studentProgress', (student) => {
      setStudents((prevStudents) => [...prevStudents, student]);
    });
  }, []);

  return (
    <>
    <Dashboard/>
    <div>
      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Progress: {student.progress}%</p>
        </div>
      ))}
    </div>
    </>
  );
};
export default StudentMonitoring;