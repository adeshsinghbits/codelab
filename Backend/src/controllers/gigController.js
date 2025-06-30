import Gig from '../models/Gig.model.js';
import mongoose from 'mongoose';

// Utility: Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @route   POST /gigs
export const createGig = async (req, res) => {
  try {
    const { title, description, category, subCategory, deliveryTimeInDays, startingPrice, skills } = req.body;
    const freelancerId = req.user?._id;

    if (!freelancerId || !title || !category || !subCategory) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const gig = await Gig.create({
      title,
      description,
      category,
      subCategory,
      deliveryTimeInDays,
      startingPrice,
      skills,
      freelancer: freelancerId,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error('Create Gig Error:', error);
    res.status(500).json({ message: 'Server error creating gig.' });
  }
};

// @route   GET /gigs
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('freelancer', 'name picture');
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gigs.' });
  }
};

// @route   GET /gigs/:id
export const getGigById = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    let gig = await Gig.findById(id).populate('freelancer', 'username picture email bio skills');

    if (!gig) return res.status(404).json({ error: 'Gig not found' });

    // Check if IP already exists
    if (!gig.viewedBy.includes(ip)) {
      gig.views += 1;
      gig.viewedBy.push(ip);
      await gig.save();
    }

    res.status(200).json(gig);
  } catch (error) {
    console.error('Error fetching gig:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @route   PUT /gigs/:id
export const updateGig = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Gig ID.' });

    const updatedGig = await Gig.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGig) return res.status(404).json({ message: 'Gig not found.' });

    res.status(200).json(updatedGig);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gig.' });
  }
};

// @route   DELETE /gigs/:id
export const deleteGig = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Gig ID.' });

    const deleted = await Gig.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Gig not found.' });

    res.status(200).json({ message: 'Gig deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gig.' });
  }
};

// @route   GET /gigs/freelancer/:freelancerId
export const getGigsByFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    console.log(freelancerId);
    
    if (!isValidObjectId(freelancerId)) {
      return res.status(400).json({ message: 'Invalid freelancer ID.' });
    }

    const gigs = await Gig.find({ freelancer: freelancerId }).populate('freelancer', 'name picture');
    res.status(200).json(gigs);
  } catch (error) {
    console.error('Error fetching freelancer gigs:', error);
    res.status(500).json({ message: 'Server error fetching freelancer gigs.' });
  }
};

// @route   PUT /gigs/:id/favorite

export const toggleFavoriteGig = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.ip; // Support both logged-in user or anonymous (by IP)

    const gig = await Gig.findById(id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    if (!gig.viewedBy.includes(userId)) {
      gig.viewedBy.push(userId);
      gig.favorites += 1;
    } else {
      gig.viewedBy = gig.viewedBy.filter(uid => uid !== userId);
      gig.favorites = Math.max(0, gig.favorites - 1);
    }

    await gig.save();
    return res.status(200).json({ message: 'Favorites updated successfully', favorites: gig.favorites });

  } catch (error) {
    console.error('Error updating favorites:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

