import React from 'react';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { IoMdStar } from 'react-icons/io';
import { BsPatchCheckFill } from 'react-icons/bs';

const GigCard = ({ gig, showActions = false, onEdit, onDelete }) => {

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
      {/* Content */}
      <div className="p-4 space-y-2">
        <div>
          <div className=" items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">{gig.title}</h3>
            {gig.isTopRated && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <BsPatchCheckFill className="text-green-600" /> Top Rated
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500">{gig.category} / {gig.subCategory}</p>

          <div className="flex items-center justify-between mt-2">
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <FaRupeeSign /> {gig.startingPrice}
            </span>
            <span className="flex items-center gap-1 text-blue-600 text-sm">
              <MdAccessTime /> {gig.deliveryTimeInDays} Days
            </span>
          </div>

          <div className="flex items-center gap-1 text-yellow-500 mt-1 text-sm">
            <IoMdStar className="text-lg" />
            {gig.rating?.toFixed(1) || "0.0"}
          </div>

          {gig.skills?.length > 0 && (
            <div className="mt-1 text-xs italic text-gray-600">
              Skills: {gig.skills.slice(0, 3).join(', ')}{gig.skills.length > 3 ? '...' : ''}
            </div>
          )}
        </div>

        
        <div className="flex justify-between pt-2">
          {gig.freelancer && (
            <div className="flex items-center gap-2 mt-3">
              <img
                src={gig.freelancer.picture  || '/default-avatar.png'}
                alt="freelancer"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-sm text-gray-700">{gig.freelancer.name}</span>
            </div>
          )}  
          <Link to={`/marketplace/${gig._id}`} className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 text-white text-sm py-2 rounded hover:opacity-80">View Details</Link>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(gig._id)}
              className="flex-1 bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(gig._id)}
              className="flex-1 bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigCard;
