// src/components/LoginForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './LoginForm.css'; // Import the CSS file
import TwitterLogo from '../assets/twitter-logo.png'; // Import the Twitter logo

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // Initialize useHistory

  const handleLogin = () => {
    const loginData = { username, password };

    axios.post('http://localhost:3000/api/login', loginData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        // Redirect to the timeline page after successful login
        navigate('/timeline');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Display an error message to the user
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={TwitterLogo} alt="Twitter Logo" className="twitter-logo" />
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
