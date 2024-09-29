import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MiddleSection from './components/Description';
import About from './components/About';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';  // Import ContactUs component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MiddleSection />} />
          <Route path="/About" element={<About />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/ContactUs" element={<ContactUs />} /> {/* Add the ContactUs route */}
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
