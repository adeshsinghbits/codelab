import React from 'react';
import { FaUserGraduate, FaStar } from 'react-icons/fa';

function CourseCard({ title, description, image, author, rating, price, isFree }) {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-green-700 mb-1 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

        <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
          <FaUserGraduate className="text-green-500" />
          <span>{author}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-sm text-gray-700">{rating}</span>
          </div>
          <span className={`text-sm font-semibold ${isFree ? 'text-green-600' : 'text-gray-800'}`}>
            {isFree ? 'Free' : `₹${price}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
