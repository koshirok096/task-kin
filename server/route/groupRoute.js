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
  const { userId } = req.user;

  console.log(req.user);
  
  try {
    if(!name) return res.status(400).send("Group name is required");

    const newGroup = new Group({
      name,
      members: [userId],
      owner: userId
    });

    await newGroup.save();

    const user = await User.findById(userId);

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const groups = await Group.findById(id);

    return res.status(200).send(groups);

  } catch (error) {
    return res.status(500).send(error.message);
  }

});

export default router;

//

// Delete a group by groupid
router.delete("/delete/:groupId", verifyUser, async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.user;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).send("Group not found");
    }

    if (group.owner.toString() !== userId) {
      return res.status(403).send("You are not the owner of this group");
    }

    await Group.findByIdAndDelete(groupId);

    const user = await User.findById(userId);
    user.groups = user.groups.filter(group => group.toString() !== groupId);
    await user.save();

    res.status(200).send("Group deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

