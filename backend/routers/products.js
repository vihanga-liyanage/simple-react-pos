const express = require('express');

module.exports = (connection) => {
  const router = express.Router();

  // Get all products from the database
  router.get('/', (req, res) => {
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

  // Add a product to the database
  router.post('/', (req, res) => {

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

  // Get a product by ID
  router.get('/:id', (req, res) => {
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
  
  // Update a product by ID
  router.put('/:id', (req, res) => {
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
  router.delete('/:id', (req, res) => {
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

  return router;
};
