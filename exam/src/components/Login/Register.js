import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import ParticlesComponent from '../particles';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rollNo: '',
    userId: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, lastName, rollNo, userId, password, confirmPassword, role } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: role === 'teacher' && name === 'userId' && !value.startsWith('T') ? `T${value}` : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (role === 'student' && !rollNo) {
      setError('Roll No is required for students.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        lastName,
        rollNo,
        userId,
        password,
        role,
      });

      console.log('Registration successful:', response.data);

      if (response.data.role === 'teacher') {
        alert('Registration successful. Your profile needs to be approved by an admin.');
        navigate('/login?role=teacher');
      } else {
        alert('Registration successful.');
        navigate('/login?role=student');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='container-demo'>
    <ParticlesComponent id='particles'/>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select name="role" value={role} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '5px', width: '100%' }}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input type="text" name="name" value={name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="lastName" value={lastName} onChange={handleInputChange} placeholder="Last Name" required />
        {role === 'student' && (
          <input type="text" name="rollNo" value={rollNo} onChange={handleInputChange} placeholder="Roll No" required />
        )}
        <input type="text" name="userId" value={userId} onChange={handleInputChange} placeholder="Email Id" required />
        <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required />
        
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        <button type="submit" style={{ padding: '10px', background: '#4a148c', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
