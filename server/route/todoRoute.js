import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import Todo from "../model/Todo.js";

const router = express.Router();

// ADD
export const addTodo = async (req, res) => {
  const { id } = req.user;
  const { title, description, groupId, assingTo, startDate, endDate } = req.body;

  if (!title) return res.status(400).send("Title is required");
  if (!description) return res.status(400).send("Description is required");
  if (!groupId) return res.status(400).send("Group is required");
  if (!startDate) return res.status(400).send("Start date is required");
  if (!endDate) return res.status(400).send("End date is required");

  try {
    const todo = new Todo({
      title,
      description,
      groupId,
      assingTo,
      startDate,
      endDate,
      createdBy: id,
    });
    await todo.save();
    res.status(201).send(todo);

  } catch (error) {
    return res.status(400).send(error.message);
  }
}
//GET
export const getGroupTodos = async (req, res) => {
  const { groupId } = req.params;

  try {
    const todos = await Todo.find({ groupId });
    res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
// UPDATE
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, assingTo, startDate, endDate, status } = req.body;

  try {

    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { title, description, assingTo, startDate, endDate, status },
      { new: true }
    );
    res.status(200).send(todo);

  } catch (error) {

    return res.status(500).send(error.message);

  }
}
// DELETE
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {

    await Todo.findByIdAndDelete(id);
    res.status(200).send("Todo deleted successfully");

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

router.post('/create', verifyUser, addTodo);
router.get('/:groupId', verifyUser, getGroupTodos);
router.put('/:id', verifyUser, updateTodo);
router.delete('/:id', verifyUser, deleteTodo);
export default router;