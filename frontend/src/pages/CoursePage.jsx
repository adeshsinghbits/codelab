import React from 'React';
import { FaBookReader } from "react-icons/fa";

function CoursePage() {

  return (
    <div className="w-full md:ml-80">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-4 text-2xl font-bold text-green-700">
            <FaBookReader className="text-4xl p-2 w-16 h-16 rounded" />
            <div>
              Courses
              <span className="block text-sm text-gray-400 font-medium">
                Learn without any limits and interruption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
