import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does this work?",
      answer: "Selah is a simple blogging platform where you can share your thoughts and stories. Just sign up, create posts, and connect with other writers and readers in our community."
    },
    {
      question: "Why post here?",
      answer: "Our platform focuses on meaningful content and thoughtful discussions. Unlike other platforms, we prioritize quality over quantity and provide tools to help your writing shine."
    },
    {
      question: "Is there a character limit?",
      answer: "No strict limits! Write as much or as little as you need to express yourself. We recommend keeping posts between 500-2000 words for optimal readability."
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Logo, Description, Social Media */}
          <div>
            <div className="flex items-center mb-6">
              <Logo width="140px" textColor="text-gray-100" />
            </div>
            <p className="text-gray-500 mb-6 max-w-md text-lg">
              A modern blogging platform for sharing ideas and stories. Join our community of writers and readers.
            </p>
            <div className="flex space-x-5">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={social}
                >
                  <div className="bg-gray-800 h-12 w-12 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-xl">
                      {social === 'twitter' ? '🐦' : 
                       social === 'facebook' ? '👍' : 
                       social === 'instagram' ? '📷' : '🔗'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - FAQ */}
          <div>
            <h3 className="text-gray-200 text-xl font-semibold mb-6">FAQs</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-800 pb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                  >
                    <span className="text-gray-300 hover:text-white transition-colors text-lg">
                      {faq.question}
                    </span>
                    <span className="text-gray-400 text-xl">
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === index && (
                    <p className="mt-2 text-gray-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Selah. All rights reserved. Made with ❤️ by Abhay
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;