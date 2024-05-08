// Orders.js

import React, { useState, useEffect } from 'react';
import './Orders.css'; // Import CSS file

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="orders-container"> {/* Apply container class */}
      <h2 className="orders-header">Orders</h2> {/* Apply header class */}
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table"> {/* Apply table class */}
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Timestamp</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>${order.total_price}</td>
                <td>{order.timestamp}</td>
                <td>
                  <ul>
                    {order.products.split(',').map((productName, idx) => (
                      <li key={idx}>{productName} -&gt; {order.quantities.split(',')[idx]}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
