import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
  FaUserCircle, FaCodeBranch, FaUsers, FaSearch,
  FaPlus, FaCode, FaLaptopCode,FaBookOpen,FaCalendarAlt 
} from 'react-icons/fa'
import { MdOutlineWorkspacePremium, MdOutlineRefresh } from "react-icons/md";
import { IoMdSearch } from 'react-icons/io'
import { MdCalendarToday } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa6";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts'

// Sample data
const stats = [
  { title: 'Active Courses', count: 12, icon: <FaRegChartBar />, color: 'text-blue-600' },
  { title: 'Active LeetCode Problems', count: 48, icon: <FaCodeBranch />, color: 'text-purple-600' },
  { title: 'Success Rate', count: "80%", icon: <MdOutlineWorkspacePremium />, color: 'text-green-600' },
]

const courses = [
  { title: 'React Mastery', date: '18 June', level: 'Intermediate' },
  { title: 'Node.js Bootcamp', date: '22 June', level: 'Beginner' },
]

const problems = [
  { title: 'Two Sum', date: '16 June' },
  { title: 'Longest Substring Without Repeat', date: '17 June' },
]

// Chart data
const activityData = [
  { day: 'Mon', solved: 3 },
  { day: 'Tue', solved: 5 },
  { day: 'Wed', solved: 2 },
  { day: 'Thu', solved: 4 },
  { day: 'Fri', solved: 6 },
  { day: 'Sat', solved: 1 },
  { day: 'Sun', solved: 3 },
]

const topicData = [
  { name: 'DP', value: 15 },
  { name: 'Array', value: 10 },
  { name: 'Tree', value: 8 },
  { name: 'Graph', value: 5 },
  { name: 'Math', value: 10 },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F']

function DashboardPage() {
    const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);

    // simulate some refresh logic
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000); // spin for 1 second
  };

  const { user } = useSelector((state) => state.auth);


  return (
    <div className="min-h-screen w-full md:ml-80 bg-gray-100">
      {/* Navbar */}
      <div className="flex flex-col p-4">
        <div className="flex flex-col md:flex-row justify-between text-2xl md:text-3xl font-bold my-2 mx-4 gap-4">
          <div>
            <p>Hello, @{user?.username} </p>
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

  {/* Main */}
      <main className="p-4 md:p-6 space-y-6">

        {/* Create Buttons */}
         {/* Create Buttons */}
        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
        <button className="group bg-gradient-to-br from-green-100 to-green-200 px-6 py-4 rounded-2xl flex items-center gap-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-400 hover:-translate-y-1 hover:scale-[1.02] backdrop-blur-sm">
            <FaPlus
            size={44}
            className="border-2 p-2 border-green-700 text-green-800 rounded-full bg-white shadow-sm group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-green-900 ">Create Course</span>
            <span className="text-sm text-green-800 group-hover:text-green-950">Publish to engage users</span>
            </div>
        </button>
        <button className="group bg-gradient-to-br from-purple-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaCalendarAlt
            size={32}
            className="text-purple-700 group-hover:rotate-[15deg] group-hover:scale-125 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col text-left">
            <span className="text-xl font-semibold text-gray-800 group-hover:text-purple-900 ">Create Events</span>
            <span className="text-sm text-gray-600 group-hover:text-purple-800">Add a new challenge</span>
            </div>
        </button>
        <button className="group bg-gradient-to-br from-blue-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaSearch
            size={32}
            className="text-blue-700 group-hover:rotate-[8deg] group-hover:scale-125 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col text-left">
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-900 ">Browse LeetCode</span>
            <span className="text-sm text-gray-600 group-hover:text-blue-800">Find available challenge</span>
            </div>
        </button>
        <button className="group bg-gradient-to-br from-indigo-100 to-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-300 hover:-translate-y-1 hover:scale-[1.02]">
            <FaLaptopCode
            size={32}
            className="text-indigo-700 group-hover:rotate-6 group-hover:scale-125 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col text-left">
            <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-900 ">Open Code Editor</span>
            <span className="text-sm text-gray-600 group-hover:text-indigo-800">Code like a pro</span>
            </div>
        </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white shadow-md p-4 rounded flex items-center gap-4">
              <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
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

          {/* Pie Chart */}
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

        {/* Upcoming */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Courses */}
          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <FaBookOpen /> Upcoming Courses
            </h2>
            <ul className="space-y-4">
              {courses.map((c, i) => (
                <li key={i} className="flex justify-between items-start border border-gray-200 pb-3 hover:bg-green-50 p-2 rounded-md transition duration-200">
                  <div className="text-gray-800">
                    <p className="font-medium">{c.title}</p>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <MdCalendarToday className="text-green-600" />
                      <span>{c.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    c.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    c.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {c.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming LeetCodes */}
          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <FaCode /> Upcoming LeetCodes
            </h2>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex justify-between items-start border border-gray-200 pb-3 hover:bg-purple-50 p-2 rounded-md transition duration-200">
                  <div className="text-gray-800">
                    <p className="font-medium">{p.title}</p>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <MdCalendarToday className="text-purple-600" />
                      <span>{p.date}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                    {p.difficulty || "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>

  )
}

export default DashboardPage