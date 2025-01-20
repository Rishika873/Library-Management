import React, { useState } from 'react';

export default function BookRequests() {
  const [formData, setFormData] = useState({
    studentName: '',
    bookName: '',
    requestDate: '',
    reason: ''
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
      console.log('Book Request Data:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        studentName: '',
        bookName: '',
        requestDate: '',
        reason: ''
      });
    }, 1500);
  };

  return (
    <div className="book-requests">
      <div className="content-header">
        <h1>Book Requests</h1>
      </div>
      <form className="book-request-form" onSubmit={handleSubmit}>
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
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={formData.bookName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requestDate">Request Date:</label>
          <input
            type="date"
            id="requestDate"
            name="requestDate"
            value={formData.requestDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Request:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT REQUEST'}
        </button>
      </form>
    </div>
  );
}

