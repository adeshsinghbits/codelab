import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGig } from '../../features/gig/gigThunks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaTags, FaRegSave } from 'react-icons/fa';
import { MdCategory, MdOutlineAccessTime, MdOutlineAttachMoney } from 'react-icons/md';

const CreateGigPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    startingPrice: '',
    deliveryTimeInDays: '',
    skills: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formatted = {
        ...form,
        skills: form.skills.split(',').map(skill => skill.trim()),
        startingPrice: Number(form.startingPrice),
        deliveryTimeInDays: Number(form.deliveryTimeInDays),
      };

      await dispatch(createGig(formatted));
      toast.success('Gig created successfully');
      navigate('/marketplace');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen md:ml-80 bg-gradient-to-br from-green-50 to-white px-4 py-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-green-600 font-medium hover:underline">
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-green-800">Create New Gig</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
        {/* Gig Information */}
        <div className="bg-white shadow p-6 rounded-xl border border-green-200 space-y-4">
          <h2 className="text-lg font-semibold text-green-700">📋 Gig Information</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gig Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="I will create a modern website for your business"
              className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your service, what’s included, what makes it unique, etc."
              rows={4}
              className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdCategory /> Category *
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdCategory /> Sub-Category *
              </label>
              <input
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                placeholder="e.g. React.js"
                className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdOutlineAttachMoney /> Price (USD) *
              </label>
              <input
                name="startingPrice"
                type="number"
                value={form.startingPrice}
                onChange={handleChange}
                placeholder="Minimum $5"
                min={5}
                className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdOutlineAccessTime /> Delivery Time (days) *
              </label>
              <input
                name="deliveryTimeInDays"
                type="number"
                value={form.deliveryTimeInDays}
                onChange={handleChange}
                placeholder="e.g. 7"
                min={1}
                className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Skills & Tags */}
        <div className="bg-white shadow p-6 rounded-xl border border-green-200 space-y-4">
          <h2 className="text-lg font-semibold text-green-700">🏷️ Media & Tags</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaTags /> Skills & Tags
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Add comma-separated skills (e.g. React, SEO)"
              className="w-full p-3 bg-green-100 border border-green-400 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button type="button" className="border border-green-300 text-green-700 px-5 py-2 rounded-lg hover:bg-green-50">
            <FaRegSave className="inline mr-1" />
            Save as Draft
          </button>
          <button type="submit" className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Publish Gig
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGigPage;
