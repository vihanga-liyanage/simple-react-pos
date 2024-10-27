import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Orders.css';

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

  // Delete order function
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Get status button
  const getNextStatus = (status) => {
    switch (status) {
      case -1:
        return { label: 'Mark Ready', nextStatus: 0 };
      case 0:
        return { label: 'Mark Delivered', nextStatus: 1 };
      case 1:
        return { label: 'Mark Pending', nextStatus: -1 };
      default:
        return null;
    }
  };

  // Toggle delivery status function
  const toggleDeliveryStatus = async (orderId, status) => {
    console.log(status);
    try {
      const response = await fetch(`/api/orders/${orderId}/delivery-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delivered: status}),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, delivery_status: status} : order
          )
        );
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-header">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Timestamp</th>
              <th>Products</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
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
                <td className={`status ${order.delivery_status === 1 ? 'delivered' : order.delivery_status === 0 ? 'ready' : 'pending'}`}>
                  {order.delivery_status === 1 ? 'Delivered' : order.delivery_status === 0 ? 'Ready' : 'Pending'}
                </td>
                <td>
                  {(() => {
                    const { label, nextStatus } = getNextStatus(order.delivery_status);
                    return (
                      <button onClick={() => toggleDeliveryStatus(order.id, nextStatus)} className={`status-button`}>
                        {label}
                      </button>
                    );
                  })()}
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this order?")) {
                        deleteOrder(order.id);
                      }
                    }} 
                    style={{ cursor: 'pointer' }} 
                  />
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
