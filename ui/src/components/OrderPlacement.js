// Orders.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import './OrderPlacement.css';

function OrderPlacement() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerName, setCustomerName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    fetchProducts();
    generateOrderNumber();
  }, []);

  useEffect(() => {
    const updatedTotalPrice = selectedProducts.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    setTotalPrice(updatedTotalPrice);
  }, [selectedProducts]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const generateOrderNumber = async () => {
    try {
      const response = await fetch('/api/last-order-id');
      if (response.status === 404) {
        // If the API returns a 404 error, set order number to 1
        setOrderNumber(1);
        return;
      }
      const data = await response.json();
      const lastOrderNumber = data.order_id;
      const nextOrderNumber = lastOrderNumber + 1;
      setOrderNumber(nextOrderNumber);
    } catch (error) {
      console.error('Error fetching last order number:', error);
    }
  };

  const handleProductClick = (clickedProduct) => {
  
    if (!clickedProduct.available) return; // If product is unavailable, do nothing
    const productIndex = selectedProducts.findIndex(product => product.id === clickedProduct.id);
    if (productIndex !== -1) {
      // Product already exists in selectedProducts, update quantity
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex].quantity += 1;
      setSelectedProducts(updatedProducts);
    } else {
      // Product doesn't exist in selectedProducts, add it with quantity 1
      const updatedProducts = [...selectedProducts, { ...clickedProduct, quantity: 1 }];
      setSelectedProducts(updatedProducts);
    }    
    
  };

  const handleRemoveProduct = (productToRemove) => {
    const updatedProducts = selectedProducts.filter((product) => product !== productToRemove);
    setSelectedProducts(updatedProducts);
    const updatedTotalPrice = updatedProducts.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    setTotalPrice(updatedTotalPrice);
  };

  const handlePlaceOrder = async () => {
    try {
      // Generate current local timestamp in the format "YYYY-MM-DD HH:MM:SS"
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
      // Prepare order data
      const orderData = {
        id: orderNumber,
        customer_name: customerName,
        total_price: totalPrice,
        payment_method: paymentMethod,
        timestamp: timestamp,
        products: selectedProducts.map(product => ({ id: product.id, quantity: product.quantity }))
      };
  
      // Send POST request to create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        // Order created successfully
        console.log('Order placed successfully');
        // Reset selected products, total price, and payment method after placing order
        setSelectedProducts([]);
        setTotalPrice(0);
        setPaymentMethod('card');
        setCustomerName('');
        generateOrderNumber(); // Generate a new order number for the next order
      } else {
        // Error occurred while creating order
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };  

  return (
    <div className="container">
      <h2>Order Placing</h2>
      <div className="order-info">
        <div className="order-number">Order Number: {orderNumber}</div>
      </div>
      <div className="products">
        <h3>Available Products</h3>
        {/* Render available products with clickable functionality */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className={`product ${!product.available ? 'unavailable' : ''}`} onClick={() => handleProductClick(product)}>
              {product.name} - ${product.price}
              {!product.available && <span className="unavailable-tag"></span>}
            </div>
          ))}
        </div>
      </div>
      <div className="selected-products">
        <h3>Selected Products</h3>
        {/* Render selected products in a table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td><FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveProduct(product)} style={{ cursor: 'pointer' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">Total Price: ${totalPrice}</div>
        <div className="payment-method">
          Payment Method: 
          <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
            <FontAwesomeIcon icon={faCreditCard} /> Card
          </div>
          <div className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
            <FontAwesomeIcon icon={faMoneyBillWave} /> Cash
          </div>
        </div>
        <div className="customer-name">
          <label htmlFor="customerName">Customer Name: </label>
          <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default OrderPlacement;
