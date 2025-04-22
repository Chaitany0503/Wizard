import React, { useState } from 'react';
import { FaCode, FaVideo, FaUserPlus, FaSignInAlt, FaMagic, FaUsers, FaLightbulb } from 'react-icons/fa';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import Code_img from '../assets/Code_img.jpg';
import Meet_img from '../assets/Meet_img.png';


const MainPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
    const navigate = useNavigate();
  // Mock login function
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  // Mock register function
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <FaMagic className="logo-icon" />
          <span className="brand-name">Code Wizard</span>
        </div>
        <div className="navbar-actions">
          {!isLoggedIn ? (
            <>
              <button className="btn login-btn" onClick={() => navigate("/login")}>
                <FaSignInAlt /> Login
              </button>
              <button className="btn register-btn" onClick={() => navigate("/Register")}>
                <FaUserPlus /> Register
              </button>
            </>
          ) : (
            <button className="btn logout-btn" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {!isLoggedIn && (
        <div className="hero-section">
          <div className="hero-content">
            <h1>Collaborate. Code. Create.</h1>
            <p>
              The ultimate platform for real-time collaborative coding with integrated video
              conferencing. Built by students, for students.
            </p>
            <div className="hero-buttons">
              <button className="btn primary-btn" onClick={() => navigate("/Register")}>
                Get Started
              </button>
              <button className="btn secondary-btn">Learn More</button>
            </div>
          </div>
          <div className="hero-image">
          <div className="mockup-editor"><img src={Meet_img} width={"415px"} height={"280px"} style={{borderRadius:'3%'}}></img></div> {/*  */}
          <div className="mockup-zoom"><img src={Code_img} width={"400px"} height={"250px"} style={{borderRadius:'3%'}}></img></div>
          </div>
        </div>
      )}

      {/* Main Content - Only shown when logged in */}
      {isLoggedIn && (
        <div className="main-content">
          {/* Toolbar */}
          <div className="toolbar">
            <button
              className={`toolbar-btn ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              <FaCode /> Code Editor
            </button>
            <button
              className={`toolbar-btn ${activeTab === 'zoom' ? 'active' : ''}`}
              onClick={() => setActiveTab('zoom')}
            >
              <FaVideo /> Video Call
            </button>
          </div>

          
        </div>
      )}

      {/* Features Section - Shown when not logged in */}
      {!isLoggedIn && (
        <div className="features-section">
          <h2>Why Choose Code Wizard?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaLightbulb className="feature-icon" />
              <h3>Live Coding Help</h3>
              <p>Get real-time guidance or feedback on your code during video calls.</p>
            </div>
            <div className="feature-card">
              <FaVideo className="feature-icon" />
              <h3>Integrated Video Calls</h3>
              <p>Discuss your code face-to-face without leaving the platform.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Team Management</h3>
              <p>Easily manage your project teams and permissions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Login to Code Wizard</h2>
              <button className="close-btn" onClick={() => setShowLogin(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" required />
              </div>
              <button type="submit" className="btn primary-btn">
                Login
              </button>
            </form>
            <div className="modal-footer">
              <p>
                Don't have an account?{' '}
                <button className="text-btn" onClick={() => { setShowLogin(false); setShowRegister(true); }}>
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Join Code Wizard</h2>
              <button className="close-btn" onClick={() => setShowRegister(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" required />
              </div>
              <button type="submit" className="btn primary-btn">
                Create Account
              </button>
            </form>
            <div className="modal-footer">
              <p>
                Already have an account?{' '}
                <button className="text-btn" onClick={() => { setShowRegister(false); setShowLogin(true); }}>
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;