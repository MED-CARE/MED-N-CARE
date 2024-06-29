// models/order.model.js
import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pharmacy: {
    type: Schema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  },
  prescription: {
    type: [String],
    required: true,
  },
  customDetails: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  isSubscription:{
    type: Boolean,
  },
  subscriptionFrequency:{
    type: Number
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export { Order };
