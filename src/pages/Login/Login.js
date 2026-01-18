import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaMusic } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password, rememberMe);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setForgotMessage('');

    try {
      const result = await forgotPassword(forgotEmail);
      setForgotMessage(result.message);
    } catch (err) {
      setForgotMessage('Error sending reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="bg-pattern"></div>
        <div className="bg-gradient"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="logo">
              <img src="/logo.png" alt="T. Shourie" className="logo-img" />
              <div className="logo-text">
                <span className="logo-main">T. Shourie</span>
                <span className="logo-sub">The School of Music</span>
              </div>
            </div>

            <h1>Admin Panel</h1>
            <p>Manage your gallery, events, classes, achievements and studio images from one central dashboard.</p>

            <div className="branding-features">
              <div className="feature">
                <FaMusic />
                <span>Easy Image Management</span>
              </div>
              <div className="feature">
                <FaMusic />
                <span>Multiple Categories</span>
              </div>
              <div className="feature">
                <FaMusic />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          <div className="floating-notes">
            <span className="note note-1">♪</span>
            <span className="note note-2">♫</span>
            <span className="note note-3">♩</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-container">
          {!showForgotPassword ? (
            <div className="login-form-wrapper">
              <div className="form-header">
                <h2>Welcome Back</h2>
                <p>Please sign in to continue</p>
              </div>

              {error && (
                <div className="error-message">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="btn-login" disabled={loading}>
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="demo-credentials">
                <p>Demo Credentials:</p>
                <span>Username: admin | Password: admin123</span>
              </div>
            </div>
          ) : (
            <div className="forgot-password-wrapper">
              <div className="form-header">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a reset link</p>
              </div>

              {forgotMessage && (
                <div className="success-message">
                  <span>{forgotMessage}</span>
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="forgot-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-login" disabled={loading}>
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-back"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotMessage('');
                  }}
                >
                  Back to Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;