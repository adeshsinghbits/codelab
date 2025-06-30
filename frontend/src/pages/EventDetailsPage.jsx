import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { IoArrowBackSharp, IoShareSocialOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import {
  rsvpToEventThunk,
  leaveEventThunk,
  getSingleEventThunk,
} from "../features/event/eventThunk";
import { fetchNotificationsThunk } from "../features/notification/notificationThunk";

function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { event, loading } = useSelector((state) => state.event);
  const user = useSelector((state) => state.auth.user);
  const [joining, setJoining] = useState(false);
  const attendees = event?.attendees || [];

  const isExpired = event?.rsvpDeadline && dayjs().isAfter(dayjs(event.rsvpDeadline), "day");
  const isJoined = attendees?.some((a) => a._id === user?._id);

  useEffect(() => {
    if (eventId) {
      dispatch(getSingleEventThunk(eventId));
    }
  }, [eventId, dispatch]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
        toast.success("Thanks for sharing!");
      } catch (err) {
        console.error(err);
        toast.error("Share cancelled or failed.");
      }
    } else {
      toast.error("Sharing not supported on this device.");
    }
  };

  const handleJoin = async () => {
    if (!user) return toast.error("Please login to RSVP");
    try {
      setJoining(true);
      await dispatch(rsvpToEventThunk(event._id)).unwrap();
      toast.success("Successfully registered!");

      // ✅ Fetch latest notifications
      dispatch(fetchNotificationsThunk());

      await dispatch(getSingleEventThunk(event._id));
    } catch (err) {
      toast.error(err?.message || "Failed to RSVP.");
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    try {
      setJoining(true);
      await dispatch(leaveEventThunk(event._id)).unwrap();
      toast.success("You left the event.");

      // ✅ Fetch latest notifications
      dispatch(fetchNotificationsThunk());

      await dispatch(getSingleEventThunk(event._id));
    } catch (err) {
      toast.error(err?.message || "Failed to leave event.");
    } finally {
      setJoining(false);
    }
  };

  if (loading || !event) {
    return (
      <div className="text-center p-10 text-gray-500">Loading Event...</div>
    );
  }

  return (
    <div className="w-screen md:ml-80 px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-black mb-6 cursor-pointer"
      >
        <IoArrowBackSharp className="mr-2" />
        Back to Events
      </button>

      <div className="flex flex-wrap gap-10 justify-between">
        {/* Left Content */}
        <div className="md:w-150 space-y-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold capitalize">{event.title}</h1>
              <button
                onClick={handleShare}
                className="border border-green-500 text-green-600 hover:bg-green-50 p-2 rounded-md"
              >
                <IoShareSocialOutline />
              </button>
            </div>

            <div className="text-sm text-gray-500 space-y-2">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                {dayjs(event.startDate).format("dddd, MMM D, YYYY")}
              </p>
              <p className="flex items-center gap-2">
                <IoMdTime className="text-green-600" />
                {event.startTime} – {event.endTime}
              </p>
              <p className="flex items-center gap-2">
                <CiLocationOn className="text-green-600" />
                {event.location}
              </p>
              <p className="flex items-center gap-2">
                <FaUserFriends className="text-green-600" />
                {attendees.length} attending / {event.maxAttendees || "∞"} max
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-2">About This Event</h2>
            <p className="text-gray-700">
              {event.description || "No description provided."}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              🎉 Event Attendees
            </h2>

            {attendees.length > 0 ? (
              <ul className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {attendees.map((attendee) => (
                  <li
                    key={attendee._id}
                    className="flex items-center border gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <img
                      src={attendee.picture || "/default-avatar.png"}
                      alt={`${attendee.name || "User"}'s avatar`}
                      className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-sm hover:scale-105 transition-transform duration-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {attendee.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        @{attendee.username}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 ml-auto">✔️ Joined</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                No attendees have joined yet.
              </p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm text-center">
            {isExpired ? (
              <button
                disabled
                className="bg-gray-400 text-white font-bold px-4 py-2 rounded cursor-not-allowed"
              >
                RSVP Closed
              </button>
            ) : isJoined ? (
              <button
                onClick={handleLeave}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded shadow-md"
              >
                {joining ? "Leaving..." : "Leave Event"}
              </button>
            ) : (
              <button
                onClick={handleJoin}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded shadow-md"
              >
                {joining ? "Joining..." : "Join Event"}
              </button>
            )}
            <p className="text-sm text-gray-500 mt-2">
              RSVP by{" "}
              {dayjs(event.rsvpDeadline || event.startDate).format("MMM D, YYYY")}
            </p>
            {isExpired && (
              <p className="text-xs text-red-500 mt-1">
                The RSVP deadline has passed.
              </p>
            )}
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-md font-semibold mb-2">Organizer</h2>
            <div className="flex items-center gap-3">
              <img
                src={event.creator?.picture || "/default-avatar.png"}
                className="w-9 h-9 rounded-full border"
                alt="Organizer"
              />
              <p className="text-gray-800 font-medium">
                {event.creator?.name || "Organizer Info Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
