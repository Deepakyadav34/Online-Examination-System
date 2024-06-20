import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiStudentBold } from "react-icons/pi";
import { FaClipboardList, FaCode, FaRegCheckCircle, FaUser, FaIdBadge ,FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [userData, setUserData] = useState("name,rollNo,userId");
  const [exams, setExams] = useState([]);
  const [notices, setNotices] = useState([]);
  const [quizTime, setQuizTime] = useState({ start: '', end: '' });
  const [codingTime, setCodingTime] = useState({ start: '', end: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        
        const examsResponse = await axios.get('http://localhost:3001/exams');
        setExams(examsResponse.data);

        const noticesResponse = await axios.get('http://localhost:3001/notices');
        setNotices(noticesResponse.data);

        const accessTimesResponse = await axios.get('http://localhost:3001/access-times');
        setQuizTime(accessTimesResponse.data.quizTime);
        setCodingTime(accessTimesResponse.data.codingTime);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/user-info', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, []);
  const requestFullScreen = () => {
    const docElement = document.documentElement;
    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if (docElement.mozRequestFullScreen) {
      docElement.mozRequestFullScreen();
    } else if (docElement.webkitRequestFullscreen) {
      docElement.webkitRequestFullscreen();
    } else if (docElement.msRequestFullscreen) {
      docElement.msRequestFullscreen();
    }
  };

  const handleNavigation = (path) => {
    const currentTime = new Date();

    const isWithinTimeRange = (start, end) => {
      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);

      const startTime = new Date();
      startTime.setHours(startHour, startMinute, 0);

      const endTime = new Date();
      endTime.setHours(endHour, endMinute, 0);

      return currentTime >= startTime && currentTime <= endTime;
    };

    if (path === '/quiz' && !(isWithinTimeRange(quizTime.start, quizTime.end))) {
      alert('Quiz can only be accessed during the allowed time.');
      return;
    }

    if (path === '/coding' && !(isWithinTimeRange(codingTime.start, codingTime.end))) {
      alert('Coding can only be accessed during the allowed time.');
      return;
    }

    if (path === '/quiz' || path === '/coding') {
      requestFullScreen();
    }
    navigate(path);
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarBox}>
        <h2><PiStudentBold /> Student Dashboard</h2>
        <div className={styles.studentDetails}>
        <p>
              <FaUser style={{ color: 'blue' }} /> <strong>Name: </strong> {userData.name}<br />
              <FaIdBadge style={{ color: 'green', marginTop: '10px' }} /> <strong>Roll No: </strong> {userData.rollNo}<br />
              <FaIdBadge style={{ color: 'purple', marginTop: '10px' }} /> <strong>ID: </strong> {userData.userId}
            </p>
        </div>
        <ul className={styles.examList}>
          {exams.map((exam) => (
            <li key={exam.examId} onClick={() => handleNavigation(`/exam/${exam.examId}`)}>
              {exam.examDate} - {exam.examTime} - {exam.examSubject} - {exam.examRoom}
            </li>
          ))}
        </ul>
        <ul className={styles.menuList}>
          <li onClick={() => handleNavigation('/quiz')}>
            <FaClipboardList style={{ color: 'orange', marginTop:'10px' }} /> Quiz (Access: {quizTime.start} - {quizTime.end})
          </li>
          <li onClick={() => handleNavigation('/coding')}>
            <FaCode style={{ color: 'red', marginTop:'10px' }} /> Coding Question (Access: {codingTime.start} - {codingTime.end})
          </li>
          <li onClick={() => handleNavigation('/results')}>
            <FaRegCheckCircle style={{ color: 'purple' }} /> Results
          </li>
          <li onClick={() => handleNavigation('/')}>
              <FaSignOutAlt style={{ color: 'red' }} /> Logout
          </li>
        </ul>
      </div>
      <div className={styles.notices}>
        <div className={styles.title}>
          <h1>Notices</h1>
        </div>
        <ul>
          {notices.map((notice, index) => (
            <li key={index}>
              <strong>{notice.title}</strong>: {notice.description}<br />
              <small>Posted on: {new Date(notice.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
