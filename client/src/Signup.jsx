import React, { useState } from "react";
import "../src/stylings/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  return (
    <div className="login-container">
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-content">
            <h1 className="login-title">Welcome</h1>
            <Tabs defaultValue="student">
              <TabsList>
                <TabsTrigger value="student">
                  <BookOpenIcon />
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <ShieldCheckIcon />
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <LoginForm userType="Student" />
              </TabsContent>
              <TabsContent value="admin">
                <LoginForm userType="Admin" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ userType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Added phone field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", { name, email, password, phone }); // Log data being sent
    axios
      .post("http://localhost:3001/register", { name, email, password, phone })
      .then((result) => {
        setSuccess("Registration successful!");
        setError(""); // Clear any previous errors
        navigate("/login")
      })
      .catch((err) => {
        setError(err.response?.data?.error || "An error occurred. Please try again.");
        setSuccess(""); // Clear any previous success messages
      });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="form-group">
        <label htmlFor={`${userType.toLowerCase()}-name`}>Name</label>
        <input
          id={`${userType.toLowerCase()}-name`}
          placeholder={`${userType} Name`}
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`${userType.toLowerCase()}-email`}>Email</label>
        <input
          id={`${userType.toLowerCase()}-email`}
          placeholder={`${userType} Email`}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`${userType.toLowerCase()}-phone`}>Phone</label>
        <input
          id={`${userType.toLowerCase()}-phone`}
          placeholder={`${userType} Phone`}
          type="tel"
          pattern="^\+?[0-9]{10,15}$"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`${userType.toLowerCase()}-password`}>Password</label>
        <input
          id={`${userType.toLowerCase()}-password`}
          placeholder={`${userType} Password`}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Register
      </button>

      <p>Already have an account?</p>
      <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
        Login
      </Link>
    </form>
  );
}

function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <div className="tabs">{React.Children.map(children, child => React.cloneElement(child, { activeTab, setActiveTab }))}</div>;
}

function TabsList({ children, activeTab, setActiveTab }) {
  return <div className="tabs-list">{React.Children.map(children, child => React.cloneElement(child, { isActive: child.props.value === activeTab, onClick: () => setActiveTab(child.props.value) }))}</div>;
}

function TabsTrigger({ value, children, isActive, onClick }) {
  return (
    <button className={`tab-trigger ${isActive ? 'active' : ''} ${value}`} onClick={onClick}>
      {children}
    </button>
  );
}

function TabsContent({ value, children, activeTab }) {
  if (value !== activeTab) return null;
  return <div className="tab-content">{children}</div>;
}

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4"></path>
    </svg>
  );
}

export default Signup;
