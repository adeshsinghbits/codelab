import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById, toggleFavoriteGig } from '../../features/gig/gigThunks';
import { createRequest } from '../../features/request/requestThunk'; 
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../../features/order/orderThunks';
import {
  FaStar, FaHeart, FaEye, FaClipboardList, FaCheck, FaBolt, FaClock
} from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";

const GigDetails = () => {
  const { gigId: id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentGig, loading } = useSelector((state) => state.gig);
  const { user } = useSelector((state) => state.auth); // get logged-in user
  
  useEffect(() => {
    dispatch(fetchGigById(id));
  }, [id, dispatch]);

  if (loading || !currentGig) {
    return <div className="text-center mt-20 text-xl text-gray-600">Loading gig details...</div>;
  }

  const handleOrder = async () => {
    const orderData = {
      gig: id,
      amount: currentGig.startingPrice,
      deliveryDate: new Date(Date.now() + currentGig.deliveryTimeInDays * 86400000),
    };
    await dispatch(createOrder(orderData));
    navigate('/orders');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentGig.title,
          text: currentGig.description,
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

  const handleClick = async () => {
    try {
      const wasFavorited = currentGig.viewedBy?.includes(user?._id || user?.email || '');

      await dispatch(toggleFavoriteGig(currentGig._id)).unwrap();
      dispatch(fetchGigById(currentGig._id)); // Refresh gig details

      if (wasFavorited) {
        toast.success('Removed from your favorites.');
      } else {
        toast.success('Added to your favorites.');
      }
    } catch (err) {
      toast.error(err || 'Failed to update favorite.');
    }
  };
   const handleContact = async () => {
  try {
    if (!freelancer || !freelancer._id) {
      toast.error("Freelancer not found");
      return;
    }

    await dispatch(createRequest(freelancer._id));

    // Optionally, redirect to chat page if you want:
    // navigate("/chats");
  } catch (err) {
    console.error(err);
    toast.error("Unable to contact freelancer");
  }
};
const isFavorited = currentGig.viewedBy?.includes(user?._id || user?.email || '');
  
const {freelancer} = currentGig;
  
  return (
    <div className="p-6 max-w-7xl md:ml-80 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/marketplace" className="text-sm text-blue-600">&larr; Back to Marketplace</Link>
          <div className="flex gap-2">
            <button onClick={handleShare} className="border border-green-500 text-green-600 hover:bg-green-50 p-2 rounded-md">
              <IoShareSocialOutline />
            </button>
            <button
              onClick={handleClick}
              className={`text-xl transition-all duration-200 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            >
              {isFavorited ? <FaHeart /> : <CiHeart />}
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-purple-50 p-6 rounded-xl shadow-md relative">
          <div className="flex items-center justify-between">
            <div>
              {currentGig.isTopRated && (
                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium mb-2">
                  Top Rated
                </span>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span><FaEye className="inline" /> {currentGig.views} views</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{currentGig.category}</span>
              </div>
              <h1 className="text-2xl font-bold mt-2">{currentGig.title}</h1>
              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <span>⭐ {currentGig.rating.toFixed(1)} ({currentGig.ordersCompleted} reviews)</span>
                <span>📦 {currentGig.ordersCompleted} orders completed</span>
                <span>🚚 {currentGig.deliveryTimeInDays} delivery</span>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-green-600">₹{currentGig.startingPrice}</h2>
              <p className="text-sm text-gray-500">Starting at</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <img src={freelancer?.picture || '/default-avatar.png'} className="w-10 h-10 rounded-full" alt="Freelancer" />
            <div>
              <p className="font-medium">{freelancer?.username}</p>
              <p className="text-xs text-gray-500">Remote · Online</p>
            </div>
          </div>
        </div>

        {/* About This Gig */}
        <div className="bg-purple-100/30 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">📄 About This Gig</h3>
          <p className="text-gray-700">{currentGig.description}</p>
          <div className="mt-3">
            <h4 className="font-medium text-sm">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {currentGig.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* About Freelancer */}
        <div className="bg-green-50 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">👤 About the Freelancer</h3>
          <div className="flex items-center gap-4">
            <img src={freelancer?.picture || '/default-avatar.png'} className="w-14 h-14 rounded-full" alt="Freelancer" />
            <div>
              <p className="font-bold">{freelancer?.username}</p>
              <p className="text-sm text-gray-600">Remote · Online now</p>
              <p className="text-gray-700 mt-2 text-sm">
                {freelancer?.bio || 'Experienced professional ready to help with your project. Contact for more details.'}
              </p>
              <div className="flex gap-6 mt-2 text-sm">
                <span>⭐ 4.9</span>
                <span>⚡ 98% Response Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Pricing */}
        <div className="bg-purple-100 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-purple-800">💲 Pricing</h3>
          <p className="text-2xl font-bold text-green-600">₹{currentGig.startingPrice}</p>
          <ul className="mt-4 text-sm text-gray-700 space-y-2">
            <li><FaClock className="inline mr-2" /> Delivery Time: {currentGig.deliveryTimeInDays} day(s)</li>
            <li><FaBolt className="inline mr-2" /> Category: {currentGig.category}</li>
            <li><FaBolt className="inline mr-2" /> Sub-Category: {currentGig.subCategory}</li>
            <li><FaClipboardList className="inline mr-2" /> Orders Completed: {currentGig.ordersCompleted}</li>
          </ul>
          <button onClick={handleOrder} className="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">
            Order Now
          </button>
          <button onClick={handleContact} className="mt-2 w-full border border-purple-400 text-purple-700 py-2 rounded">Contact Freelancer</button>
          <button className="mt-2 w-full border border-green-400 text-green-700 py-2 rounded">Send Interest</button>
          <div className="mt-2 text-xs flex justify-between text-gray-500">
            <span>✅ Secure Payment</span>
            <span>✅ Quality Guarantee</span>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-orange-50 p-6 rounded-xl shadow-md">
          <h4 className="font-semibold text-orange-600 mb-4">📊 Gig Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="text-xl font-bold">{currentGig.views}</p>
              <p className="text-gray-600">Views</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{currentGig.favorites}</p>
              <p className="text-gray-600">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{currentGig.totalOrders}</p>
              <p className="text-gray-600">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{currentGig.rating.toFixed(1)}</p>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* Suggested Gigs */}
        <div className="bg-blue-50 p-4 rounded-xl shadow-md text-center">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Recommended for You</h4>
          <p className="text-xs text-gray-500 mb-2">Discover more amazing gigs in this category</p>
          <Link to="/marketplace" className="text-blue-700 font-medium hover:underline">Browse Similar Gigs →</Link>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
