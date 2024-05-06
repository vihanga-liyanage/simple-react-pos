// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001; // Choose any port you prefer

app.use(express.json())

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL host if it's not running locally
  user: 'root', // Change this to your MySQL username
  password: 'Admin@123', // Change this to your MySQL password
  database: 'react_pos' // Change this to your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Get all products from the database
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }
      res.json(results);
    });
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    connection.query(sql, [productId], (err, result) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Product not found');
        return;
      }
      res.json(result[0]);
    });
});
  
// Add a product to the database
app.post('/api/products', (req, res) => {

    console.log(req.body);
    const { name, price, imageUrl, available } = req.body;
  
    // Set default values if imageUrl or available are not provided
    const imageUrlToUse = imageUrl || null;
    const availableToUse = available !== undefined ? available : true;
  
    const sql = 'INSERT INTO products (name, price, image_url, available) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, price, imageUrlToUse, availableToUse], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Error adding product');
        return;
      }
      console.log('Product added successfully');
      res.status(200).send('Product added successfully');
    });
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, imageUrl, available = true } = req.body;
  
    const sql = 'UPDATE products SET name = ?, price = ?, image_url = ?, available = ? WHERE id = ?';
    connection.query(sql, [name, price, imageUrl, available, productId], (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Error updating product');
        return;
      }
      res.status(200).send('Product updated successfully');
    });
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
    connection.query(sql, [productId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
        return;
      }
      res.status(200).send('Product deleted successfully');
    });
});
  
// Route to create a new order
app.post('/api/orders', (req, res) => {
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
              res.status(201).json({ message: 'Order created successfully' });
            });
          }
        );
      }
    );
  });
});

// GET all orders with product details including quantity, sorted by order number
app.get('/api/orders', (req, res) => {
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
app.get('/api/orders/:id', (req, res) => {
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
app.put('/api/orders/:id', (req, res) => {
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
app.delete('/api/orders/:id', (req, res) => {
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

// Route to get the last order ID
app.get('/api/last-order-id', (req, res) => {
  const sql = 'SELECT MAX(id) AS last_order_id FROM orders';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching last order ID:', err);
      res.status(500).send('Error fetching last order ID');
      return;
    }
    const lastOrderId = result[0].last_order_id || 0;
    res.json({ order_id: lastOrderId });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
