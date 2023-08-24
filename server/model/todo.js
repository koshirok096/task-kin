import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    default: 'Hello There!'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: '',
    ref: 'User'
  },
  // enum: ['inprogress', 'completed', 'created'],
  status: { type: String, default: 'inprogress' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: '',
    ref: 'User',
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

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;