import express from 'express';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

let findUserByEmail = (email) => User.findOne({ email });
let findUserByUsername = (username) => User.findOne({ username });


let createUser = (body, hash) => new User({
  fullName: body.fullName,
  username: body.username,
  email: body.email,
  password: hash,
});

let createToken = (payload) => jwt.sign(payload, process.env.JWT, { expiresIn: "2h" });

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await findUserByEmail(req.body.email).populate("group");
    if (existingUser) {
      return res.status(401).json({ message: "User Already Exist!" });
    }
    // hash the password, 10 is the salt round (the higher the more secure)
    const hash = await bcrypt.hash(req.body.password, 10);
    
    // create a new user
    const user = createUser(req.body, hash);

    // save the user
    const result = await user.save();

    const token = createToken({ email: result.email, userId: result._id });

    console.log(token);
    
    res.status(201).json({ message: "User created!", user: result, token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email).populate("group");
    if (!user) {
      return res.status(401).json({ message: "Auth failed no such user" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Auth failed incorrect password" });
    }

    const token = createToken({ email: user.email, userId: user._id });

    res.status(200).json({ token, expiresIn: 7200, user: user });
  } catch (e) {
    console.log(e);
  }
});

// 
router.get("/:id", async (req, res) => {
  try {
    const user = await findUserByUsername(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User could not found." });
    }
    res.status(200).json({ message: "User found!", user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id",
  async (req, res, next) => {
    await User.findOneAndRemove({ username: req.params.id}).then((user) => {
      if(!user) {
        return res.status(404).json({
          message: "User could not found."
        })
      }else{
        return res.status(200).json({
          message:"User deleted from db successfully!",
          user:user
        })
      }
    })
});

export default router

// old codes:
// import express from 'express';
// import bcrypt from "bcryptjs";
// import User from '../model/user.js';
// import { generateToken } from '../controller/authController.js';

// const router = express.Router();

// // Login user
// export const login = async (req, res, next) => {
 
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.send(400, "User does not exist");
//     const isCorrect = await bcrypt.compare(password, user.password);

//     if (!isCorrect) return res.send(400, "Invalid credentials");
//     const token = generateToken(user._id); // call function that generate token
//     // const { password, ...othersData } = user._doc;
//     // console.log(user._doc);
//     // below code could be wrong? by koshiro

//     res
//       .status(200)
//       .json({ token, ...user._doc });

//   } catch (err) {
//     return res.status(500).json(err.message);
//   }
// };

// // Register user
// export const register = async (req, res, next) => {
//   try {
//     const { fullName, email, username, avatar, password } = req.body;
//     const user = await User.findOne({ email });

//     if(user) return res.send("Email already exists");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({
//       fullName,
//       email,
//       username,
//       userInformation:{
//         avatar
//       },
//       password: hashedPassword
//     });

//     await newUser.save();

//     console.log(newUser);

//     const token = generateToken(newUser.id); // call function that generate token
//     return res.status(200).json({ token, ...newUser._doc });

//   } catch (err) {
//     return res.status(500).json(err.message);
//   }
// };

// // Get all users (for testing purposes)
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/login", login);
// router.post("/register", register);

// export default router;


