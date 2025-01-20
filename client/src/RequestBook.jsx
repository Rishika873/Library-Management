import React, { useState } from 'react';
import "../src/stylings/requestbook.css"


const sampleBooks = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-17%20210539-n8Xi87FexNsODcNuduIf46taEOMFI4.png",
    name: "Scott Gallagher",
    author: "no idea",
    branch: "it",
    price: 20
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-17%20210539-n8Xi87FexNsODcNuduIf46taEOMFI4.png",
    name: "Ferris Mclaughlin",
    author: "Est voluptates offi",
    branch: "electrical",
    price: 157
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-17%20210539-n8Xi87FexNsODcNuduIf46taEOMFI4.png",
    name: "harry",
    author: "Ut dolorem culpa ex",
    branch: "it",
    price: 3
  }
];

export default function RequestBook() {
  const [requestedBooks, setRequestedBooks] = useState(new Set());
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequest = (bookId) => {
    setIsRequesting(true);
    setTimeout(() => {
      setRequestedBooks(prev => {
        const newSet = new Set(prev);
        newSet.add(bookId);
        return newSet;
      });
      setIsRequesting(false);
    }, 1000);
  };

  return (
    <div className="request-book-container">
      <div className="book-table">
        <div className="table-header">
          <div className="header-cell">Image</div>
          <div className="header-cell">Book Name</div>
          <div className="header-cell">Book Author</div>
          <div className="header-cell">Branch</div>
          <div className="header-cell">Price</div>
          <div className="header-cell">Request Book</div>
        </div>
        <div className="table-body">
          {sampleBooks.map((book) => (
            <div key={book.id} className="table-row">
              <div className="table-cell">
                <div className="book-image">
                  <img src="/placeholder.svg" alt={book.name} width={50} height={50} />
                </div>
              </div>
              <div className="table-cell">{book.name}</div>
              <div className="table-cell">{book.author}</div>
              <div className="table-cell">{book.branch}</div>
              <div className="table-cell">${book.price}</div>
              <div className="table-cell">
                <button
                  className={`request-button ${requestedBooks.has(book.id) ? 'requested' : ''}`}
                  onClick={() => handleRequest(book.id)}
                  disabled={requestedBooks.has(book.id) || isRequesting}
                >
                  {requestedBooks.has(book.id) ? 'Requested' : 'Request Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

