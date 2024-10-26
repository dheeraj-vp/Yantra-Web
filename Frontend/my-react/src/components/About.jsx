import React from 'react';
import { sections, features } from '../data/aboutData';

const About = () => (
  <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
    {/* Title for About Section */}
    <h1 className="text-5xl font-bold text-[#00FFFF] mb-8 transition-transform transform hover:scale-105">
      About <span className="italic">SiftIn</span>
    </h1>

    {/* Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full max-w-5xl px-4 relative">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FFFF] relative overflow-hidden"
        >
          <h2 className="text-2xl font-semibold text-[#00FFFF] mb-4">{section.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
          <div className="absolute inset-0 rounded-lg border-2 border-[#00FFFF] opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
      
      {/* Downward Arrow Overlay */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <svg
          className="w-10 h-10 animate-bounce text-[#00FFFF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m0 0l-4-4m4 4l4-4"
          />
        </svg>
      </div>
    </div>

    {/* Features */}
    <div className="w-full max-w-5xl mb-12 text-center">
      <h2 className="text-4xl font-semibold text-[#00FFFF] mb-2">Features</h2>
      <div className="h-1 w-full bg-gradient-to-r from-[#00FFFF] to-[#0779b6] mb-6 mx-auto" />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FFFF] relative overflow-hidden"
            >
              <div className="text-[#00FFFF] text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <div className="absolute inset-0 rounded-lg border-2 border-[#00FFFF] opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Call to Action Button */}
    
  </div>
);

export default About;
