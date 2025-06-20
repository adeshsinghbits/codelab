import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBookReader } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import {
  fetchCoursesThunk,
  joinCourseThunk,
  leaveCourseThunk,
} from "../features/course/courseThunk";
import CourseCard from "../components/CourseCard";
import "../App.css";

function CoursePage() {
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth); // assumes auth slice exists

  useEffect(() => {
    dispatch(fetchCoursesThunk());
  }, [dispatch]);

  const handleJoin = (courseId) => {
    dispatch(joinCourseThunk(courseId));
  };

  const handleLeave = (courseId) => {
    dispatch(leaveCourseThunk(courseId));
  };

  const categories = [
    "All", "Free", "Pro", "Business", "JavaScript", "React", "Python", "Java",
    "PHP", "Swift", "HTML", "CSS", "SQL", "C"
  ];

  return (
    <div className="w-full md:ml-80">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <div className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-green-700">
          <FaBookReader className="text-4xl rounded p-2 w-16 h-16" />
          <div>
            Courses
            <span className="block font-medium text-sm text-gray-400">
              Learn without any limits and interruption
            </span>
          </div>
        <Link
            to="/courses/create"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md text-sm font-semibold self-start md:self-center"
            >
            + Create Course
        </Link>
        </div>

        {/* Search */}
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

      {/* Categories */}
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

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-10">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : courses.length === 0 ? (
          <p className="text-center col-span-full">No courses found</p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              currentUserId={user?._id}
              onJoin={() => handleJoin(course._id)}
              onLeave={() => handleLeave(course._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CoursePage;
