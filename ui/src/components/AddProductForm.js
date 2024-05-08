// AddProductForm.js

import React, { useState } from 'react';
import './Products.css'; 

function AddProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [available, setAvailable] = useState(true); // Default available to true
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Please fill out all required fields.');
      return;
    }
    const newProduct = {
      name: name,
      price: parseFloat(price),
      image_url: image_url || null, // Set image_url to null if not provided
      available: available
    };
    onAdd(newProduct);
    setName('');
    setPrice('');
    setImageUrl('');
    setAvailable(true); // Reset available to true
    setError('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">Name:</label>
      <input
        className="form-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="form-label">Price:</label>
      <input
        className="form-input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label className="form-label">Image URL (Optional):</label>
      <input
        className="form-input"
        type="text"
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label className="form-label">Availability:</label>
      <select
        className="form-input"
        value={available}
        onChange={(e) => setAvailable(e.target.value === 'true')}
      >
        <option value={true}>Available</option>
        <option value={false}>Unavailable</option>
      </select>
      {error && <p className="error-message">{error}</p>}
      <button className="form-button" type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
