const express = require('express');
const { printReceipt } = require('../utils/printer'); // Import the utility function

module.exports = (pool) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { customer_name, total_price, payment_method, timestamp, products } = req.body;
  
    let connection;
  
    try {
      // Get a connection from the pool
      connection = await pool.getConnection();
  
      // Start a transaction
      await connection.beginTransaction();
  
      // Insert into the orders table
      const [orderResult] = await connection.query(
        'INSERT INTO orders (customer_name, total_price, payment_method, timestamp) VALUES (?, ?, ?, ?)',
        [customer_name, total_price, payment_method, timestamp]
      );
  
      const orderId = orderResult.insertId;
  
      // Prepare values for the order_products table
      const values = products.map((product) => [orderId, product.id, product.quantity]);
  
      // Insert into the order_products table
      await connection.query(
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ?',
        [values]
      );
  
      // Commit the transaction
      await connection.commit();
  
      // Print the receipt
      createReceipt(req.body).then(receipt => {
        printReceipt(receipt);
        res.status(201).json({ message: 'Order created successfully' });
      });
  
    } catch (error) {
      console.error('Transaction error:', error);
  
      if (connection) {
        // Rollback the transaction on error
        await connection.rollback();
        connection.release();
      }
  
      res.status(500).json({ message: 'Error creating order' });
    } finally {
      if (connection) {
        // Release the connection back to the pool
        connection.release();
      }
    }
  });

  const createReceipt = async(content) => {

    const { id, customer_name, total_price, payment_method, timestamp, products } = content;
  
    const productInfo = []
    const specialProductInfo = []
    for (const p of products) {
      const product = await getProductById(p.id); // Retrieve the products
      console.log(product);

      if (product.isSpecial) {
        specialProductInfo.push({
          name: product.name,
          price: product.price,
          qty: p.quantity
        });
      } else {
        productInfo.push({
          name: product.name,
          price: product.price,
          qty: p.quantity
        });
      }
    }
    const receipt = {
      title: "Austin Buddhist Vihara\nFood Bazar 2025\n\n",
      orderNumber: id,
      customer_name: customer_name,
      total_price: total_price,
      payment_method: payment_method,
      timestamp: timestamp,
      productInfo: productInfo,
      specialProductInfo: specialProductInfo
    };
  
    return receipt;
  }
  
  const getProductById = async (productId) => {
  
    if (typeof productId !== 'number') {
      throw new Error('Invalid product ID');
    }
  
    const query = `SELECT name, price, isSpecial FROM products WHERE id = ?`;
    
    try {
      const [rows] = await pool.query(query, [productId]); // Parameterized query
      if (rows.length === 0) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return rows[0]; // Return the first (and only) result
    } catch (error) {
      throw new Error(`Error fetching product info: ${error.message}`);
    }
  };

  // GET all orders with product details including quantity, sorted by order number
  router.get('/', async (req, res) => {
    const sql = `
      SELECT orders.id, orders.customer_name, orders.total_price, orders.timestamp, orders.delivery_status, 
            GROUP_CONCAT(products.name SEPARATOR ', ') AS products,
            GROUP_CONCAT(order_products.quantity SEPARATOR ', ') AS quantities
      FROM orders
      JOIN order_products ON orders.id = order_products.order_id
      JOIN products ON order_products.product_id = products.id
      GROUP BY orders.id
      ORDER BY orders.id DESC
    `;
    
    try {
      const [results] = await pool.query(sql); // Execute the query using the connection pool
      res.json(results); // Send the results as a JSON response
    } catch (error) {
      console.error('Error fetching orders:', error); // Log the error
      res.status(500).send('Error fetching orders'); // Send a 500 status with an error message
    }

  });

  router.get('/status', async (req, res) => {
    try {
      const [pendingOrders] = await pool.query('SELECT * FROM orders WHERE delivery_status = -1');
      const [readyOrders] = await pool.query('SELECT * FROM orders WHERE delivery_status = 0');
      
      res.json({ pendingOrders, readyOrders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

  // Route to get order by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM orders WHERE id = ?';

    try {
      const [results] = await pool.query(sql, [id]);
  
      if (results.length === 0) {
        res.status(404).send('Order not found');
        return;
      }
  
      res.json(results[0]);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).send('Error fetching order');
    }
  });

  // Route to update order by ID
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { customer_name, total_price, payment_method, timestamp } = req.body;
    const sql = 'UPDATE orders SET customer_name = ?, total_price = ?, payment_method = ?, timestamp = ? WHERE id = ?';

    try {
      const [result] = await pool.query(sql, [
        customer_name,
        total_price,
        payment_method,
        timestamp,
        id,
      ]);
  
      if (result.affectedRows === 0) {
        res.status(404).send('Order not found');
      } else {
        res.json({ message: 'Order updated successfully' });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).send('Error updating order');
    }
  });

  // Route to delete order by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM orders WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            res.status(404).send('Order not found');
            return;
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).send('Error deleting order');
    }
  });

  // Route to update delivery status by ID
  router.put('/:id/delivery-status', async (req, res) => {
    const { id } = req.params;
    const { delivered } = req.body; // 1 for delivered, 0 for ready, -1 for pending

    const sql = 'UPDATE orders SET delivery_status = ? WHERE id = ?';

    try {
      const [result] = await pool.query(sql, [delivered, id]);

      if (result.affectedRows === 0) {
        res.status(404).send('Order not found');
      } else {
        res.json({ message: 'Delivery status updated successfully' });
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
      res.status(500).send('Error updating delivery status');
    }
  });

  return router;
};
