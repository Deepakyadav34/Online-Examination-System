import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExamScheduler.css';
import Dashboard from './Dashboard';

const ExamScheduler = () => {
  const [quizTime, setQuizTime] = useState({ start: '', end: '' });
  const [codingTime, setCodingTime] = useState({ start: '', end: '' });
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examRoom, setExamRoom] = useState('');
  const [examId, setExamId] = useState('');
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e, type, timeType) => {
    const { name, value } = e.target;
    if (type === 'quiz') {
      setQuizTime({ ...quizTime, [name]: value });
    } else if (type === 'coding') {
      setCodingTime({ ...codingTime, [name]: value });
    } else if (timeType === 'exam') {
      if (name === 'date') setExamDate(value);
      if (name === 'time') setExamTime(value);
      if (name === 'subject') setExamSubject(value);
      if (name === 'room') setExamRoom(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExam = {
      examDate,
      examTime,
      examSubject,
      examRoom,
    };

    try {
      // Post exam schedule
      const examResponse = await axios.post('http://localhost:3001/exams', newExam);
      setExamId(examResponse.data.examId);
      setExams([...exams, { ...newExam, examId: examResponse.data.examId }]);

      // Post access times
      const accessTimeResponse = await axios.post('http://localhost:3001/access-times', {
        quizTime,
        codingTime,
      });

      if (accessTimeResponse.status === 200) {
        console.log("Access times saved successfully.");
        navigate('/dashboard');
      } else {
        console.error('Failed to save access times');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const fetchExams = async () => {
    const response = await axios.get('http://localhost:3001/exams');
    setExams(response.data);
  };

  const handleDeleteExam = async (examId) => {
    try {
      await axios.delete(`http://localhost:3001/exams/${examId}`);
      setExams(exams.filter((exam) => exam.examId !== examId));
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <>
    <Dashboard/>
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', background: '#f9f9f9' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' ,color:'black'}}>Schedule Exam and Access Times</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Quiz Access Time</h2>
            <label>
              Start Time:
              <input
                type="time"
                name="start"
                value={quizTime.start}
                onChange={(e) => handleInputChange(e, 'quiz')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
            <label style={{ marginTop: '10px' }}>
              End Time:
              <input
                type="time"
                name="end"
                value={quizTime.end}
                onChange={(e) => handleInputChange(e, 'quiz')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
          </div>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Coding Access Time</h2>
            <label>
              Start Time:
              <input
                type="time"
                name="start"
                value={codingTime.start}
                onChange={(e) => handleInputChange(e, 'coding')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
            <label style={{ marginTop: '10px' }}>
              End Time:
              <input
                type="time"
                name="end"
                value={codingTime.end}
                onChange={(e) => handleInputChange(e, 'coding')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
          </div>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Schedule an Exam</h2>
            <label>
              Exam Date:
              <input
                type="date"
                name="date"
                value={examDate}
                onChange={(e) => handleInputChange(e, 'exam', 'exam')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
            <label style={{ marginTop: '10px' }}>
              Exam Time:
              <input
                type="time"
                name="time"
                value={examTime}
                onChange={(e) => handleInputChange(e, 'exam', 'exam')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
            <label style={{ marginTop: '10px' }}>
              Exam Subject:
              <input
                type="text"
                name="subject"
                value={examSubject}
                onChange={(e) => handleInputChange(e, 'exam', 'exam')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
            <label style={{ marginTop: '10px' }}>
              Exam Room:
              <input
                type="text"
                name="room"
                value={examRoom}
                onChange={(e) => handleInputChange(e, 'exam', 'exam')}
                style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
              />
            </label>
          </div>
          <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Save Access Times and Schedule Exam
          </button>
        </form>
        <h2 style={{ marginTop: '20px' }}>Exams</h2>
        <button onClick={fetchExams} style={{ padding: '10px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
          Show Schedule
        </button>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {exams.map((exam) => (
            <li key={exam.examId} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', background: '#fff',color:'black' ,gap:'10px' }}>
              <p style={{color:'black'}}><strong>Date:</strong> {exam.examDate},</p><br/>
              <p style={{color:'black'}}><strong>Time:</strong> {exam.examTime},</p>
              <p style={{color:'black'}}><strong>Subject:</strong> {exam.examSubject},</p>
              <p style={{color:'black'}}><strong>Room:</strong> {exam.examRoom}</p>
              <button onClick={() => handleDeleteExam(exam.examId)} style={{ padding: '5px 10px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer',width:'100px' ,marginLeft:'100px'}}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ExamScheduler;
