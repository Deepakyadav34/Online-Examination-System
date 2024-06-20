import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./AdminHome.css";
import AdminDashboard from "./AdminDashboard";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Registered",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Active",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const RegisterActiveCards = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

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
    const fetchTeacherCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/teachers/count');
        if (!response.ok) {
          throw new Error('Failed to fetch teacher count');
        }
        const data = await response.json();
        setTeacherCount(data.teacherCount);
      } catch (error) {
        console.error('Error fetching teacher count:', error);
      }
    };

    fetchTeacherCount();
  }, []);
  const registeredStudentData = {
    labels: ['Registered Students'],
    datasets: [
      {
        label: 'Students',
        data: [studentCount],
        backgroundColor:["rgba(255,99,132,0.2)"],
       
      },
    ],
  };


const registerTeacherData= {
  labels: ['Registered Students'],
  datasets: [
    {
      label: 'Students',
      data: [teacherCount],
      backgroundColor: ['#3e95cd'],
    },
  ],
};
  

  return (
    <>
      <div className="container">
        <AdminDashboard />
        <div className="content">
          <div className="admin-cards">
            <div className="admin-card">
              
              <h3>Register Teacher</h3>
              <b>{teacherCount}</b>
            </div>
            <div className="admin-card">
              
              <b>Active Teacher</b>
            </div>
            <div className="admin-card">
              
              <h3>Register Student</h3>
              <b>{studentCount}</b>
            </div>
            <div className="admin-card">
              
              <b>Active Student</b>
            </div>
          </div>
          <div className="row" style={{ margin: "0 0 0 77px" }}>
            <div className="graphs">
              <div className="graph" style={{ width: "550px" }}>
                <h2>Register Teacher</h2>
                <Bar data={registerTeacherData} options={options} />
              </div>
              <div className="graph" style={{ width: "550px" }}>
                <h2>Active Teacher</h2>
                <Bar data={data} options={options} />
              </div>
            </div>
            <div className="graphs">
              <div className="graph" style={{ width: "550px" }}>
                <h2>Register Student</h2>
                <Bar data={registeredStudentData} options={options} />
              </div>
              <div className="graph" style={{ width: "550px" }}>
                <h2>Active Student</h2>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterActiveCards;
