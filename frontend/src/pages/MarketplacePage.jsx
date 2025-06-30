import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import { MdLocalGroceryStore,MdOutlineCategory } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { FaFilter, FaCodeBranch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import GigCard from '../components/GigCard';
import { fetchAllGigs } from '../features/gig/gigThunks';

function MarketplacePage() {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gig);

  useEffect(() => {
    dispatch(fetchAllGigs());
  }, [dispatch]);
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
          <Link
            to="/marketplace/create"
            className="flex items-center gap-2 border bg-gradient-to-r from-emerald-500 to-teal-600 border-gray-300 px-4 py-2 rounded-md font-bold shadow-md  hover:text-white transition duration-100"
          >
            + Create gig
          </Link>
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
          <div className="bg-gradient-to-br from-green-50 to-white border border-gray-100 p-5 rounded-2xl shadow-sm w-full max-w-xs">
      <h1 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
        <FaFilter className="text-xl text-green-700 mr-2" />
        Smart Filters
      </h1>

      {/* Category Filter */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          <MdOutlineCategory className="inline-block mr-2 text-green-600 text-xl" />
          Category
        </label>
        <select className="w-full border border-green-400 p-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>All Categories</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>UI/UX Design</option>
          <option>Data Science</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          <IoPricetagOutline className="inline-block mr-2 text-green-600 text-xl" />
          Price Range
        </label>
        <select className="w-full border border-green-400 p-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>All Prices</option>
          <option>Under 2000</option>
          <option>2000 - 5000</option>
          <option>Over 5000</option>
        </select>
      </div>

      {/* Sort By Filter */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          <FaArrowTrendUp className="inline-block mr-2 text-green-600 text-xl" />
          Sort By
        </label>
        <select className="w-full border border-green-400 p-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>Relevance</option>
          <option>Trending</option>
          <option>New</option>
          <option>Popular</option>
        </select>
      </div>

      {/* Clear All Filters Button */}
      <button className="w-full border border-gray-300 hover:border-green-500 font-semibold text-gray-700 hover:text-green-700 py-2 rounded-xl transition-all duration-150 shadow hover:shadow-md flex items-center justify-center gap-2">
        <FaFilter className="text-md" />
        Clear All Filters
      </button>
    </div>

          {/* Trending Courses */}
          <div className="border border-gray-200 shadow-md p-4 bg-white rounded">
            <p className="text-xl font-semibold mb-2">
              <FaArrowTrendUp className="text-2xl inline mr-2 text-green-700" />
              Trending Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI/ML", "JavaScript", "Python", "React", "HTML", "CSS", "PHP", "Bootstrap"].map((topic) => (
                <button key={topic} className="bg-gray-100 text-gray-600 font-bold px-3 py-2 border border-gray-300 rounded-xl hover:scale-105 shadow-sm">
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area Placeholder */}
        <div className="w-full p-4 bg-white border border-dashed border-gray-300 rounded ">
          {loading && <p>Loading gigs...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col flex-wrap gap-6">
              {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketplacePage;
