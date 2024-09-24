import React from 'react';
import { useNavigate } from 'react-router-dom';

const MiddleSection = () => {
    const navigate = useNavigate();
        
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-black text-white p-6'>
      <h2 className='text-5xl font-bold text-[#00FFFF] mb-6 drop-shadow-lg'>
        SiftIn: Where Elegance Meets Efficiency
      </h2>
      <p className='text-lg max-w-2xl mb-8 leading-relaxed'>
        Navigate your inbox with grace. SiftIn elegantly sifts through emails, highlighting essential messages and allowing you to focus on what inspires you. Experience email management that feels like a breath of fresh air.
      </p>
      <a href="#" className='py-3 px-8 text-lg font-semibold border-2 border-cyan-500 rounded-md text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all'onClick={() => navigate('/about')}>
        Know More
      </a>
    </div>
  );
};

export default MiddleSection;
