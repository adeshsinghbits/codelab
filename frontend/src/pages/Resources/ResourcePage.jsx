import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../features/resource/resourceThunks";

const ResourcePage = () => {
  const dispatch = useDispatch();
  const { resources = [], loading, error } = useSelector((state) => state.resource);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  const filteredResources = resources.filter((res) => {
    const search = searchTerm.toLowerCase();
    return (
      res.title.toLowerCase().includes(search) ||
      res.description.toLowerCase().includes(search) ||
      res.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  });

  return (
    <div className="p-6 md:ml-80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Library</h1>
          <p className="text-gray-600">Explore curated learning material & developer tools.</p>
        </div>
        <Link
          to="/library/new"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
        >
          + Add Resource
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Search by title, tag or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredResources.length === 0 ? (
        <p className="text-gray-500">No matching resources found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res._id}
              className="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{res.title}</h2>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full capitalize">
                  {res.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{res.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {res.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Info */}
              {res.author && (
                <p className="text-xs text-gray-500 mb-2">
                  By <span className="font-medium text-gray-700">{res.author.name}</span> ({res.author.email})
                </p>
              )}

              {/* View Details */}
              <Link
                to={`/library/${res._id}`}
                className="inline-block mt-2 text-sm font-medium text-green-600 hover:underline"
              >
                🔍 View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcePage;
