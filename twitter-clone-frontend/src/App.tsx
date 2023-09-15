// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Timeline from './components/Timeline';
import SignupForm from './components/SignupForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" Component={SignupForm} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/timeline" Component={Timeline} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
};

export default App;
