import React, { useEffect, useState } from 'react';

const AddProductForm = ({ initialProduct, onSubmit, mode = 'add' }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    available: true,
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct); // Pre-fill form if editing
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({
      name: '',
      price: '',
      imageUrl: '',
      available: true,
    });
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <div className="form-row"> {/* Label and input on the same line */}
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row"> {/* Label and input on the same line */}
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row"> {/* Label and input on the same line */}
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className="form-row"> {/* Label and checkbox on the same line */}
        <label htmlFor="available">Available:</label>
        <input
          type="checkbox"
          name="available"
          checked={product.available}
          onChange={handleChange}
        />
      </div>

      <div className="button-row">
        <button type="submit">
          {mode === 'edit' ? 'Update Product' : 'Add Product'}
        </button>
      </div>
      
    </form>
  );
};

export default AddProductForm;
