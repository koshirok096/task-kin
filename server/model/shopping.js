import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  status: { type: String, enum: ['inprogress', 'completed', 'created'], default: 'created' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

const Shopping = mongoose.model('Shopping', shoppingSchema);

export default Shopping;
