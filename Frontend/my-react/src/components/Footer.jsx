import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='bg-gray-900 text-white py-8'>
      <div className='container mx-auto flex flex-col items-center justify-between md:flex-row'>
        
        {/* Footer Branding */}
        <div className='mb-6 md:mb-0'>
          <h1 className='text-3xl font-bold text-[#00FFFF] italic'>SiftIn</h1>
          <p className='text-sm mt-2'>
            Elegant Email Filtering, Your Way.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className='flex space-x-6 mb-6 md:mb-0 text-lg'>
          <li className='hover:text-cyan-500 cursor-pointer' onClick={() => navigate('/')}>Home</li>
          <li className='hover:text-cyan-500 cursor-pointer' onClick={() => navigate('/about')}>About</li>
          <li className='hover:text-cyan-500 cursor-pointer' onClick={() => navigate('/testimonials')}>Testimonials</li>
          <li className='hover:text-cyan-500 cursor-pointer' onClick={() => navigate('/contact-us')}>Contact</li>
        </ul>

        {/* Social Media Links */}
        <div className='flex space-x-6'>
          <a href='#' className='hover:text-cyan-500 transition duration-300 transform hover:scale-125'>
            <FaFacebookF size={25} /> {/* Increased size */}
          </a>
          <a href='#' className='hover:text-cyan-500 transition duration-300 transform hover:scale-125'>
            <FaTwitter size={25} /> {/* Increased size */}
          </a>
          <a href='#' className='hover:text-cyan-500 transition duration-300 transform hover:scale-125'>
            <FaLinkedinIn size={25} /> {/* Increased size */}
          </a>
          <a href='#' className='hover:text-cyan-500 transition duration-300 transform hover:scale-125'>
            <FaGithub size={25} /> {/* Increased size */}
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='mt-8 border-t border-gray-800 pt-4 text-sm text-center'>
        <p>© 2024 SiftIn. All rights reserved.</p>
        <p className='mt-1'>Crafted with passion by <span className='text-cyan-400 italic font-semibold'>Dheeraj</span></p>
        
        {/* Back to Top Button */}
        <button 
          className='mt-2 text-cyan-400 hover:text-cyan-300 underline cursor-pointer'
          onClick={scrollToTop}
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
