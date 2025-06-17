import React from 'react'
import { IoMdSearch, IoMdTime } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaFilter, FaHashtag } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import EventCard from '../components/EventCard';
import Marketplace from '../assets/marketplace.png';

function EventsPage() {
  return (
    <div className="w-full lg:ml-80 mt-14 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row px-4  justify-between md:mt-0 bg-white border-b gap-4 p-4">
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
          <button className="bg-green-700 hover:bg-green-900 text-white font-bold px-4 py-2 rounded shadow-md">
            + Create
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-700 hover:text-white shadow transition duration-100">
            <FaArrowTrendUp className="text-xl" />
            Browse Trends
          </button>
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
              {/* Filter Dropdowns */}
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

              {/* Apply Button */}
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

        {/* Right Content: Event Cards */}
        <div className="w-full">
          <EventCard
            image={Marketplace}
            date="May 31, 2025"
            title="React Native"
            time="10:42 – 00:42"
            location="Online"
            attendees="attendees / 96 max"
            host="Anshul Sharmaa"
            year="2025"
            type="Workshop"
            price="Free"
          />
          {/* Add more <EventCard /> components here if needed */}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
