import React from 'react'
import { FaBookReader } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import CourseCard from '../components/CourseCard';
import thumbnail from "../assets/thumbnail.jpg";
import "../App.css";

function CoursePage() {
    const categories = [
        "All", "Free", "Pro", "Business", "JavaScript", "React", "Python", "Java",
        "PHP", "Swift", "HTML", "CSS", "SQL", "C"
    ];

    const sampleCourses = [
        {
            title: "Mastering React from Scratch",
            description: "Build dynamic UIs with hooks, context, and routing.",
            image: thumbnail,
            author: "Adesh Singh",
            rating: 4.8,
            price: 1499,
            isFree: false,
        },
        {
            title: "Intro to Python Programming",
            description: "Learn Python with hands-on examples and exercises.",
            image: thumbnail,
            author: "Ravi Kumar",
            rating: 4.5,
            price: 0,
            isFree: true,
        },
        {
            title: "Advanced JavaScript Techniques",
            description: "Master advanced JavaScript techniques and patterns.",
            image: thumbnail,
            author: "John Doe",
            rating: 4.9,
            price: 1999,
            isFree: false,
        },
        {
            title: "Data Science with Python",
            description: "Explore data analysis and machine learning with Python.",
            image: thumbnail,
            author: "Jane Smith",
            rating: 4.7,
            price: 2499,
            isFree: false,
        },
        {
            title: "Full-Stack Web Development",
            description: "Build full-stack web applications with React and Node.js.",
            image: thumbnail,
            author: "John Doe",
            rating: 4.9,
            price: 2999,
            isFree: false,
        },
        {
            title: "Mastering React from Scratch",
            description: "Build dynamic UIs with hooks, context, and routing.",
            image: thumbnail,
            author: "Adesh Singh",
            rating: 4.8,
            price: 1499,
            isFree: false,
        },
        {
            title: "Intro to Python Programming",
            description: "Learn Python with hands-on examples and exercises.",
            image: thumbnail,
            author: "Ravi Kumar",
            rating: 4.5,
            price: 0,
            isFree: true,
        },
    ];

    return (
        <div className="w-full md:ml-80">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
                <div className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-green-700">
                    <FaBookReader className="text-4xl rounded p-2 w-16 h-16" />
                    <div>
                        Courses
                        <span className="block font-medium text-sm text-gray-400">
                            Learn without any limits and interruption
                        </span>
                    </div>
                </div>

                {/* Search Box */}
                <div className="flex w-full md:w-auto items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-96 border border-green-200 rounded-l-2xl p-2 focus:outline-none shadow-sm shadow-gray-400"
                    />
                    <button className="border border-green-200 p-2 shadow-md shadow-gray-400 rounded-r-2xl">
                        <IoMdSearch size={25} />
                    </button>
                </div>
            </div>

            {/* Scrollable Category Bar */}
            <div className="w-full bg-white sticky top-0 z-10 overflow-x-auto border-y py-2 hide-scrollbar">
                <ul className="flex w-max items-center gap-3 text-sm font-semibold px-4">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="border-2 border-green-400 px-4 py-1 rounded-lg whitespace-nowrap hover:bg-white hover:text-gray-600 transition duration-300 cursor-pointer"
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-10">
                {sampleCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    );
}

export default CoursePage;
