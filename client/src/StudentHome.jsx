import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../src/stylings/student.css";
import { BookOpen, User, LogOut, FileText, Home } from 'lucide-react';
import RequestBook from './RequestBook';
import BookReport from './BookReport';

function StudentHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Initialize as null to handle loading state
  const [activeMenu, setActiveMenu] = useState('welcome');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        navigate("/login"); // Redirect to login if no token exists
        return;
      }

      try {
        console.log("Token from localStorage:", token); // Debugging

        // Send token as Bearer token in the Authorization header
        const response = await axios.get("http://localhost:3001/tostudent", {
          headers: {
            Authorization: `Bearer ${token}`, // Adding Bearer token to request
          },
        });

        setUserData(response.data); // Assuming response.data contains name, email, role
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 403) {
          alert("Session expired or invalid token. Please log in again.");
          localStorage.removeItem("jwtToken");
          navigate("/login");
        }
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoading(true);
    setTimeout(() => {
      alert('Logged out successfully!');
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'request':
        return <RequestBook />;
      case 'account':
        return (
          <div className="user-info">
            <div className="info-card">
              <div className="info-item">
                <label>Person Name:</label>
                <span className="info-value">{userData?.name || 'N/A'}</span> {/* Safe access to userData */}
              </div>
              <div className="info-item">
                <label>Person Email:</label>
                <span className="info-value">{userData?.email || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Account Type:</label>
                <span className="info-value">{userData?.role || 'N/A'}</span> {/* Safe access */}
              </div>
            </div>
          </div>
        );
      case 'report':
        return <BookReport />;
      case 'welcome':
      default:
        return <div className="welcome-message">Welcome to the Library Management System</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav className="nav-menu">
          <button className={`nav-item ${activeMenu === 'welcome' ? 'active' : ''}`} onClick={() => handleMenuClick('welcome')}>
            <Home className="nav-icon" />
            <span>Welcome</span>
          </button>

          <button className={`nav-item ${activeMenu === 'account' ? 'active' : ''}`} onClick={() => handleMenuClick('account')}>
            <User className="nav-icon" />
            <span>My Account</span>
          </button>

          <button className={`nav-item ${activeMenu === 'request' ? 'active' : ''}`} onClick={() => handleMenuClick('request')}>
            <BookOpen className="nav-icon" />
            <span>Request Book</span>
          </button>

          <button className={`nav-item ${activeMenu === 'report' ? 'active' : ''}`} onClick={() => handleMenuClick('report')}>
            <FileText className="nav-icon" />
            <span>Book Report</span>
          </button>

          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut className="nav-icon" />
            <span>LOGOUT</span>
          </button>
        </nav>
      </div>

      <main className="main-content">
        <header className="content-header">
          <h1>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h1>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default StudentHome;
