import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import marketplace from '../assets/marketplace.png'
import course from '../assets/course.png'
import editor from '../assets/editor.png'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes 3-5 business days within India.",
  },
  {
    question: "Do you offer technical support?",
    answer:
      "Yes, we offer 24/7 technical support through email and live chat.",
  },
];

function LandingPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
        <header className="shadow-md sticky top-0 z-50 backdrop-blur-3xl">
            <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold bg-green-500 text-white px-4 py-2 rounded">
                Codelab
            </div>

            {/* Menu */}
            <ul className="hidden md:flex space-x-6 font-medium">
                <li>
                <Link
                    to="/marketplace"
                    className="hover:text-green-500 transition duration-300"
                >
                    Marketplace
                </Link>
                </li>
                <li>
                <Link
                    to="/courses"
                    className="hover:text-green-500 transition duration-300"
                >
                    Courses
                </Link>
                </li>
                <li>
                <Link
                    to="/editor"
                    className="hover:text-green-500 transition duration-300"
                >
                    Editor
                </Link>
                </li>
            </ul>

            {/* Right actions */}
            <div className="hidden md:flex items-center space-x-4">
                <Link
                to="/login"
                className="text-md font-medium hover:underline underline-offset-4"
                >
                Login
                </Link>
                <Link
                to="/register"
                className="text-md font-medium bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                Create Account
                </Link>
                <button className="ml-2 border border-gray-500 dark:border-white rounded px-2 py-1 text-sm">
                Theme
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                className="text-gray-800 dark:text-white focus:outline-none"
                onClick={() => alert('Add mobile menu logic')}
                >
                ☰
                </button>
            </div>
            </nav>
        </header>

      {/* Hero Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl max-w-3xl mx-auto font-medium text-center text-gray-900 dark:text-white mb-8">
                    The all-in-one coding platform for   
                    <span className="text-green-500"> developers</span>,  
                    <span className="text-green-500"> students</span> and 
                    <span className="text-green-500"> educators</span>
                </h1>
                <p className="text-lg max-w-xl mx-auto text-center text-gray-600 dark:text-gray-400">
                    Showcase your work, find paid gigs, join vibrant communities and explore the latest events — all in one powerful builder-first platform
                </p>
                <Link  to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 max-w-[200px] mx-auto block text-center mt-8 rounded-full transition duration-300">Get Started</Link>
            </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-12">
                Explore Our Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature Card - Marketplace */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Marketplace
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                    Buy and sell coding tools and services
                    </p>
                    <img src={marketplace} alt="hello" />
                </div>

                {/* Feature Card - Courses */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Courses
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                    Learn coding from experts
                    </p>
                    <img src={course} alt="hello" />
                </div>

                {/* Feature Card - Editor */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Editor
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                    Code in the browser
                    </p>
                    <img src={editor} alt="" />
                </div>
                </div>
            </div>
        </section>
        <section  className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="max-w-3xl mx-auto my-10 px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400  mb-8">Everything you need to know about our platform</p>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="overflow-hidden"
                    >
                        <button
                        className="w-full flex justify-between items-center p-4  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => toggle(index)}
                        >
                        <span className="text-lg font-medium text-left text-gray-800 dark:text-gray-200">
                            {faq.question}
                        </span>
                        {openIndex === index ? (
                            <FaChevronUp className="text-xl text-blue-500" />
                        ) : (
                            <FaChevronDown className="text-xl text-gray-500" />
                        )}
                        </button>
                        {openIndex === index && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                            {faq.answer}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 py-16 px-4 text-center">
                <p>Everything you need to know about our platform</p>
                <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 max-w-[200px] mx-auto block text-center mt-8 rounded-full transition duration-300" to="/contact">Contact Support</Link>
            </div>
        </section>
    </div>
    )
}

export default LandingPage
