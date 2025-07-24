const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // Get all products
  router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM products';

    try {
      const [results] = await pool.query(sql); // Use the connection pool
      res.json(results); // Send the results as a JSON response
    } catch (err) {
      console.error('Error fetching products:', err); // Log the error
      res.status(500).send('Error fetching products'); // Return 500 status with an error message
    }
  });

  // Add a product
  router.post('/', async (req, res) => {
    const { name, price, imageUrl = null, available = true, isSpecial = false } = req.body;

    const sql = 'INSERT INTO products (name, price, image_url, available, isSpecial) VALUES (?, ?, ?, ?, ?)';

    try {
      const [result] = await pool.query(sql, [name, price, imageUrl, available, isSpecial]); // Execute the query
      res.status(201).json({ message: 'Product added successfully', productId: result.insertId }); // Return success message with the inserted ID
    } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).send('Error adding product');
    }
  });

  // Get a product by ID
  router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';

    try {
      const [results] = await pool.query(sql, [productId]); // Use the connection pool with parameterized query

      if (results.length === 0) {
        res.status(404).send('Product not found'); // If no product is found, return 404
        return;
      }

      res.json(results[0]); // Return the first (and presumably only) result
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Error fetching product');
    }
  });

  // Update a product by ID
  router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, imageUrl = null, available = true, isSpecial = false } = req.body;

    const sql = 'UPDATE products SET name = ?, price = ?, image_url = ?, available = ?, isSpecial = ? WHERE id = ?';

    try {
      const [result] = await pool.query(sql, [name, price, imageUrl, available, isSpecial, productId]); // Execute the update query

      if (result.affectedRows === 0) {
        res.status(404).send('Product not found'); // If no product is updated, return 404
        return;
      }

      res.status(200).json({ message: 'Product updated successfully' }); // Return success message
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Error updating product');
    }
  });

  // Delete a product by ID
  router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';

    try {
      const [result] = await pool.query(sql, [productId]); // Execute the delete query

      if (result.affectedRows === 0) {
        res.status(404).send('Product not found'); // If no product is deleted, return 404
        return;
      }

      res.status(200).json({ message: 'Product deleted successfully' }); // Return success message
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
    }
  });

  return router;
};
