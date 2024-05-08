const express = require('express');
const { printReceipt } = require('../utils/printer'); // Import the utility function

module.exports = (connection) => {
  const router = express.Router();

  // Route to create a new order
  router.post('/', (req, res) => {
    const { customer_name, total_price, payment_method, timestamp, products } = req.body;

    // Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        res.status(500).send('Error starting transaction');
        return;
      }

      // Insert order details into the orders table
      connection.query(
        'INSERT INTO orders (customer_name, total_price, payment_method, timestamp) VALUES (?, ?, ?, ?)',
        [customer_name, total_price, payment_method, timestamp],
        (err, orderResult) => {
          if (err) {
            console.error('Error inserting order:', err);
            connection.rollback(() => {
              res.status(500).send('Error inserting order');
            });
            return;
          }
          const orderId = orderResult.insertId;

          // Insert product details into the order_products table
          const values = products.map(product => [orderId, product.id, product.quantity]);
          connection.query(
            'INSERT INTO order_products (order_id, product_id, quantity) VALUES ?',
            [values],
            (err) => {
              if (err) {
                console.error('Error inserting order products:', err);
                connection.rollback(() => {
                  res.status(500).send('Error inserting order products');
                });
                return;
              }

              // Commit the transaction
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing transaction:', err);
                  connection.rollback(() => {
                    res.status(500).send('Error committing transaction');
                  });
                  return;
                }

                // Print the receipt
                printReceipt(total_price);

                res.status(201).json({ message: 'Order created successfully' });
              });
            }
          );
        }
      );
    });
  });

  // GET all orders with product details including quantity, sorted by order number
  router.get('/', (req, res) => {
    const sql = `
      SELECT orders.id, orders.customer_name, orders.total_price, orders.timestamp, 
            GROUP_CONCAT(products.name SEPARATOR ', ') AS products,
            GROUP_CONCAT(order_products.quantity SEPARATOR ', ') AS quantities
      FROM orders
      JOIN order_products ON orders.id = order_products.order_id
      JOIN products ON order_products.product_id = products.id
      GROUP BY orders.id
      ORDER BY orders.id DESC
    `;
    
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders');
        return;
      }
      res.json(results);
    });
  });

  // Route to get order by ID
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM orders WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error fetching order:', err);
        res.status(500).send('Error fetching order');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Order not found');
        return;
      }
      res.json(results[0]);
    });
  });

  // Route to update order by ID
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { customer_name, total_price, payment_method, timestamp } = req.body;
    const sql = 'UPDATE orders SET customer_name = ?, total_price = ?, payment_method = ?, timestamp = ? WHERE id = ?';
    connection.query(sql, [customer_name, total_price, payment_method, timestamp, id], (err, result) => {
      if (err) {
        console.error('Error updating order:', err);
        res.status(500).send('Error updating order');
        return;
      }
      res.json({ message: 'Order updated successfully' });
    });
  });

  // Route to delete order by ID
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM orders WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        res.status(500).send('Error deleting order');
        return;
      }
      res.json({ message: 'Order deleted successfully' });
    });
  });

  return router;
};
