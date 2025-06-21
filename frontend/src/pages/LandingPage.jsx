import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import marketplace from '../assets/marketplace.png';
import course from '../assets/course.png';
import editor from '../assets/editor.png';
import developerImg from '../assets/developer.jpg';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase for a full refund.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes 3-5 business days within India.",
  },
  {
    question: "Do you offer technical support?",
    answer: "Yes, we offer 24/7 technical support through email and live chat.",
  },
];

function LandingPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">

      {/* Floating Badge */}
      <div className="absolute top-6 right-6 bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-md animate-bounce text-sm">
        🔥 Trending Now
      </div>

      {/* Navbar */}
      <header className="shadow-md sticky top-0 z-50 backdrop-blur-3xl">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="text-xl font-bold bg-green-500 text-white px-4 py-2 rounded">Codelab</div>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li><Link to="/marketplace" className="hover:text-green-500 transition duration-300">Marketplace</Link></li>
            <li><Link to="/courses" className="hover:text-green-500 transition duration-300">Courses</Link></li>
            <li><Link to="/editor" className="hover:text-green-500 transition duration-300">Editor</Link></li>
          </ul>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-md font-medium hover:underline underline-offset-4">Login</Link>
            <Link to="/register" className="text-md font-medium bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 transition">Create Account</Link>
            <button className="ml-2 border border-gray-500 dark:border-white rounded px-2 py-1 text-sm">Theme</button>
          </div>
          <div className="md:hidden">
            <button className="text-gray-800 dark:text-white focus:outline-none" onClick={() => alert('Add mobile menu logic')}>☰</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-medium max-w-3xl mx-auto text-gray-900 dark:text-white mb-8">
            The all-in-one coding platform for <span className="text-green-500">developers</span>, <span className="text-green-500">students</span> and <span className="text-green-500">educators</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-600 dark:text-gray-400">Showcase your work, find paid gigs, join vibrant communities and explore the latest events — all in one powerful builder-first platform</p>
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 max-w-[200px] mx-auto block text-center mt-8 rounded-full transition duration-300">Get Started</Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-12">Explore Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: 'Marketplace', text: 'Buy and sell coding tools and services', image: marketplace },
              { title: 'Courses', text: 'Learn coding from experts', image: course },
              { title: 'Editor', text: 'Code in the browser', image: editor }
            ].map((card, i) => (
              <div key={i} className="relative group transform transition duration-500 hover:-translate-y-2 hover:scale-105">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md group-hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{card.text}</p>
                  <img src={card.image} alt={card.title} className="mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Text Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              A platform made for modern <span className="text-green-500">tech learners</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Whether you're building your next big project, looking for a mentor, or joining a hackathon — Codelab connects you with everything you need in one place.
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>🚀 Build interactive portfolios</li>
              <li>👨‍🏫 Access curated coding labs</li>
              <li>🛠 Showcase tools, scripts, and snippets</li>
              <li>📅 Join live sessions, events, and webinars</li>
            </ul>
            <Link to="/courses" className="inline-block bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition mt-4">
              Start Learning
            </Link>
          </div>
          {/* Image Column */}
          <div className="relative">
            <img src={developerImg} alt="developer illustration" className="rounded-lg w-96 shadow-xl transform hover:scale-105 transition duration-300" />
            <div className="absolute top-6 left-6 bg-green-100 text-green-800 px-3 py-1 rounded-full shadow-md text-sm animate-bounce">
              🌟 10K+ Active Users
            </div>
          </div>
        </div>
      </section>

      {/* Why Codelab */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Why Choose <span className="text-green-500">Codelab</span>?</h2>
          <div className="flex flex-col items-center gap-8">
            {[
              { title: 'Built for Speed', desc: 'Lightning-fast loading and execution.' },
              { title: 'Developer Centric', desc: 'Designed by devs for devs.' },
              { title: 'Trusted by Community', desc: 'Thousands of creators use Codelab.' },
            ].map((item, i) => (
              <div key={i} className="p-6 w-96 sticky top-30  bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transform hover:-translate-y-1 hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">Everything you need to know about our platform</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button onClick={() => toggle(index)} className="w-full flex justify-between items-center p-4 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-lg font-medium text-left text-gray-800 dark:text-gray-200">{faq.question}</span>
                  {openIndex === index ? <FaChevronUp className="text-xl text-blue-500" /> : <FaChevronDown className="text-xl text-gray-500" />}
                </button>
                {openIndex === index && <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 py-16 px-4 text-center">
          <p>Everything you need to know about our platform</p>
          <Link to="/contact" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 max-w-[200px] mx-auto block text-center mt-8 rounded-full transition duration-300">Contact Support</Link>
        </div>
      </section>

      {/* Floating CTA */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        🚀 Get Started
      </button>

    </div>
  );
}

export default LandingPage;
