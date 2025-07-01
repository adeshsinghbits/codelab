import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUserCircle, FaCodeBranch, FaUsers, FaSearch,
  FaPlus, FaCode, FaLaptopCode, FaBookOpen, FaCalendarAlt
} from 'react-icons/fa'
import { MdOutlineWorkspacePremium, MdOutlineRefresh, MdCalendarToday } from "react-icons/md";
import { FaRegChartBar, FaSuitcase } from "react-icons/fa6";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { fetchgigsByFreelancer } from '../../features/gig/gigThunks';
import { creatorEventsThunk } from '../../features/event/eventThunk';

const activityData = [
  { day: 'Mon', solved: 3 },
  { day: 'Tue', solved: 5 },
  { day: 'Wed', solved: 2 },
  { day: 'Thu', solved: 4 },
  { day: 'Fri', solved: 6 },
  { day: 'Sat', solved: 1 },
  { day: 'Sun', solved: 3 },
];

const topicData = [
  { name: 'DP', value: 15 },
  { name: 'Array', value: 10 },
  { name: 'Tree', value: 8 },
  { name: 'Graph', value: 5 },
  { name: 'Math', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function DashboardPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.event);
  const { gigs } = useSelector((state) => state.gig);

  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  useEffect(() => {
    dispatch(fetchgigsByFreelancer(user._id));
    dispatch(creatorEventsThunk(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="min-h-screen w-full md:ml-80 bg-gray-100">
      {/* Navbar */}
      <div className="flex flex-col p-4">
        <div className="flex flex-col md:flex-row justify-between text-2xl md:text-3xl font-bold my-2 mx-4 gap-4">
          <div>
            <p>Hello, @{user?.username}</p>
            <span className="block font-semibold text-lg text-gray-400">
              Here's what's happening in your workspace today
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 text-sm border border-gray-300 focus:outline-none px-4 shadow-md rounded-3xl transition duration-100 ${
              isSpinning ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer'
            }`}
          >
            <MdOutlineRefresh
              size={25}
              className={`${isSpinning ? 'animate-spin' : ''} transition-transform duration-300`}
            />
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

        {/* Create Buttons */}
        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
          <button className="group bg-gradient-to-br from-green-100 to-green-200 px-6 py-4 rounded-2xl flex items-center gap-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-400 hover:-translate-y-1 hover:scale-[1.02] backdrop-blur-sm">
            <FaPlus size={44} className="border-2 p-2 border-green-700 text-green-800 rounded-full bg-white shadow-sm group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-in-out" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold text-green-900">Create Gigs</span>
              <span className="text-sm text-green-800 group-hover:text-green-950">Publish to engage users</span>
            </div>
          </button>

          <button className="group bg-gradient-to-br from-purple-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaCalendarAlt size={32} className="text-purple-700 group-hover:rotate-[15deg] group-hover:scale-125 transition-all duration-500 ease-in-out" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-purple-900">Create Events</span>
              <span className="text-sm text-gray-600 group-hover:text-purple-800">Add a new challenge</span>
            </div>
          </button>

          <button className="group bg-gradient-to-br from-blue-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaSearch size={32} className="text-blue-700 group-hover:rotate-[8deg] group-hover:scale-125 transition-all duration-500 ease-in-out" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-900">Browse Gigs</span>
              <span className="text-sm text-gray-600 group-hover:text-blue-800">Find available challenge</span>
            </div>
          </button>

          <button className="group bg-gradient-to-br from-indigo-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaLaptopCode size={32} className="text-indigo-700 group-hover:rotate-6 group-hover:scale-125 transition-all duration-500 ease-in-out" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-900">Open Code Editor</span>
              <span className="text-sm text-gray-600 group-hover:text-indigo-800">Code like a pro</span>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <p className="bg-white p-4 rounded shadow flex items-center">
            <FaSuitcase size={30} className="text-gray-600 inline" />
            <span className="ml-2 text-gray-600 font-bold">Active gigs: {gigs.length}</span>
          </p>
          <p className="bg-white p-4 rounded shadow flex items-center">
            <MdCalendarToday size={30} className="text-gray-600 inline" />
            <span className="ml-2 text-gray-600 font-bold">Active events: {events.length}</span>
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow w-full overflow-x-auto">
            <h2 className="font-bold mb-2">Weekly LeetCode Solves</h2>
            <LineChart width={400} height={250} data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="solved" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </div>

          <div className="bg-white p-4 rounded shadow w-full overflow-x-auto">
            <h2 className="font-bold mb-2">Problem Category Distribution</h2>
            <PieChart width={400} height={250}>
              <Pie data={topicData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Admin Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
              <FaSuitcase /> Admin Gigs
            </h2>
            <ul className="space-y-4">
              {gigs.slice(0, 3).map((g, i) => (
                <li key={i} className="flex justify-between items-start border border-gray-200 pb-3 hover:bg-red-50 p-2 rounded-md transition duration-200">
                  <div className="text-gray-800">
                    <p className="font-medium">{g.title || 'Gig Title'}</p>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <MdCalendarToday className="text-red-600" />
                      <span>{new Date(g.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                    {g.status || 'Active'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <FaCalendarAlt /> Admin Events
            </h2>
            <ul className="space-y-4">
              {events.slice(0, 3).map((e, i) => (
                <li key={i} className="flex justify-between items-start border border-gray-200 pb-3 hover:bg-blue-50 p-2 rounded-md transition duration-200">
                  <div className="text-gray-800">
                    <p className="font-medium">{e.title || 'Event Title'}</p>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <MdCalendarToday className="text-blue-600" />
                      <span>{new Date(e.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {e.category || 'General'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}

export default DashboardPage;
