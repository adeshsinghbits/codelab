import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaSearch, FaPlus, FaLaptopCode, FaCalendarAlt
} from 'react-icons/fa';
import {
  MdOutlineWorkspacePremium, MdOutlineRefresh
} from 'react-icons/md';

import { fetchgigsByFreelancer } from '../../features/gig/gigThunks';
import { creatorEventsThunk } from '../../features/event/eventThunk';
import { fetchConnections } from '../../features/chat/chatThunks';
import { fetchResourcesByFreelancer } from '../../features/resource/resourceThunks';

function DashboardPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user || {});
  const connections = useSelector((state) => state.chat?.connections || []);
  const gigs = useSelector((state) => state.gig?.gigs || []);
  const events = useSelector((state) => state.event?.events || []);
  const freelancerResources = useSelector((state) => state.resource?.freelancerResources || []);
  console.log('Freelancer Resources:', freelancerResources);
  
  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  useEffect(() => {
    if (user._id) {
      dispatch(fetchgigsByFreelancer(user._id));
      dispatch(creatorEventsThunk(user._id));
      dispatch(fetchConnections(user._id));
      dispatch(fetchResourcesByFreelancer(user._id));
    }
  }, [dispatch, user._id]);

  return (
    <div className="min-h-screen w-full md:ml-80 bg-gray-100">
      {/* Header */}
      <div className="flex flex-col p-4">
        <div className="flex flex-col md:flex-row justify-between text-2xl md:text-3xl font-bold my-2 mx-4 gap-4">
          <div>
            <p>Hello, @{user?.username || 'User'}</p>
            <span className="block font-semibold text-lg text-gray-400">
              Here's what's happening in your workspace today
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 text-sm border border-gray-300 px-4 shadow-md rounded-3xl ${
              isSpinning ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer'
            }`}
          >
            <MdOutlineRefresh size={25} className={`${isSpinning ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="flex w-full md:w-56 my-2 bg-green-100 items-center gap-2 px-4 py-2 rounded-lg text-green-600">
          <MdOutlineWorkspacePremium size={30} />
          <p>Premium Member</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 md:p-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex  gap-4 flex-wrap">
          <Link to="/marketplace/create" className="group bg-gradient-to-br from-green-100 to-green-200 px-6 py-4 rounded-2xl flex items-center gap-5 shadow-lg border border-green-400">
            <FaPlus size={44} className="border-2 p-2 border-green-700 text-green-800 rounded-full bg-white group-hover:rotate-180 transition-all" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-900">Create Gigs</span>
              <span className="text-sm text-green-800">Publish to engage users</span>
            </div>
          </Link>

          <Link to="/events/create" className="group bg-gradient-to-br from-purple-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg border border-purple-300">
            <FaCalendarAlt size={32} className="text-purple-700 group-hover:rotate-[15deg]" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-800">Create Events</span>
              <span className="text-sm text-gray-600">Add a new challenge</span>
            </div>
          </Link>

          <Link className="group bg-gradient-to-br from-blue-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg border border-blue-300">
            <FaSearch size={32} className="text-blue-700 group-hover:rotate-[8deg]" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-800">Browse Gigs</span>
              <span className="text-sm text-gray-600">Find available challenges</span>
            </div>
          </Link>

          <Link to="/editor" className="group bg-gradient-to-br from-indigo-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg border border-indigo-300">
            <FaLaptopCode size={32} className="text-indigo-700 group-hover:rotate-6" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-800">Open Code Editor</span>
              <span className="text-sm text-gray-600">Code like a pro</span>
            </div>
          </Link>
        </div>

        {/* === FULL LIST: EVENTS === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">📅 All Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500 text-sm">No events created yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {events.map((e) => (
                <li key={e._id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{e.title}</p>
                      <p className="text-sm text-gray-500">{e.category || 'General'} | {new Date(e.startDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full self-start">{e.status || 'Upcoming'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* === FULL LIST: GIGS === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">💼 All Gigs</h2>
          {gigs.length === 0 ? (
            <p className="text-gray-500 text-sm">No gigs posted yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {gigs.map((g) => (
                <li key={g._id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{g.title}</p>
                      <p className="text-sm text-gray-500">{g.category || 'Freelance'} | {new Date(g.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full self-start">{g.status || 'Active'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* === FULL LIST: LIBRARY === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">📚 Your Library Resources</h2>
          {freelancerResources.length === 0 ? (
            <p className="text-gray-500 text-sm">No resources uploaded yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {freelancerResources.map((res) => (
                <li key={res._id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{res.title}</p>
                      <p className="text-sm text-gray-500">{res.type || 'other'} | {new Date(res.createdAt).toLocaleDateString()}</p>
                    </div>
                    <a href={`/library/${res._id}`} className="text-sm text-indigo-500 hover:underline self-start">View</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* === FULL LIST: CONNECTIONS === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🤝 All Connections</h2>
          {connections.length === 0 ? (
            <p className="text-gray-500 text-sm">No connections yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.map((conn) => (
                <div key={conn._id} className="flex items-center gap-3 border p-3 rounded-xl hover:bg-green-50">
                  <img src={conn.picture || '/default-avatar.png'} alt={conn.name} className="w-10 h-10 rounded-full border" />
                  <div>
                    <p className="font-medium">{conn.name}</p>
                    <p className="text-sm text-gray-500">@{conn.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
