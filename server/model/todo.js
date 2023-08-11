import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: 'Hello There!'
  },
  personInCharge: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: '',
    ref: 'User'
  },
  completed: {
    type: Boolean,
    default: false
  },
  // date: {
  //   // store date and time of task, could be stored only date
  // },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
