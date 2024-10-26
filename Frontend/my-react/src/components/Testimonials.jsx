import React from 'react';
import testimonialsList from '../data/testimonialsData';

const Testimonials = () => {

    return (
        <div className='bg-gradient-to-b from-gray-900 to-black text-white min-h-screen flex flex-col items-center justify-center p-6'>
          
          {/* Header */}
          <h1 className='text-4xl font-bold text-[#00FFFF] mb-2 text-center transition-transform transform hover:scale-105'>
            What People Are Saying About SiftIn
          </h1>
          <div className='border-t border-gray-700 w-full max-w-3xl mx-auto mb-8' />
          <p className='text-lg max-w-3xl text-center mb-10'>
            Here’s what some of our users have to say about their experience with SiftIn. Their words reflect the impact of smart email filtering in saving time and reducing inbox clutter.
          </p>

          {/* Responsive testimonial boxes */}
          <div className='flex flex-wrap justify-center gap-8'>
            {testimonialsList.map((testimonial, index) => (
                <div key={index} className='relative flex flex-col justify-between p-6 bg-gray-800 rounded-xl shadow-lg w-full sm:w-[300px] h-auto sm:h-[220px] transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 overflow-hidden'>
                    <div className='absolute top-4 left-4 text-gray-500 text-3xl'>
                        “
                    </div>
                    <p className='text-md italic text-center flex-grow mb-4'>" {testimonial.quote} "</p>
                    <div className='flex flex-col items-center mt-auto'>
                        <h3 className='font-semibold text-[#00FFFF]'>{testimonial.name}</h3>
                        <span className='text-sm text-gray-400'>{testimonial.designation}</span>
                    </div>
                    <div className='mt-4'>
                      <hr className='border-gray-600 mb-2' />
                    </div>
                </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className='mt-10'>
           <a 
            href='/get-started' 
            className='bg-gradient-to-r from-cyan-600 to-cyan-900 text-white font-bold py-2 px-6 rounded hover:from-cyan-700 hover:to-cyan-900 transition duration-300 shadow-lg transform hover:scale-105'
           >
             Get Started with SiftIn
           </a>
          </div>
        </div>
    );
};

export default Testimonials;
