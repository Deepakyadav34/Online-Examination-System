import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import styles from './HomePage.module.css';
import Dashboard from './Dashboard';


// Register all necessary components
Chart.register(...registerables);

const HomePage = () => {

  const [studentCount, setStudentCount] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]); // Initialize students state as an empty array

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/students/count');
        if (!response.ok) {
          throw new Error('Failed to fetch student count');
        }
        const data = await response.json();
        setStudentCount(data.studentCount);
      } catch (error) {
        console.error('Error fetching student count:', error);
      }
    };

    fetchStudentCount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentCountResponse = await fetch('http://localhost:3001/students/count');
        const activeResponse = await fetch('http://localhost:3001/students/active/count');

        if (!studentCountResponse.ok || !activeResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const studentCountData = await studentCountResponse.json();
        const activeData = await activeResponse.json();

        setStudentCount(studentCountData.studentCount);
        setActiveStudents(activeData.count);

        // Fetch student data
        const studentsResponse = await fetch('http://localhost:3001/students');
        if (!studentsResponse.ok) {
          throw new Error('Failed to fetch students');
        }
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const registeredStudentData = {
    labels: ['Registered Students'],
    datasets: [
      {
        label: 'Students',
        data: [studentCount],
        backgroundColor: ['#3e95cd'],
      },
    ],
  };

  const activeStudentData = {
    labels: ['Active Students'],
    datasets: [
      {
        label: 'Students',
        data: [activeStudents],
        backgroundColor: ['#8e5ea2'],
      },
    ],
  };

 

  return (
    <>
      <Dashboard />
      
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={`${styles.card} ${styles.registeredCard}`}>
            <h3 style={{color:'black'}}>Registered Students</h3>
            <p>{studentCount}</p>
          </div>
          <div className={`${styles.card} ${styles.activeCard}`}>
            <h3 style={{color:'black'}}>Active Students</h3>
            <p>{activeStudents}</p>
          </div>
        </div>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <h3 style={{color:'black'}}>Registered Students</h3>
            <Bar data={registeredStudentData} />
          </div>
          <div className={styles.chart}>
            <h3 style={{color:'black'}}>Active Students</h3>
            <Bar data={activeStudentData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
