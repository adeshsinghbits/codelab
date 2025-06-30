/* This code snippet is defining a Mongoose schema for a "Gig" model in a Node.js application using
MongoDB as the database. Here's a breakdown of what the code is doing: */
import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  deliveryTimeInDays: { type: Number, default: 0 },
  startingPrice: { type: Number, default: 0 },
  skills: [String],

  isTopRated: { type: Boolean, default: false },

  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  views: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  ordersCompleted: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  rating: { type: Number, default: 0.0 },
  viewedBy: [{ type: String }],

}, { timestamps: true });

export default mongoose.model('Gig', gigSchema);
