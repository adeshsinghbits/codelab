import Order from '../models/Order.model.js';
import Gig from '../models/Gig.model.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Create new Order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { gig, amount, deliveryDate } = req.body;
    const clientId = req.user?._id;

    if (!gig || !amount || !clientId) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (!isValidObjectId(gig)) return res.status(400).json({ message: 'Invalid Gig ID.' });

    const gigExists = await Gig.findById(gig);
    if (!gigExists) return res.status(404).json({ message: 'Gig not found.' });

    const order = await Order.create({
      gig,
      clientId,
      amount,
      deliveryDate,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Error creating order.' });
  }
};

// @desc    Get all orders for user
// @route   GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.user?._id;

    const orders = await Order.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    }).populate('gig');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders.' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Order ID.' });

    const validStatuses = ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status update.' });
    }

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found.' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order.' });
  }
};
