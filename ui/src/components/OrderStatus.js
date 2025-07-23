import React, { useEffect, useState } from 'react';
import './OrderStatus.css';

const OrderStatus = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders/status');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPendingOrders(data.pendingOrders);
      setReadyOrders(data.readyOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch
    const intervalId = setInterval(fetchOrders, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="order-status-container">
      <h1>Order Status</h1>
      <div className="orders-section">
        <h2>Pending Orders</h2>
        <div className="orders-tiles">
          {pendingOrders.map((order) => (
            <div key={order.id} className="order-tile pending">
              <p>{order.id}</p>
              {order.customer_name && <p className='customer-name'>{order.customer_name}</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="orders-section">
        <h2>Ready Orders</h2>
        <div className="orders-tiles">
          {readyOrders.map((order) => (
            <div key={order.id} className="order-tile ready">
              <p>{order.id}</p>
              {order.customer_name && <p className='customer-name'>{order.customer_name}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
