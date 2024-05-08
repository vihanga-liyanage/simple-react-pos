// EditProductForm.js

import React, { useState, useEffect } from 'react';

function EditProductForm({ product, onUpdate, onCancel }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [image_url, setImageUrl] = useState(product.image_url || ''); // Set default image_url to empty string if not provided
  const [available, setAvailability] = useState(product.available);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(product.name);
    setPrice(String(product.price));
    setImageUrl(product.image_url || ''); // Set default image_url to empty string if not provided
    setAvailability(product.available);
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Please fill out all required fields.');
      return;
    }
    const updatedProduct = {
      ...product,
      name: name,
      price: parseFloat(price),
      image_url: image_url || null, // Set image_url to null if not provided
      available: available
    };
    onUpdate(updatedProduct);
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
        onChange={(e) => setAvailability(e.target.value === 'true')}
      >
        <option value={true}>Available</option>
        <option value={false}>Unavailable</option>
      </select>
      {error && <p className="error-message">{error}</p>}
      <button className="form-button" type="submit">Update Product</button>
      <button className="form-button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditProductForm;
