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
  assingTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: '',
    ref: 'User'
  },
  // enum: ['inprogress', 'completed', 'created'],
  status: { type: String, default: 'created' },
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

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;