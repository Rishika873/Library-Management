import React, { useState } from 'react';

export default function AddBook() {
  const [formData, setFormData] = useState({
    bookName: '',
    detail: '',
    author: '',
    publication: '',
    branch: '',
    price: '',
    quantity: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form Data:', formData);
      console.log('Selected File:', selectedFile);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        bookName: '',
        detail: '',
        author: '',
        publication: '',
        branch: '',
        price: '',
        quantity: ''
      });
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <div className="add-book">
      <div className="content-header">
        <h1>Add New Book</h1>
      </div>
      <form className="add-book-form" onSubmit={handleSubmit}>
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
          <label htmlFor="detail">Detail:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication">Publication:</label>
          <input
            type="text"
            id="publication"
            name="publication"
            value={formData.publication}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="branch"
                value="it"
                checked={formData.branch === 'it'}
                onChange={handleInputChange}
              />
              <span>IT</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="branch"
                value="civil"
                checked={formData.branch === 'civil'}
                onChange={handleInputChange}
              />
              <span>Civil</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="branch"
                value="ec"
                checked={formData.branch === 'ec'}
                onChange={handleInputChange}
              />
              <span>EC</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="branch"
                value="electrical"
                checked={formData.branch === 'electrical'}
                onChange={handleInputChange}
              />
              <span>Electrical</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bookPhoto">Book Photo:</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="bookPhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="file-input-label">
              {selectedFile ? selectedFile.name : 'No file chosen'}
            </div>
            <button type="button" className="choose-file-btn">
              Choose File
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}

