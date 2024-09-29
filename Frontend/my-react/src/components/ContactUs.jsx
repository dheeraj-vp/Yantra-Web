import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Import Font Awesome icons

const ContactUs = () => {
  const form = useRef();
  const [openFaqIndex, setOpenFaqIndex] = useState(null); // For FAQ toggle

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

  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index); // Toggle open/close FAQ
  };

  return (
    <div className="text-white bg-black flex flex-col w-full h-auto px-5 py-10 md:px-10 md:py-16 space-y-10 md:space-y-0 md:flex-row">
      
      {/* Contact Info */}
      <div className="md:w-1/2 flex flex-col space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-500">Contact Us</h1>
        <p className="text-lg">
          We're here to help! If you have any questions or feedback about SiftIn, feel free to reach out to us.
        </p>
        
        {/* Icons */}
        <div className="flex items-center space-x-6 mt-6">
          <a href="https://www.linkedin.com/in/dheeraj-vp/" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-300" title="LinkedIn: dheeraj-vp">
            <FaLinkedin size={30} />
          </a>
          <a href="mailto:dheeraj@example.com" className="text-cyan-500 hover:text-cyan-300" title="Gmail: dheeraj@example.com">
            <FaEnvelope size={30} />
          </a>
          <a href="tel:+1234567890" className="text-cyan-500 hover:text-cyan-300" title="Phone: +1234567890">
            <FaPhoneAlt size={30} />
          </a>
          <a href="https://twitter.com/dheeraj" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-300" title="Twitter: @dheeraj">
            <FaTwitter size={30} />
          </a>
        </div>
        
        {/* FAQ Section */}
        <div className="w-full mt-10">
          <h2 className="text-3xl font-semibold text-cyan-500 mb-6">FAQ</h2>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div>
              <button
                className="w-full text-left text-lg font-semibold text-white bg-gray-800 p-4 rounded-md focus:outline-none"
                onClick={() => toggleFAQ(0)}
              >
                How does SiftIn protect my email privacy?
              </button>
              {openFaqIndex === 0 && (
                <div className="p-4 bg-gray-900 rounded-b-md text-sm text-gray-300">
                  SiftIn ensures that your email data is never stored on our servers without your consent. All filtering happens locally, and sensitive information is protected.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div>
              <button
                className="w-full text-left text-lg font-semibold text-white bg-gray-800 p-4 rounded-md focus:outline-none"
                onClick={() => toggleFAQ(1)}
              >
                What kind of emails can I filter?
              </button>
              {openFaqIndex === 1 && (
                <div className="p-4 bg-gray-900 rounded-b-md text-sm text-gray-300">
                  You can filter emails based on keywords in the sender, subject, or body of the email. You can also create custom filters to organize your inbox efficiently.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div>
              <button
                className="w-full text-left text-lg font-semibold text-white bg-gray-800 p-4 rounded-md focus:outline-none"
                onClick={() => toggleFAQ(2)}
              >
                Is SiftIn compatible with all email providers?
              </button>
              {openFaqIndex === 2 && (
                <div className="p-4 bg-gray-900 rounded-b-md text-sm text-gray-300">
                  Currently, SiftIn supports Gmail integration through Google APIs. We plan to add support for other email providers in future updates.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div>
              <button
                className="w-full text-left text-lg font-semibold text-white bg-gray-800 p-4 rounded-md focus:outline-none"
                onClick={() => toggleFAQ(3)}
              >
                Can I receive notifications for specific filtered emails?
              </button>
              {openFaqIndex === 3 && (
                <div className="p-4 bg-gray-900 rounded-b-md text-sm text-gray-300">
                  Yes, SiftIn can notify you when new emails matching your filters arrive, so you never miss important messages.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
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
