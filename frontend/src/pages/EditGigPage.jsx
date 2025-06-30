import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById, updateGig } from '../features/gig/gigThunks';
import { useParams, useNavigate } from 'react-router-dom';

const EditGigPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGig } = useSelector((state) => state.gig);
  const [form, setForm] = useState(null);

  useEffect(() => {
    dispatch(fetchGigById(id));
  }, [id]);

  useEffect(() => {
    if (currentGig) {
      setForm({
        title: currentGig.title,
        description: currentGig.description,
        category: currentGig.category,
        subCategory: currentGig.subCategory,
        startingPrice: currentGig.startingPrice,
        deliveryTimeInDays: currentGig.deliveryTimeInDays,
        skills: currentGig.skills.join(', '),
      });
    }
  }, [currentGig]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()),
    };
    await dispatch(updateGig({ id, data: updatedData }));
    navigate('/gigs');
  };

  if (!form) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Gig</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {['title', 'description', 'category', 'subCategory'].map(field => (
          <input key={field} name={field} value={form[field]} onChange={handleChange}
            className="w-full p-2 border rounded" required />
        ))}
        <input name="startingPrice" type="number" value={form.startingPrice} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="deliveryTimeInDays" type="number" value={form.deliveryTimeInDays} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="skills" value={form.skills} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Update Gig</button>
      </form>
    </div>
  );
};

export default EditGigPage;
