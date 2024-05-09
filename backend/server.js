// server.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001; // Choose any port you prefer

app.use(express.json())

const pool = mysql.createPool({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL user
  password: 'Admin@123', // Your MySQL password
  database: 'react_pos', // Your MySQL database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Add products router
const productRouter = require('./routers/products')(pool);
app.use('/api/products', productRouter);

// Add orders router
const orderRouter = require('./routers/orders')(pool);
app.use('/api/orders', orderRouter);

// Add summary router
const summaryRouter = require('./routers/summary')(pool);
app.use('/api/summary', summaryRouter);

// Special route to get the last order ID
app.get('/api/last-order-id', async (req, res) => {
  const sql = 'SELECT MAX(id) AS last_order_id FROM orders';
  try {
    const [results] = await pool.query(sql);
    const lastOrderId = results[0].last_order_id || 0;
    res.json({ order_id: lastOrderId });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send('Error fetching order');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
