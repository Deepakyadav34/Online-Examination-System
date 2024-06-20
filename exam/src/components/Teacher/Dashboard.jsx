import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {  FaUser, FaIdBadge } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBullhorn,
  FaFileAlt,
  FaCode,
  FaPlus,
  FaSave,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = new URLSearchParams(location.search).get("score");
  const [teachers, setTeachers] = useState([]);
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);



  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3001/students');
        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.statusText}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        toast.error('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  const addResultField = () => {
    setResults([...results, { subject: '', score: '' }]);
    toast.info('Added new result field');
  };

  const handleSubmitResults = async () => {
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
      });

      if (response.ok) {
        console.log("Results saved successfully.");
        toast.success('Results saved successfully');
        // Navigate to the score page with the score as a URL parameter
        navigate(`/results-page?score=${score}`);
      } else {
        console.error('Failed to save results');
        toast.error('Failed to save results');
      }
    } catch (error) {
      console.error('Error submitting results:', error);
      toast.error('Error submitting results');
    }
  };
  
  

  const handleLogout = () => {
    // Perform logout logic here, such as clearing authentication tokens or session data
    // After logout, navigate to the login page
    navigate('/');
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teachers-info');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);
  return (
    <div className={styles.sidebar}>
      <h1 style={{display:'flex', alignContent:'center', fontSize:'24px'}}> <FaChalkboardTeacher  style={{color:'red',marginRight:'10px'}}/>Teacher Dashboard</h1>
      <ul>
  {teachers.map(teacher => (
    <p key={teacher.userId} style={{ listStyle: 'none', marginBottom: '10px' }}>
      <p style={{ margin: '0', padding: '5px 0' }}><b>Name:-</b> {teacher.name}</p>
      <p style={{ margin: '0', padding: '5px 0' }}><b>UserID:-</b> {teacher.userId}</p>
    </p>
  ))}
</ul>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={()=> navigate('/home')}> <FaHome/>Home</li>
        <li className={styles.menuItem} onClick={() => navigate('/teacher-interface')}>
          <FaChalkboardTeacher className={styles.monitoringIcon} /> Monitoring
        </li>
        <li className={styles.menuItem} onClick={() => navigate('/exam-scheduler')}>
          <FaCalendarAlt className={styles.scheduleIcon} /> Schedule Exam
        </li>
        <li className={styles.menuItem} onClick={() => navigate('/manage-notices')}>
          <FaBullhorn className={styles.noticesIcon} /> Manage Notices
        </li>
        <li className={styles.menuItem} onClick={() => navigate('/create-mcq')}>
          <FaFileAlt className={styles.mcqIcon} />  MCQ Paper
        </li>
        <li className={styles.menuItem} onClick={() => navigate('/create-coding')}>
          <FaCode className={styles.codingIcon} /> Coding Questions
        </li>
        <li className={styles.menuItem}  onClick={() => navigate('/add')}>
          <FaPlus className={styles.addResultIcon} /> Add New Result
        </li>
        <li className={styles.menuItem}   onClick={() => navigate('/mcqScore')}>
          <FaSave className={styles.submitIcon} /> MCQ  Results
        </li>
        <li className={styles.menuItem} onClick={() => navigate('/registerDetails')}>
          <FaSave className={styles.submitIcon} /> Registered Students
        </li>
        <li className={styles.menuItem} onClick={handleLogout}>
          <FaSignOutAlt  style={{color:'red'}}className={styles.logoutIcon} /> Logout
        </li>
      </ul>
     

     
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
