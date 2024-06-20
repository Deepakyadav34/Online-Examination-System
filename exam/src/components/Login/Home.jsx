import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate();

  const handleAdminLogin = () => navigate('/login?role=admin');
  const handleTeacherLogin = () => navigate('/login?role=teacher');
  const handleStudentLogin = () => navigate('/login?role=student');

  return (
    <div className="home-container">
      <div className="Home">
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <header className="App-header">
          <h1>Online Examination System</h1>
        </header>
        <section className="instructions-box">
          <h2>Instructions</h2>
          <p>Please read the following instructions carefully before logging in.</p>
          <ul>
            <li>Ensure you have a stable internet connection.</li>
            <li>Keep your student ID and password ready.</li>
            <li>Do not refresh the page while taking the exam.</li>
          </ul>
        </section>
        <h4>Are You <FontAwesomeIcon icon={faCircleQuestion} /></h4>
        <section className="login-options">
          <button onClick={handleAdminLogin} className="login-button"> <RiAdminFill />
          <br />Admin Login</button>
          <button onClick={handleTeacherLogin} className="login-button"><FaChalkboardTeacher /><br />Teacher Login</button>
          <button onClick={handleStudentLogin} className="login-button"><PiStudentFill /><br />Student Login</button>
        </section>
      </div>
    </div>
  );
}

export default Home;
