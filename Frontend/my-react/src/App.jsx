import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MiddleSection from './components/Description';
import About from './components/About';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MiddleSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials/>}/>
          {/* Add other routes here */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;