// const express = require('express');
// const mongoose = require('mongoose');
// const invitationRoutes = require('./routes/invitationRoutes');
import express from 'express';
import mongoose from 'mongoose';
import invitationRoute from './route/invitationRoute.js';
import userRoute from "./route/userRoute.js";
import groupRoute from "./route/groupRoute.js";
import todoRoute from "./route/todoRoute.js"; // added by koshiro
// import shoppingRoute from "./route/shoppingRoute.js"; // added by koshiro
import connectDb from './db.js';
import dotenv from 'dotenv';
import passport from "passport";
import authRoute from "./route/authRoute.js";
import session from 'express-session';
import passportStrategies from './passport.js';

dotenv.config();
const app = express();
connectDb();



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
console.log(passport.initialize());
console.log(passport.session());
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB (assuming you have a local MongoDB instance running)
// mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use("/auth", authRoute);
app.use("/group", groupRoute);
app.use("/invite", invitationRoute);
app.use("/todo", todoRoute); // added by koshiro

// added by koshiro
// app.use(todoRoute);
// app.use(shoppingRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
