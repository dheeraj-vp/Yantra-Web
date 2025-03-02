import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className='flex justify-between items-center h-16 max-w-full mx-auto px-6 text-white bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50'>
      {/* Logo */}
      <h1
        className='text-3xl font-bold text-cyan-400 italic cursor-pointer hover:text-cyan-300 transition-all'
        onClick={() => navigate('/')}
      >
        CalQuity
      </h1>

      {/* Desktop Navigation */}
      <ul className='hidden sm:flex flex-grow justify-center space-x-8 ml-20'>
        {[
          { name: 'Home', path: '/' },
          { name: 'Stocks', path: '/stocks' },
          { name: 'IPOs', path: '/ipos' },
          { name: 'Investment Insights', path: '/insights' },
        ].map((item, index) => (
          <li
            key={index}
            className='p-3 relative group cursor-pointer text-lg font-medium hover:text-cyan-400 transition-all'
            onClick={() => navigate(item.path)}
          >
            {item.name}
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300'></span>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <div onClick={handleNav} className='block sm:hidden cursor-pointer'>
        {nav ? (
          <AiOutlineClose size={24} className='text-cyan-400 hover:text-cyan-300 transition-all' />
        ) : (
          <AiOutlineMenu size={24} className='text-cyan-400 hover:text-cyan-300 transition-all' />
        )}
      </div>

      {/* Mobile Navigation */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[70%] h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl ease-in-out duration-500 z-40'
            : 'fixed left-[-100%] top-0 ease-in-out duration-500'
        }
      >
        <h1
          className='w-full text-3xl font-bold text-cyan-400 p-6 border-b border-gray-700'
          onClick={() => navigate('/')}
        >
          CalQuity
        </h1>
        <ul className='uppercase p-4'>
          {[
            { name: 'Home', path: '/' },
            { name: 'Stocks', path: '/stocks' },
            { name: 'IPOs', path: '/ipos' },
            { name: 'Investment Insights', path: '/insights' },
          ].map((item, index) => (
            <li
              key={index}
              className='p-4 border-b border-gray-700 hover:text-cyan-400 cursor-pointer transition-all'
              onClick={() => {
                navigate(item.path);
                setNav(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className='flex flex-col items-center space-y-4 mt-4 p-4'>
          <a
            href='#'
            className='w-full py-2 px-6 text-center text-sm italic font-semibold border-2 border-cyan-400 rounded-md hover:bg-cyan-400 hover:text-gray-900 transition-all'
          >
            Sign In
          </a>
          <a
            href='#'
            className='w-full py-2 px-6 text-center text-sm italic font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-md hover:from-cyan-500 hover:to-cyan-600 transition-all'
          >
            Create an account
          </a>
        </div>
      </div>

      {/* Desktop Auth Buttons */}
      <div className='hidden sm:flex justify-around items-center space-x-6'>
        <a
          href='#'
          className='py-2 px-6 whitespace-nowrap text-sm italic font-semibold border-2 border-cyan-400 rounded-md hover:bg-cyan-400 hover:text-gray-900 transition-all'
        >
          Sign In
        </a>
        <a
          href='#'
          className='py-2 px-6 whitespace-nowrap text-sm italic font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-md hover:from-cyan-500 hover:to-cyan-600 transition-all'
        >
          Create an account
        </a>
      </div>
    </nav>
  );
};

export default Navbar;