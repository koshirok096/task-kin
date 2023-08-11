import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../model/user.js';

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(handleError(404, "User not found"));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "Wrong password"));
    const token = generateToken(user._id); // call function that generate token
    const { password, ...othersData } = user._doc;

    // below code could be wrong? by koshiro

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json({ token, ...othersData });
  } catch (err) {
    next(err);
  }
};

// Get all users (for testing purposes)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT, {
    expiresIn: '1h',
    // headers: {
    //   typ: 'JWT'
    // }
  });
  return token;
};

export default router;


