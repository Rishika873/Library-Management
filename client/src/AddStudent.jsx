import React, { useState } from 'react';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    contactNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Student Data:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        studentName: '',
        email: '',
        studentId: '',
        department: '',
        year: '',
        contactNumber: ''
      });
    }, 1500);
  };

  return (
    <div className="add-student">
      <div className="content-header">
        <h1>Add New Student</h1>
      </div>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Civil">Civil</option>
            <option value="EC">EC</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Year of Study:</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'ADD STUDENT'}
        </button>
      </form>
    </div>
  );
}

