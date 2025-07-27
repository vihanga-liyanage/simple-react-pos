// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Orders from './components/Orders';
import OrderPlacement from './components/OrderPlacement';
import Products from './components/Products';
import SummaryPage from './components/Summary';
import OrderStatusPage from './components/OrderStatus';
import './App.css'; // Import CSS file
import MenuPage from './components/Menu';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar"> {/* Navigation bar */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={OrderPlacement} />
          <Route path="/orders" component={Orders} />
          <Route path="/products" component={Products} />
          <Route path="/summary" component={SummaryPage} />
          <Route path="/status" component={OrderStatusPage} />
          <Route path="/menu" component={MenuPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
