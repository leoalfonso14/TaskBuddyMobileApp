import React, { useState } from 'react';

import './index.css'; // Create a separate CSS file for styling

const ExternalHomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    // Implement login functionality here
  };

  const signUp = () => {
    // Implement signup functionality here
  };

  const handleTogglePassword = () => {
    // Implement password toggle functionality here
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const handleResetPassword = () => {
    // Implement password reset functionality here
  };

  return (
    <div className="external-homepage">
      <div className="login-container">
        <h2>Login</h2>
        <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password-toggle" onClick={handleTogglePassword}>
          <i className="bi bi-eye-slash"></i>
        </div>
        <button className="login-btn" onClick={login}>
          Login
        </button>
        <button className="signup-btn" onClick={signUp}>
          Sign up
        </button>
        <button className="forgot-password-btn" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </div>

      {showModal && (
        <div className="forgot-password-modal">
          {/* Modal content goes here */}
        </div>
      )}
    </div>
  );
};

export default ExternalHomePage;
