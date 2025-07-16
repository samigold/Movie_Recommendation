import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual login logic
    console.log('Login attempt:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Login functionality not implemented yet!');
      // navigate('/'); // Redirect to home after successful login
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="auth-links">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
