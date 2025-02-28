
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
      <Route path="/stocks" element={<About />} />
      <Route path="/ipos" element={<Testimonials />} />
      <Route path="/insights" element={<ContactUs />} /> 
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;
