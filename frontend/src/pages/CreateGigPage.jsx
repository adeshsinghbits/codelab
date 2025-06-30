import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGig } from '../features/gig/gigThunks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
          deliveryTimeInDays: Number(form.deliveryTimeInDays)
        };
    
        await dispatch(createGig(formatted));
        toast.success('Gig created successfully');
        navigate('/marketplace');
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'category', 'subCategory'].map((field) => (
          <input key={field} name={field} placeholder={field} onChange={handleChange}
            className="w-full p-2 border rounded" required />
        ))}
        <input name="startingPrice" type="number" placeholder="Starting Price" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="deliveryTimeInDays" type="number" placeholder="Delivery Time (days)" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Create Gig</button>
      </form>
    </div>
  );
};

export default CreateGigPage;
