import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white p-6'>
      <h1 className='text-4xl font-bold text-[#00FFFF] mb-6'>About <span className='italic font-bold'>SiftIn</span></h1>
      
      {/* Our Mission */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Our Mission</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          At SiftIn, our goal is simple: to help you regain control of your inbox. In a world overflowing with information, we believe your time should be spent focusing on what matters most — not digging through endless emails. SiftIn ensures that you never miss important messages while minimizing distractions from irrelevant content.
        </p>
      </section>

      {/* How It Works */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>How It Works</h2>
        <p className='text-lg max-w-3xl leading-relaxed mb-4'>
          At its core, SiftIn uses a smart keyword system that lets you filter emails by:
        </p>
        <ul className='list-disc list-inside max-w-3xl'>
          <li className='mb-2'><strong>Specific Senders:</strong> Want to only receive emails from a particular person or organization? SiftIn will make sure you never miss a message from them.</li>
          <li className='mb-2'><strong>Keywords in the Subject:</strong> Have important emails based on specific projects or topics? SiftIn ensures any relevant subject line catches your attention.</li>
          <li className='mb-2'><strong>Keywords in the Body:</strong> Need to track emails containing certain phrases? SiftIn will filter them out for easy access.</li>
        </ul>
        <p className='text-lg max-w-3xl leading-relaxed mt-6'>
          SiftIn automatically scans your inbox every 15 minutes for new emails matching your criteria, ensuring you stay on top of the messages that matter without the clutter of irrelevant emails.
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
        <strong>Smart Keyword Filtering:</strong> Easily specify keywords to highlight relevant emails by sender, subject, or content.
      </span>
    </li>
    <li className='mb-4 flex items-center'>
      <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
      <span className='text-lg'>
        <span className='text-2xl mr-2'>⏱️</span>
        <strong>Real-Time Updates:</strong> SiftIn automatically checks your inbox every 15 minutes to ensure you don’t miss anything important.
      </span>
    </li>
    <li className='mb-4 flex items-center'>
      <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
      <span className='text-lg'>
        <span className='text-2xl mr-2'>📩</span>
        <strong>Focused Email Display:</strong> Only emails that match your keywords are shown. All irrelevant ones are simply ignored.
      </span>
    </li>
    <li className='mb-4 flex items-center'>
      <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
      <span className='text-lg'>
        <span className='text-2xl mr-2'>⚡</span>
        <strong>Seamless Integration:</strong> Effortlessly integrates with your Gmail account, making it easy to access and read filtered emails.
      </span>
    </li>
    <li className='mb-4 flex items-center'>
      <span className='text-[#00FFFF] text-2xl mr-2'>➤</span>
      <span className='text-lg'>
        <span className='text-2xl mr-2'>💬</span>
        <strong>User-Friendly Interface:</strong> Navigate your inbox with ease and focus on the emails that matter most.
      </span>
    </li>
  </ul>
</section>


      {/* Our Vision */}
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Our Vision</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          We envision a world where your inbox works for you, not the other way around. Our mission is to continuously enhance email management tools, making them more efficient, customizable, and user-friendly for everyone.
        </p>
      </section>

      {/* Join Us */}
      <section className='text-center'>
        <h2 className='text-3xl font-semibold text-[#00FFFF] mb-4'>Join Us</h2>
        <p className='text-lg max-w-3xl leading-relaxed'>
          Join thousands of users who are already experiencing the ease of SiftIn. Whether you’re a professional managing multiple projects or just someone who wants a more organized inbox, SiftIn has the tools to help you stay focused and efficient.
        </p>
      </section>
    </div>
  );
};

export default About;
