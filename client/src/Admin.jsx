import React, { useState } from 'react';
import '../src/stylings/admin.css';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, UserPlus, Users, LogOut, BookPlus, ClipboardList, BookCheck, FileSpreadsheet } from 'lucide-react';
import BookReport from './BookReport';
import AdminInfo from './AdminInfo';
import AddBook from './AddBook';
import BookRequests from './BookRequest';
import AddStudent from './AddStudent';

 function AdminPanel() {
  const [activeSection, setActiveSection] = useState('admin');
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Logged out successfully!');
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'admin':
        return <AdminInfo />;
      case 'add-book':
        return <AddBook />;
      case 'book-report':
        return <BookReport />;
      case 'book-requests':
        return <BookRequests />;
      case 'add-student':
        return <AddStudent />;
      default:
        return (
          <div className="content-header">
            <h1>Select a section from the sidebar</h1>
          </div>
        );
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <nav className="admin-nav">
          <div 
            className={`nav-item ${activeSection === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveSection('admin')}
          >
            <BookPlus className="nav-icon" />
            <span>ADMIN</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'add-book' ? 'active' : ''}`}
            onClick={() => setActiveSection('add-book')}
          >
            <BookOpen className="nav-icon" />
            <span>ADD BOOK</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'book-report' ? 'active' : ''}`}
            onClick={() => setActiveSection('book-report')}
          >
            <FileText className="nav-icon" />
            <span>BOOK REPORT</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'book-requests' ? 'active' : ''}`}
            onClick={() => setActiveSection('book-requests')}
          >
            <ClipboardList className="nav-icon" />
            <span>BOOK REQUESTS</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'add-student' ? 'active' : ''}`}
            onClick={() => setActiveSection('add-student')}
          >
            <UserPlus className="nav-icon" />
            <span>ADD STUDENT</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'student-report' ? 'active' : ''}`}
            onClick={() => setActiveSection('student-report')}
          >
            <Users className="nav-icon" />
            <span>STUDENT REPORT</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'issue-book' ? 'active' : ''}`}
            onClick={() => setActiveSection('issue-book')}
          >
            <BookCheck className="nav-icon" />
            <span>ISSUE BOOK</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'issue-report' ? 'active' : ''}`}
            onClick={() => setActiveSection('issue-report')}
          >
            <FileSpreadsheet className="nav-icon" />
            <span>ISSUE REPORT</span>
          </div>
          <div className="nav-item logout" onClick={handleLogout}>
            <LogOut className="nav-icon" />
            <span>LOGOUT</span>
          </div>
        </nav>
      </aside>

      <main className={`admin-main ${activeSection}`}>
        {renderContent()}
      </main>
    </div>
  );
}
export default AdminPanel

