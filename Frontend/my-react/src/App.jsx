// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/routes';  

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <AppRoutes />  {/* Use AppRoutes here */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
