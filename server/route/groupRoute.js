// const express = require('express');
// const router = express.Router();
// const Group = require('../models/group');
import express from 'express';
const router = express.Router();
import Group from '../model/group.js';
import { verifyUser } from '../middleware/verifyUser.js';
import User from '../model/user.js';

// Create a new group
router.post('/create', verifyUser, async (req, res) => {
  const { name } = req.body;
  const { id } = req.user;
  
  try {
    if(!name) return res.status(400).send("Group name is required");

    const newGroup = new Group({
      name,
      members: [id],
      owner: id
    });

    await newGroup.save();

    const user = await User.findById(id);

    // group is an array of group ids
    user.group.push(newGroup._id);

    await user.save();

    res.status(201).send(newGroup);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all groups (for testing purposes)
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a group by id
router.get("/:id", verifyUser, async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if(!group) return res.status(404).send("Group not found");

    return res.status(200).send(group);
  } catch (error) {
    // return error message

    return res.status(500).json({
      error
    });
  }
})

export default router;