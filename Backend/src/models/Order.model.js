import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'],
    default: 'pending'
  },
  amount: { type: Number, required: true },
  deliveryDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
