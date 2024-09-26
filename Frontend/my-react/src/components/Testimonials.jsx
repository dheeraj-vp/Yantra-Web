import React from 'react';

const Testimonials = () => {
  
    const testimonialsList = [
        {
            quote: "I love how easy it is to set up filters. It saves me a ton of time and helps me stay focused on what's important.",
            name: "- Michael Brown",
            designation: "Entrepreneur"
        },
        {
            quote: "SiftIn has completely transformed how I handle my emails. I can't imagine going back to the old way.",
            name: "- Sarah Smith",
            designation: "Marketing Manager"
        },
        
        {
            quote: "An excellent tool for anyone overwhelmed with emails. Filtering with SiftIn is a breeze!",
            name: "- David Lee",
            designation: "Software Engineer"
        }
    ];

    return (
        <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center p-6'>
          
          {/* Header */}
          <h1 className='text-4xl font-bold text-[#00FFFF] mb-6 text-center'>What People Are Saying About SiftIn</h1>
          <p className='text-lg max-w-3xl text-center mb-10'>
            Here’s what some of our users have to say about their experience with SiftIn. Their words reflect the impact of smart email filtering in saving time and reducing inbox clutter.
          </p>

          {/* Responsive testimonial boxes */}
          <div className='flex flex-wrap justify-center gap-6'>
            {testimonialsList.map((testimonial, index) => (
                <div key={index} className='flex flex-col justify-between p-6 bg-gray-900 rounded-lg shadow-md w-full sm:w-[300px] h-auto sm:h-[200px] flex-shrink-0'>
                    <p className='text-md flex-grow'>{testimonial.quote}</p>
                    <div className='mt-4'>
                        <h3 className='font-semibold text-cyan-500'>{testimonial.name}</h3>
                        <span className='text-sm text-gray-400'>{testimonial.designation}</span>
                    </div>
                </div>
            ))}
          </div>
        </div>
    );
};

export default Testimonials;
