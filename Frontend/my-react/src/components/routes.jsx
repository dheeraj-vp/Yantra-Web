
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MiddleSection from '../components/Description';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import ContactUs from '../components/ContactUs'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MiddleSection />} />
      <Route path="/about" element={<About />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact-us" element={<ContactUs />} /> 
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;
