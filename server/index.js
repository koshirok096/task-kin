// const express = require('express');
// const mongoose = require('mongoose');
// const invitationRoutes = require('./routes/invitationRoutes');
import express from 'express';
import mongoose from 'mongoose';
import invitationRoute from './route/invitationRoute.js';
import userRoute from "./route/userRoute.js";
import groupRoute from "./route/groupRoute.js";
// import todoRoute from "./route/todoRoute.js"; // added by koshiro
// import shoppingRoute from "./route/shoppingRoute.js"; // added by koshiro
import dotenv from 'dotenv';

dotenv.config();
const app = express();


// Connect to MongoDB (assuming you have a local MongoDB instance running)
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(userRoute);
app.use(groupRoute);
app.use(invitationRoute);

// added by koshiro
// app.use(todoRoute);
// app.use(shoppingRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
