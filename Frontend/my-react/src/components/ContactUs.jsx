import React, { useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3ca92p3', 'service_3ca92p3', form.current, {
        publicKey: 'Gg-VHuhQDM9cz7TFw',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="text-white bg-black flex flex-col md:flex-row w-full h-screen px-10 py-8 md:py-16">
      <div className="md:w-1/2 flex flex-col  space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-500">Contact Us</h1>
        <p className="text-lg">
          We're here to help! If you have any questions or feedback about SiftIn, feel free to reach out to us.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <form ref={form} onSubmit={sendEmail} className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
          <div className="mb-6">
            <label className="block text-l italic font-medium mb-2">Name</label>
            <input 
              type="text" 
              name="user_name" 
              className="w-full p-3 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-l italic font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="user_email" 
              className="w-full p-3 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-l italic font-medium mb-2">Message</label>             
            <textarea 
              name="message" 
              className="w-full p-3 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              rows="4"
              required
            />
          </div>
          <div className="text-right">
            <button 
              type="submit" 
              className="py-3 px-8 text-lg font-semibold border-2 border-cyan-500 rounded-md text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
