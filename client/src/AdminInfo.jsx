import React from 'react';

export default function AdminInfo() {
  const adminData = {
    name: "John Doe",
    email: "john.doe@example.com",
    accountType: "Administrator"
  };

  return (
    <div className="admin-info">
      <div className="content-header">
        <h1>Admin Information</h1>
      </div>
      <div className="info-card">
        <div className="info-item">
          <label>Person Name:</label>
          <span>{adminData.name}</span>
        </div>
        <div className="info-item">
          <label>Person Email:</label>
          <span>{adminData.email}</span>
        </div>
        <div className="info-item">
          <label>Account Type:</label>
          <span>{adminData.accountType}</span>
        </div>
      </div>
    </div>
  );
}

