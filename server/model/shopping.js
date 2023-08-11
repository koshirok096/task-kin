import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Shopping = mongoose.model('Shopping', shoppingSchema);

export default Shopping;
