import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white p-6'>
      <h1 className='text-4xl font-bold text-[#00FFFF] mb-6'>
        About <span className='italic font-bold'>SiftIn</span>
      </h1>
      
      {/* Our Mission */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Our Mission</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          SiftIn helps you cut through the clutter by prioritizing emails that matter. With intuitive filters, SiftIn ensures you focus on essential emails while minimizing distractions.
        </p>
      </section>

      {/* How It Works */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>How It Works</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          Filter emails based on keywords in the sender, subject, or body. SiftIn regularly scans your inbox, delivering important messages right when you need them.
        </p>
      </section>

      {/* Features */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Features</h2>
        <ul className='list-none max-w-3xl mx-auto'>
          <li className='mb-4 flex items-center'>
            <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
            <span className='text-lg'>
              <span className='text-2xl mr-2'>🔍</span>
              <strong>Keyword Filtering:</strong> Filter emails by keywords in the sender, subject, or body for a focused inbox.
            </span>
          </li>
          <li className='mb-4 flex items-center'>
            <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
            <span className='text-lg'>
              <span className='text-2xl mr-2'>⏱️</span>
              <strong>Real-Time Updates:</strong> Your inbox is checked automatically every 15 minutes for matching emails.
            </span>
          </li>
          <li className='mb-4 flex items-center'>
            <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
            <span className='text-lg'>
              <span className='text-2xl mr-2'>📩</span>
              <strong>Focused Display:</strong> Only emails that match your criteria are highlighted, keeping your inbox clutter-free.
            </span>
          </li>
        </ul>
      </section>

      {/* Our Vision */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Our Vision</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          We aim to transform how you manage emails, making inboxes more efficient and tailored to your needs.
        </p>
      </section>

      {/* Join Us */}
      <section className='text-center'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Join Us</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          Experience the power of smart email filtering. Join thousands of users already streamlining their inbox with SiftIn.
        </p>
      </section>
    </div>
  );
};

export default About;
 