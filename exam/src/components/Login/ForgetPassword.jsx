import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/forgot-password', { email });
            setMessage(response.data.message); // Expecting a success message from the server
        } catch (error) {
            if (error.response) {
                // Handling responses sent from the server
                setMessage(error.response.data.message);
            } else {
                setMessage('Unable to connect to the server.');
            }
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <h2>Reset Your Password</h2>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send Reset Link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
