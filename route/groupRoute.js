// const express = require('express');
// const router = express.Router();
// const Group = require('../models/group');
import express from 'express';
const router = express.Router();
import Group from '../model/group.js';

// Create a new group
router.post('/groups', async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).send(group);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all groups (for testing purposes)
router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;