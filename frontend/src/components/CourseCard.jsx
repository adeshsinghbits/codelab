import React from "react";

const CourseCard = ({ course, currentUserId, onJoin, onLeave }) => {
  const isJoined = course.attendees?.some((a) => a._id === currentUserId);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col justify-between h-full">
      <div>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg font-semibold text-green-800">{course.title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">{course.description}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onJoin}
          className={`px-4 py-1 text-sm rounded transition ${
            isJoined
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={isJoined}
        >
          {isJoined ? "Joined" : "Join"}
        </button>

        <button
          onClick={onLeave}
          className={`px-4 py-1 text-sm rounded transition ${
            !isJoined
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          disabled={!isJoined}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
