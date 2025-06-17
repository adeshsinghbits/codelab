import React from 'react'
import "../App.css"
import { MdLocalGroceryStore,MdOutlineCategory } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { FaFilter, FaCodeBranch } from "react-icons/fa";

function MarketplacePage() {
  return (
    <div className="w-full mt-10 md:ml-80 px-2 md:px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between bg-white border-b gap-4 p-4 shadow-sm">
        <div className="flex items-start md:items-center gap-4 text-3xl font-bold text-emerald-500">
          <MdLocalGroceryStore className="text-4xl rounded p-2 w-16 h-16" />
          <div>
            <p>Marketplace</p>
            <span className="block text-sm font-semibold text-gray-400">
              Exploration in infinity world for enthusiasts and coders
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap md:gap-4 items-center">
          <button className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold px-4 py-2 rounded shadow-md hover:shadow-lg">
            + Create
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded font-bold shadow-md hover:bg-gray-700 hover:text-white transition duration-100">
            <FaArrowTrendUp className="text-2xl" />
            Browse Trends
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="flex flex-col w-full lg:w-1/3 gap-8">
          {/* Filter Card */}
          <div className="border border-gray-200 shadow-md p-4 bg-green-100 rounded">
            <h1 className="text-xl font-semibold mb-4">
              <FaFilter className="text-2xl inline mr-2 text-green-700" />
              Sort Filter
            </h1>

            <div className="mb-4">
              <p className="mb-2">
                <MdOutlineCategory className="text-2xl inline mr-2 text-green-700" />
                Category
              </p>
              <select className="w-full border border-green-400 p-2 rounded focus:outline-none">
                <option disabled selected>All Categories</option>
                <option>web development</option>
                <option>mobile development</option>
                <option>UI/UX design</option>
                <option>data science</option>
              </select>
            </div>

            <div className="mb-4">
              <p className="mb-2">
                <IoPricetagOutline className="text-2xl inline mr-2 text-green-700" />
                Price
              </p>
              <select className="w-full border border-green-400 p-2 rounded focus:outline-none">
                <option disabled selected>All Prices</option>
                <option>under 2000</option>
                <option>2000 - 5000</option>
                <option>over 5000</option>
              </select>
            </div>

            <div className="mb-4">
              <p className="mb-2">
                <FaArrowTrendUp className="text-2xl inline mr-2 text-green-700" />
                Trends
              </p>
              <select className="w-full border border-green-400 p-2 rounded focus:outline-none">
                <option disabled selected>All Trends</option>
                <option>trending</option>
                <option>new</option>
                <option>popular</option>
              </select>
            </div>

            <button className="w-full mt-4 border border-emerald-700 hover:bg-emerald-700 hover:text-white font-bold p-2 rounded transition duration-150 shadow-md">
              <FaFilter className="text-xl inline mr-2" />
              Apply Filter
            </button>
          </div>

          {/* Trending Courses */}
          <div className="border border-gray-200 shadow-md p-4 bg-white rounded">
            <p className="text-xl font-semibold mb-2">
              <FaArrowTrendUp className="text-2xl inline mr-2 text-green-700" />
              Trending Courses On
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI/ML", "JavaScript", "Python", "React", "HTML", "CSS", "PHP", "Bootstrap"].map((topic) => (
                <button key={topic} className="bg-green-100 hover:bg-green-200 font-bold px-3 py-2 border border-gray-300 rounded shadow-sm">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Trending LeetCode */}
          <div className="border border-gray-200 shadow-md p-4 bg-white rounded">
            <p className="text-xl font-semibold mb-2">
              <FaCodeBranch className="text-2xl inline mr-2 text-green-700" />
              Trending LeetCode On
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI/ML", "JavaScript", "Python", "React", "HTML", "CSS", "PHP", "Bootstrap"].map((topic) => (
                <button key={topic} className="bg-green-100 hover:bg-green-200 font-bold px-3 py-2 border border-gray-300 rounded shadow-sm">
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area Placeholder */}
        <div className="w-full lg:w-2/3 bg-white border border-dashed border-gray-300 min-h-[400px] rounded flex items-center justify-center">
          <h1 className="text-gray-500 text-2xl font-bold">Explore Marketplace Content</h1>
        </div>
      </div>
    </div>
  );
}

export default MarketplacePage;
