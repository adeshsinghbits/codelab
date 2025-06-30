import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { FaCodeBranch, FaBookOpen } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";

function SavedPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPlaceholderContent = () => {
    switch (activeTab) {
      case 'all':
        return <p className="text-gray-500 text-xl">You haven’t saved any drafts yet.</p>;
      case 'courses':
        return <p className="text-gray-500 text-xl">No saved courses available.</p>;
      case 'leetcode':
        return <p className="text-gray-500 text-xl">No saved LeetCode problems found.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen ml-80 px-6 py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Saved Items</h1>
        <p className="text-gray-600">Manage your saved drafts for courses and LeetCode problems</p>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Tab Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-4 rounded transition duration-300 shadow-md ${
              activeTab === 'all'
                ? 'bg-green-700 text-white shadow-green-700'
                : 'hover:bg-white hover:text-gray-600'
            }`}
          >
            All Drafts
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-2 px-4 rounded transition duration-300 shadow-md flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-green-700 text-white shadow-green-700'
                : 'hover:bg-white hover:text-gray-600'
            }`}
          >
            <FaBookOpen className="w-5 h-5" />
            Courses
          </button>
          <button
            onClick={() => setActiveTab('leetcode')}
            className={`py-2 px-4 rounded transition duration-300 shadow-md flex items-center gap-2 ${
              activeTab === 'leetcode'
                ? 'bg-green-700 text-white shadow-green-700'
                : 'hover:bg-white hover:text-gray-600'
            }`}
          >
            <FaCodeBranch className="w-5 h-5" />
            LeetCode
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center w-full md:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="border border-green-300 rounded-l-2xl px-4 py-2 w-full md:w-96 shadow-sm focus:outline-none"
          />
          <button className="border border-green-300 p-2 rounded-r-2xl shadow-md hover:bg-green-50 transition">
            <IoMdSearch size={20} />
          </button>
        </div>
      </div>
        <h1 className="text-2xl font-semibold my-10">
            <RiDraftLine className="text-3xl inline mr-2 text-green-700"/>
            Your Draft(0)
        </h1>
      {/* Dynamic Placeholder Content */}
      <div className="bg-white p-6 h-full flex items-center justify-center">
        {renderPlaceholderContent()}
      </div>
    </div>
  );
}

export default SavedPage;
