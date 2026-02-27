import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import ProductCatalog from './components/ProductCatalog';
import HTTPFlow from './components/HTTPFlow';
import SSLManagement from './components/SSLManagement';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
        <Link to="/catalog" style={{ marginRight: '1rem' }}>Catálogo</Link>
        <Link to="/admin" style={{ marginRight: '1rem' }}>Admin</Link>
        <Link to="/flow" style={{ marginRight: '1rem' }}>HTTP Flow</Link>
        <Link to="/ssl" style={{ marginRight: '1rem' }}>SSL</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/flow" element={<HTTPFlow />} />
        <Route path="/ssl" element={<SSLManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
