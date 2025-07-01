import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  IoArrowBackSharp,
  IoPricetagOutline
} from "react-icons/io5";
import {
  FiUploadCloud,
  FiXCircle
} from "react-icons/fi";
import {
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaUsers,
  FaMoneyBillWave
} from "react-icons/fa";
import {
  MdDescription,
  MdLocationOn,
  MdLink,
  MdOutlineSave
} from "react-icons/md";
import { createEventThunk } from '../../features/event/eventThunk';
import { uploadPicThunk } from "../../features/user/userThunk";

function CreateEventPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "online",
    meetingLink: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    rsvpDeadline: "",
    price: "",
    priceCategory: "INR",
    tags: "",
    requirement: "",
    agendaTitle: "",
    agendaDescription: "",
    maxAttendees: 50,
    image: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      dispatch(uploadPicThunk(file)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setFormData((prev) => ({
            ...prev,
            image: res.payload.url,
          }));
          setImagePreview(res.payload.url);
          toast.success("Event image uploaded successfully");
        } else {
          toast.error(res.error?.message || "Image upload failed");
        }
      });
    } else {
      toast.error("Please upload a valid image");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Event image is required");
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
    };

    const res = await dispatch(createEventThunk(payload));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Event created successfully");
      navigate("/events");
    } else {
      toast.error(res.payload || "Event creation failed");
    }
  };

  return (
    <div className="ml-80 p-8 min-h-screen">
      <Link to="/events" className="flex items-center mb-6">
        <IoArrowBackSharp className="mr-2 text-xl" /> Back to Events
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Create Event</h1>
        <p className="text-gray-600">Share an event with the tech community. Provide all details to help attendees.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Event Information */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Event Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input id="title" value={formData.title} onChange={handleChange} required placeholder="Enter event title" className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <select id="category" value={formData.category} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded">
              {["", "Conference", "Workshop", "Networking", "Seminar", "Webinar", "Hackathon", "Other"].map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat || "Select Category"}</option>
              ))}
            </select>

            <textarea id="description" value={formData.description} onChange={handleChange} required placeholder="Enter event description" className="md:col-span-2 w-full border border-green-500 bg-emerald-100 p-2 rounded min-h-[100px]" />

            <select id="location" value={formData.location} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded">
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <input type="text" id="meetingLink" value={formData.meetingLink} onChange={handleChange} placeholder="Enter meeting link" className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">📅 Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="time" id="startTime" value={formData.startTime} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="date" id="endDate" value={formData.endDate} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="time" id="endTime" value={formData.endTime} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="date" id="rsvpDeadline" value={formData.rsvpDeadline} onChange={handleChange} className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="number" id="maxAttendees" value={formData.maxAttendees} onChange={handleChange} required className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
          </div>
        </div>

        {/* Pricing & Tags */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">💰 Pricing & Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" id="price" value={formData.price} onChange={handleChange} className="w-full border border-green-500 bg-emerald-100 p-2 rounded" />
            <select id="priceCategory" value={formData.priceCategory} onChange={handleChange} className="w-full border border-green-500 bg-emerald-100 p-2 rounded">
              {["USD", "EUR", "GBP", "INR"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input id="tags" value={formData.tags} onChange={handleChange} className="md:col-span-2 w-full border border-green-500 bg-emerald-100 p-2 rounded" placeholder="e.g. tech, startup, coding" />
            <div className="md:col-span-2">
              <label htmlFor="image">Event Image (1 only)</label>
              {!imagePreview ? (
                <div className="relative border-2 border-dashed border-emerald-500 p-6 rounded-xl cursor-pointer hover:border-emerald-600 transition-all duration-300">
                  <input type="file" id="image" accept="image/*" required onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FiUploadCloud className="text-4xl mb-2" />
                    <p className="text-sm">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-32 h-32 group">
                  <img src={imagePreview} alt="Preview" className="rounded-xl shadow-md w-full h-full object-cover border-2 border-emerald-500" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: "" }));
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:text-red-500 transition"
                  >
                    <FiXCircle className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">📝 Additional Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" id="requirement" value={formData.requirement} onChange={handleChange} className="w-full border border-green-500 bg-emerald-100 p-2 rounded" placeholder="Any prerequisites or tools" />
            <input type="text" id="agendaTitle" value={formData.agendaTitle} onChange={handleChange} placeholder="Agenda Title" className="border border-green-500 bg-emerald-100 p-2 rounded" />
            <input type="text" id="agendaDescription" value={formData.agendaDescription} onChange={handleChange} placeholder="Agenda Description" className="border border-green-500 bg-emerald-100 p-2 rounded" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"><MdOutlineSave className="inline mr-1" /> Save Draft</button>
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700">Publish Event</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;
