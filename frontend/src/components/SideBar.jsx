import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  MdLocalGroceryStore, MdDashboardCustomize, MdEventNote,
} from "react-icons/md";
import { IoBook, IoChatbox } from "react-icons/io5";
import { FaLaptopCode, FaBookmark, FaUser, FaBars } from "react-icons/fa";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";

function SideBar() {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 text-sm font-semibold py-2 px-4 rounded transition duration-300
    ${isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emrald-500/25' : 'hover:bg-white hover:text-gray-600 hover:shadow-md'}`;

  return (
    <div className="fixed top-0 left-0 z-50 w-80">
      {/* Hamburger Icon for Mobile */}
      <button
        className={`fixed flex items-center justify-between  top-0 left-0 border-b border-gray-200 bg-white right-0 z-50 md:hidden  p-2  
          ${open ? 'hidden' : 'block'}`}
        onClick={() => setOpen(true)}
      >
        <h1 className="text-2xl font-semibold">Codelab</h1>
        <FaBars  size={20} />
      </button>

      {/* Sidebar Container */}
      <div
        className={` w-80 z-40 h-screen bg-slate-100 border-r overflow-y-auto  hide-scrollbar border-gray-200 transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="bg-white sticky  top-0 left-0  right-0 flex items-center justify-between px-4 py-4 shadow">
          <h1 className="text-2xl font-semibold">Codelab</h1>
          <div className="md:hidden">
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-500 hover:text-red-600 font-semibold"
          >
            Close ✕
          </button>
        </div>
        </div>

        <div className="h-full overflow-y-auto px-4 pb-6">
          <h3 className="text-sm text-slate-400 mt-4 font-semibold">EXPLORE</h3>
          <ul className="mt-4">
            <li className="mt-2"><NavLink to="/marketplace" className={linkClasses}><MdLocalGroceryStore /> Marketplace</NavLink></li>
            <li className="mt-2"><NavLink to="/courses" className={linkClasses}><IoBook /> Courses</NavLink></li>
            <li className="mt-2"><NavLink to="/events" className={linkClasses}><MdEventNote /> Events</NavLink></li>
            <li className="mt-2"><NavLink to="/editor" className={linkClasses}><FaLaptopCode /> Editor</NavLink></li>
          </ul>

          <h3 className="text-sm text-slate-400 mt-4 font-semibold">PERSONAL</h3>
          <ul className="mt-4">
            <li className="mt-2"><NavLink to="/dashboard" className={linkClasses}><MdDashboardCustomize /> Dashboard</NavLink></li>
            <li className="mt-2"><NavLink to="/notifications" className={linkClasses}><IoIosNotifications /> Notification</NavLink></li>
            <li className="mt-2"><NavLink to="/saved" className={linkClasses}><FaBookmark /> Saved items</NavLink></li>
            <li className="mt-2"><NavLink to="/chats" className={linkClasses}><IoChatbox /> Inbox</NavLink></li>
          </ul>

          <h3 className="text-sm text-slate-400 mt-4 font-semibold">ACCOUNT</h3>
          <ul className="mt-4">
            <li className="mt-2"><NavLink to="/profile" className={linkClasses}><FaUser /> Profile</NavLink></li>
            <li className="mt-2"><NavLink to="/settings" className={linkClasses}><IoIosSettings /> Settings</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar;
