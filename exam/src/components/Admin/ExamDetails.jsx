import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaCode } from 'react-icons/fa';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const ExamDetails = () => {
  const [exams, setExams] = useState([]);
  const [quizTime, setQuizTime] = useState({ start: '', end: '' });
  const [codingTime, setCodingTime] = useState({ start: '', end: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examsResponse = await axios.get('http://localhost:3001/exams');
        setExams(examsResponse.data);

        const accessTimesResponse = await axios.get('http://localhost:3001/access-times');
        setQuizTime(accessTimesResponse.data.quizTime);
        setCodingTime(accessTimesResponse.data.codingTime);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const sidebarContainerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '1px solid #dee2e6',
    marginLeft:'310px'
  };

  const sidebarBoxStyle = {
    padding: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    border: '1px solid #dee2e6',
    padding: '8px',
    backgroundColor: '#e9ecef',
  };

  const tdStyle = {
    border: '1px solid #dee2e6',
    padding: '8px',
  };

  const menuListStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const menuItemStyle = {
    margin: '10px 0',
    cursor: 'pointer',
  };

  return (
    <div style={sidebarContainerStyle}>
    <AdminDashboard/>
      <div style={sidebarBoxStyle}>
      <h2 style={{textAlign:'center'}}>Exam Details</h2>
        <div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Room</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.examId} onClick={() => handleNavigation(`/exam/${exam.examId}`)}>
                  <td style={tdStyle}>{exam.examDate}</td>
                  <td style={tdStyle}>{exam.examTime}</td>
                  <td style={tdStyle}>{exam.examSubject}</td>
                  <td style={tdStyle}>{exam.examRoom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul style={menuListStyle}>
          <li style={menuItemStyle}>
            <FaClipboardList style={{ color: 'orange', marginTop: '10px' }} /> Quiz (Access: {quizTime.start} - {quizTime.end})
          </li>
          <li style={menuItemStyle}>
            <FaCode style={{ color: 'red', marginTop: '10px' }} /> Coding Question (Access: {codingTime.start} - {codingTime.end})
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default ExamDetails;
