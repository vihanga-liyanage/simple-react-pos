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

// Add products router
const productRouter = require('./routers/products')(connection);
app.use('/api/products', productRouter);

// Add orders router
const orderRouter = require('./routers/orders')(connection);
app.use('/api/orders', orderRouter);

// Special route to get the last order ID
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
