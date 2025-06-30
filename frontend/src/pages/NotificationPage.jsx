import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotificationsThunk,
  markNotificationAsReadThunk,
  deleteNotificationThunk,
} from '../features/notification/notificationThunk';
import {
  fetchRequests,
  acceptRequest,
  rejectRequest,
} from '../features/request/requestThunk';
import {
  IoIosNotificationsOutline
} from "react-icons/io";
import {
  MdOutlineRefresh
} from "react-icons/md";
import {
  FaRegBellSlash
} from "react-icons/fa";

function NotificationPage() {
  const dispatch = useDispatch();

  const { notifications, loading } = useSelector((state) => state.notification);
  const { requests } = useSelector((state) => state.request);

  const [isSpinning, setIsSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    dispatch(fetchNotificationsThunk());
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleRefresh = () => {
    setIsSpinning(true);
    Promise.all([
      dispatch(fetchNotificationsThunk()),
      dispatch(fetchRequests())
    ]).finally(() => {
      setTimeout(() => setIsSpinning(false), 800);
    });
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Read') return n.read;
    return true;
  });

  const tabList = ['All', 'Notifications', 'Requests'];

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
        {tabList.map((tab) => (
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

      <div className="px-6 py-6">
        {(activeTab === 'Requests' || activeTab === 'All') && (
          <>
            <h2 className="text-lg font-semibold text-green-700 mb-3">Connection Requests</h2>
            {requests.length > 0 ? (
              <ul className="space-y-4">
                {requests.map((req) => (
                  <li
                    key={req._id}
                    className="p-4 bg-white rounded-xl shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{req.name}</p>
                      <p className="text-xs text-gray-500">Sent you a connection request</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="border border-gray-400 rounded-full p-2"
                        onClick={() => dispatch(acceptRequest(req._id))}
                        title="Accept"
                      >
                        ✔️
                      </button>
                      <button
                        className="border border-gray-400 text-white rounded-full p-2"
                        onClick={() => dispatch(rejectRequest(req._id))}
                        
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No pending connection requests.</p>
            )}
          </>
        )}

        {(activeTab === 'Notifications' || activeTab === 'All') && (
          <>
            <h2 className="text-lg font-semibold text-green-700 mb-3 mt-8">Activity Notifications</h2>
            {loading ? (
              <div className="text-center text-gray-500 mt-10">Loading notifications...</div>
            ) : filteredNotifications.length > 0 ? (
              <ul className="space-y-4">
                {filteredNotifications.map((note) => (
                  <li
                    key={note._id}
                    className={`p-4 rounded-xl shadow-sm flex justify-between items-start gap-3 ${
                      note.read ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-gray-800">{note.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {note.read ? 'Read' : 'Unread'} – {new Date(note.createdAt).toLocaleString()}
                      </p>
                      {!note.read && (
                        <button
                          onClick={() => dispatch(markNotificationAsReadThunk(note._id))}
                          className="text-xs text-blue-600 underline mt-1"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => dispatch(deleteNotificationThunk(note._id))}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
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
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
