import express from 'express';
import bcrypt from "bcryptjs";
import User from '../model/user.js';
import { generateToken } from '../controller/authController.js';

const router = express.Router();

// Login user
export const login = async (req, res, next) => {
 
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.send(400, "User does not exist");
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) return res.send(400, "Invalid credentials");
    const token = generateToken(user._id); // call function that generate token
    // const { password, ...othersData } = user._doc;
    // console.log(user._doc);
    // below code could be wrong? by koshiro

    res
      .status(200)
      .json({ token, ...user._doc });

  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Register user
export const register = async (req, res, next) => {
  try {
    const { fullName, email, username, avatar, password } = req.body;
    const user = await User.findOne({ email });

    if(user) return res.send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      username,
      userInformation:{
        avatar
      },
      password: hashedPassword
    });

    await newUser.save();

    console.log(newUser);

    const token = generateToken(newUser.id); // call function that generate token
    return res.status(200).json({ token, ...newUser._doc });

  } catch (err) {
    return res.status(500).json(err.message);
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

router.post("/login", login);
router.post("/register", register);

export default router;


