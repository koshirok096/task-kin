///// todo controller /////

import Todo from "../models/Todo.js";

// ADD
export const addTodo = async (request, response) => {
  try {
    const createdBy = request.user.id;
    const newTodo = await Todo.create({
      title: request.body.todo,
      createdBy: createdBy,
    });

    return response.status(200).json(newTodo);
  } catch (error) {
    return response.status(500).json(error.message);
  }
}

// GET
export const getAllTodos = async (request, response) => {
  try {
      const todos = await Todo.find({}).sort({ 'createdAt': -1 });

      return response.status(200).json(todos);
  } catch (error) {
      return response.status(500).json(error.message);
  }
}

// COMPLETE
export const toggleTodoDone = async (request, response) => {
  try {
      const todoRef = await Todo.findById(request.params.id);

      const todo = await Todo.findOneAndUpdate(
          { _id: request.params.id },
          { completed: !todoRef.completed }
      );

      await todo.save();

      return response.status(200).json(todo);
  } catch (error) {
      return response.status(500).json(error.message);
  }
}

// UPDATE
export const updateTodo = async (request, response) => {
  try {
      await Todo.findOneAndUpdate(
          { _id: request.params.id },
          { title: request.body.title }
      );

      const todo = await Todo.findById(request.params.id);

      return response.status(200).json(todo);
  } catch (error) {
      return response.status(500).json(error.message);
  }
}

// DELETE
export const deleteTodo = async (request, response) => {
  try {
      const todo = await Todo.findByIdAndDelete(request.params.id);

      return response.status(200).json(todo);
  } catch (error) {
      return response.status(500).json(error.message);
  }
}


///// todo route /////

import express from "express";
import {
  addTodo,
  getAllTodos,
  toggleTodoDone,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post('/:id', verifyToken, addTodo);
router.get('/', verifyToken, getAllTodos);
router.get('/:id', verifyToken, toggleTodoDone);
router.put('/:id', verifyToken, updateTodo);
router.delete('/:id', verifyToken, deleteTodo);

export default router;