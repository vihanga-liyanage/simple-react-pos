const express = require('express');
const { printReceipt } = require('../utils/printer'); // Import the utility function

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { start, end } = req.query;
  
    try {
      const [orderCount] = await pool.query(
        'SELECT COUNT(*) AS count FROM orders WHERE timestamp BETWEEN ? AND ?',
        [start, end]
      );
  
      const [salesTotal] = await pool.query(
        'SELECT SUM(total_price) AS total FROM orders WHERE timestamp BETWEEN ? AND ?',
        [start, end]
      );
  
      const [cardTotal] = await pool.query(
        'SELECT SUM(total_price) AS total FROM orders WHERE payment_method = "card" AND timestamp BETWEEN ? AND ?',
        [start, end]
      );
  
      const [cashTotal] = await pool.query(
        'SELECT SUM(total_price) AS total FROM orders WHERE payment_method = "cash" AND timestamp BETWEEN ? AND ?',
        [start, end]
      );
  
      const [productSales] = await pool.query(
        `SELECT products.name, SUM(order_products.quantity) AS salesTotal, 
         SUM(order_products.quantity * products.price) AS revenue
         FROM order_products 
         JOIN products ON order_products.product_id = products.id 
         JOIN orders ON order_products.order_id = orders.id 
         WHERE orders.timestamp BETWEEN ? AND ? 
         GROUP BY products.name`,
        [start, end]
      );
      
      // Pending items query based on delivery status
      const [pendingProductQuantities] = await pool.query(
        `SELECT p.name, SUM(op.quantity) AS pendingQuantity
         FROM order_products op
         JOIN products p ON op.product_id = p.id
         JOIN orders o ON op.order_id = o.id
         WHERE o.delivery_status = -1 AND o.timestamp BETWEEN ? AND ?
         GROUP BY p.name`,
        [start, end]
      );

      res.json({
        orderCount: orderCount[0].count,
        salesTotal: salesTotal[0].total,
        cardTotal: cardTotal[0].total,
        cashTotal: cashTotal[0].total,
        productSales,
        pendingProductQuantities,
      });
    } catch (error) {
      console.error('Error fetching summary:', error);
      res.status(500).json({ message: 'Error fetching summary' });
    }
  });

  return router;
};
