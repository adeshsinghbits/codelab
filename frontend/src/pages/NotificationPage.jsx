import React, { useState } from 'react';
import { IoMdSearch, IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegBellSlash } from "react-icons/fa";

function NotificationPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  // Sample notification data
  const notifications = [
    { id: 1, title: "New Course Released", read: false },
  ];

  const handleRefresh = () => {
    setIsSpinning(true);
    // Simulate refresh logic
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Read') return n.read;
    return true;
  });

  return (
    <div className="w-screen ml-80 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3 text-2xl font-bold text-green-800">
          <IoIosNotificationsOutline size={40} />
          <p>Notifications</p>
        </div>

        <button
          onClick={handleRefresh}
          className={`h-10 text-sm border border-gray-300 px-4 shadow-md rounded-3xl transition duration-100 ${
            isSpinning ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer'
          }`}
        >
          <MdOutlineRefresh
            size={25}
            className={`inline mr-2 ${isSpinning ? 'animate-spin' : ''}`}
          />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-6 py-4 bg-white shadow-sm">
        {['All', 'Unread', 'Read'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium px-3 py-1 transition ${
              activeTab === tab
                ? 'border-b-2 border-green-600 text-green-600'
                : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="px-6 py-4">
        {filteredNotifications.length > 0 ? (
          <ul className="space-y-4">
            {filteredNotifications.map((note) => (
              <li
                key={note.id}
                className={`p-4 rounded-xl shadow-sm ${
                  note.read ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <p className="text-gray-800">{note.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {note.read ? 'Read' : 'Unread'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center text-gray-500">
            <FaRegBellSlash size={60} className="text-gray-400 mb-4" />
            <p className="text-xl font-semibold">No Notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
