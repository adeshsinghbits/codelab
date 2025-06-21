import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { FaFilter, FaHashtag } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";

import EventCard from '../components/EventCard';
import {
  fetchEventsThunk,
  rsvpToEventThunk,
  leaveEventThunk
} from '../features/event/eventThunk';

function EventsPage() {
  const dispatch = useDispatch();
  const eventState = useSelector(state => state.event);
  const events = eventState?.events || [];
  const loading = eventState?.loading || false;
  const currentUserId = useSelector(state => state.auth.user?._id);
  useEffect(() => {
    dispatch(fetchEventsThunk());
  }, [dispatch]);

  const handleRSVP = (id) => dispatch(rsvpToEventThunk(id));
  const handleLeave = (id) => dispatch(leaveEventThunk(id));

  return (
    <div className="w-full lg:ml-80 mt-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row px-4 justify-between md:mt-0 bg-white border-b gap-4 p-4">
        <div className="flex items-center gap-4 text-2xl font-bold text-green-700">
          <MdEventNote className="text-4xl p-2 bg-green-100 rounded-full" />
          <div>
            <p>Events</p>
            <span className="block text-sm font-semibold text-gray-400">
              Discover and join upcoming events in the tech community
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            to="/events/create"
            className="bg-green-700 hover:bg-green-900 text-white font-bold px-4 py-2 cursor-pointer rounded shadow-md"
          >
            + Create Events
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <div className="mt-4 px-4 flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-96">
          <div className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-green-200 p-4 flex items-center gap-3">
              <FaFilter className="text-2xl" />
              <h1 className="text-lg font-semibold">Sort & Filter Events</h1>
            </div>

            <div className="flex flex-col p-5 bg-green-50 space-y-6">
              {[
                { label: 'Event Type', icon: <MdEventNote />, id: 'category', options: ['Workshop', 'Conference', 'Bootcamp', 'Hackathon', 'Webinar', 'Other'] },
                { label: 'Location', icon: <CiLocationOn />, id: 'location', options: ['Online', 'In Person', 'Hybrid'] },
                { label: 'Date Range', icon: <IoMdTime />, id: 'date', options: ['Today', 'This Week', 'This Month'] },
                { label: 'Price', icon: <IoPricetagOutline />, id: 'price', options: ['Free', 'Paid'] },
              ].map(({ label, icon, id, options }) => (
                <div key={id}>
                  <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-green-700 text-xl">{icon}</span> {label}
                  </label>
                  <select
                    id={id}
                    className="mt-2 w-full bg-white border border-green-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue=""
                  >
                    <option value="" disabled>{`All ${label}s`}</option>
                    {options.map(opt => (
                      <option key={opt.toLowerCase()} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 flex justify-center items-center gap-2">
                <FaFilter className="text-xl" />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mt-6 border border-gray-200 rounded-xl shadow-md p-4 bg-white">
            <p className="text-xl font-semibold mb-2">
              <FaHashtag className="inline mr-2 text-green-700" />
              Trending LeetCode On
            </p>
            {['AI/ML', 'JavaScript', 'Python', 'React', 'HTML', 'CSS'].map(topic => (
              <button
                key={topic}
                className="bg-green-100 hover:bg-green-200 text-sm font-semibold px-4 py-2 m-1 border border-gray-300 rounded"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        <div className="w-full">
          {loading ? (
            <p className="text-center text-gray-500">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-400">No events found</p>
          ) : (
            events.map(event => {
              const isJoined = event.attendees?.includes(currentUserId);

              return (
                <EventCard
                  key={event._id}
                  id={event._id}
                  image={event.image}
                  date={new Date(event.startDate).toDateString()}
                  title={event.title}
                  time={`${event.startTime} – ${event.endTime}`}
                  location={event.location}
                  attendees={`${event.attendees?.length || 0} / ${event.maxAttendees}`}
                  host={event.creator?.name || "Host"}
                  year={new Date(event.startDate).getFullYear()}
                  type={event.category}
                  priceCategory={event.priceCategory}
                  price={event.price > 0 ? `₹${event.price}` : "Free"}
                  onRSVP={() => handleRSVP(event._id)}
                  onLeave={() => handleLeave(event._id)}
                  isJoined={isJoined}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
