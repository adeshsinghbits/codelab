import { FaCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

function EventCard({
  id,
  image,
  date,
  title,
  time,
  location,
  attendees,
  host,
  year,
  type, 
  price,
  isJoined,
}) {
  console.log(isJoined);
  
  return (
    <div className="max-w-xs w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Tags */}
      <div className="flex justify-between p-2">
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {type}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {price}
        </span>
      </div>

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain px-4"
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center text-green-700 text-sm font-medium gap-2 mb-1">
          <FaCalendarAlt /> {date}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
          {title}
        </h3>

        <div className="text-gray-600 text-sm space-y-1 mb-2">
          <p className="flex items-center gap-2">
            <IoMdTime className="text-green-700" /> {time}
          </p>
          <p className="flex items-center gap-2">
            <CiLocationOn className="text-green-700" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaUserFriends className="text-green-700" />
            {attendees} by {host}
          </p>
          <p>{year}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-green-700 font-semibold">{price}</span>
          <Link 
            to={`/events/${id}`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-semibold cursor-pointer transition duration-200">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
