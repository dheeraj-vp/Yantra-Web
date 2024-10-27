import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import { motion } from "framer-motion";
import faqs from "../data/faqsData";

const ContactUs = () => {
  const form = useRef();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_3ca92p3', 'service_3ca92p3', form.current, {
        publicKey: 'Gg-VHuhQDM9cz7TFw',
      })
      .then(() => {
          console.log('SUCCESS!');
          e.target.reset();
        }, (error) => console.log('FAILED...', error.text)
      );
  };

  const toggleFAQ = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);


  const iconMotionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <div className="text-white bg-black flex flex-col w-full h-auto px-5 py-10 md:px-10 md:py-16 space-y-10 md:space-y-0 md:flex-row">
      
      {/* Contact Info */}
      <div className="md:w-1/2 flex flex-col space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-500">Contact Us</h1>
        <p className="text-lg">
          We're here to help! If you have any questions or feedback about SiftIn, feel free to reach out to us.
        </p>
        
        {/* Icons with Animation */}
        <motion.div 
          className="flex items-center space-x-6 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.3, staggerChildren: 0.2 }
            }
          }}
        >
          {[
            { href: "https://www.linkedin.com/in/dheeraj-vp/", title: "LinkedIn: dheeraj-vp", icon: <FaLinkedin size={30} /> },
            { href: "mailto:dheeraj@example.com", title: "dheeraj.vp2023@vitstudent.ac.in", icon: <FaEnvelope size={30} /> },
            { href: "tel:+1234567890", title: "8073748146", icon: <FaPhoneAlt size={30} /> },
            { href: "https://twitter.com/dheeraj", title: "Twitter: @dheeraj", icon: <FaTwitter size={30} /> },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-300"
              title={item.title}
              variants={iconMotionVariants}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
        
        {/* FAQ Section */}
        <div className="w-full mt-10">
          <h2 className="text-3xl font-semibold text-cyan-500 mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-white bg-gray-800 p-4 rounded-md focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaChevronDown
                    className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                <div
                  className={`transition-all overflow-hidden ${openFaqIndex === index ? 'max-h-32' : 'max-h-0'}`}
                >
                  <div className="p-4 bg-gray-900 text-sm text-gray-300 rounded-b-md">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 flex justify-center items-center">
        <form ref={form} onSubmit={sendEmail} className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
          {["Name", "Email", "Message"].map((field, idx) => (
            <div className="mb-6" key={idx}>
              <label className="block text-l italic font-medium mb-2">{field}</label>
              {field === "Message" ? (
                <textarea
                  name="message"
                  className="w-full p-3 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  rows="4"
                  required
                />
              ) : (
                <input
                  type={field.toLowerCase()}
                  name={`user_${field.toLowerCase()}`}
                  className="w-full p-3 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              )}
            </div>
          ))}
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
