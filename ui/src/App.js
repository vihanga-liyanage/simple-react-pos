// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Orders from './components/Orders';
import OrderPlacement from './components/OrderPlacement';
import Products from './components/Products';
import SummaryPage from './components/Summary';
import './App.css'; // Import CSS file

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
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={OrderPlacement} />
          <Route path="/orders" component={Orders} />
          <Route path="/products" component={Products} />
          <Route path="/summary" component={SummaryPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
