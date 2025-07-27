import React, { useEffect, useState } from 'react';

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const filteredProducts = showAvailableOnly
    ? products.filter((p) => p.available)
    : products;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Menu</h1>
      <label style={{ display: 'block', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
          style={{ marginRight: '0.5rem' }}
        />
        Show Available Products Only
      </label>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0,0,0,0.1)', fontSize: '1.5rem'}}>
        <thead style={{ backgroundColor: '#f8f8f8' }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '12px',
  verticalAlign: 'middle',
};

export default MenuPage;
