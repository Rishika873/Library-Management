import React, { useState } from 'react';
import '../src/stylings/bookreport.css';

const sampleIssueRecords = [
  {
    id: 1,
    name: "salman",
    bookName: "Rich daddy poor dady",
    issueDate: "30/03/2021",
    returnDate: "02/04/2021",
    fine: 1800,
    isReturned: false
  },
  {
    id: 2,
    name: "salman",
    bookName: "Scott Gallagher",
    issueDate: "30/03/2021",
    returnDate: "06/04/2021",
    fine: 1800,
    isReturned: false
  },
  {
    id: 3,
    name: "salman",
    bookName: "Scott Gallagher",
    issueDate: "01/04/2021",
    returnDate: "08/04/2021",
    fine: 0,
    isReturned: false
  },
  {
    id: 4,
    name: "salman",
    bookName: "harry",
    issueDate: "01/04/2021",
    returnDate: "08/04/2021",
    fine: 0,
    isReturned: false
  },
  {
    id: 5,
    name: "salman",
    bookName: "Ferris Mclaughlin",
    issueDate: "02/04/2021",
    returnDate: "09/04/2021",
    fine: 0,
    isReturned: false
  },
  {
    id: 6,
    name: "salman",
    bookName: "harry",
    issueDate: "03/04/2021",
    returnDate: "04/04/2021",
    fine: 0,
    isReturned: false
  }
];

export default function BookReport() {
  const [records, setRecords] = useState(sampleIssueRecords);
  const [returningId, setReturningId] = useState(null);

  const handleReturn = (id) => {
    setReturningId(id);
    // Simulate return process
    setTimeout(() => {
      setRecords(prevRecords =>
        prevRecords.map(record =>
          record.id === id ? { ...record, isReturned: true } : record
        )
      );
      setReturningId(null);
    }, 1000);
  };

  return (
    <div className="book-report-container">
      <div className="issue-record-header">
        <h2>ISSUE RECORD</h2>
      </div>
      <div className="book-report-table">
        <div className="table-header">
          <div className="header-cell">Name</div>
          <div className="header-cell">Book Name</div>
          <div className="header-cell">Issue Date</div>
          <div className="header-cell">Return Date</div>
          <div className="header-cell">Fine</div>
          <div className="header-cell">Return</div>
        </div>
        <div className="table-body">
          {records.map((record) => (
            <div key={record.id} className={`table-row ${record.isReturned ? 'returned' : ''}`}>
              <div className="table-cell" data-label="Name">{record.name}</div>
              <div className="table-cell" data-label="Book Name">{record.bookName}</div>
              <div className="table-cell" data-label="Issue Date">{record.issueDate}</div>
              <div className="table-cell" data-label="Return Date">{record.returnDate}</div>
              <div className="table-cell" data-label="Fine">{record.fine}</div>
              <div className="table-cell" data-label="Return">
                <button
                  className={`return-button ${record.isReturned ? 'returned' : ''}`}
                  onClick={() => handleReturn(record.id)}
                  disabled={record.isReturned || returningId === record.id}
                >
                  {record.isReturned ? 'Returned' : 
                   returningId === record.id ? 'Returning...' : 'Return'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

