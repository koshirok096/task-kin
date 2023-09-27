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
import db from './db/db.js';
import dotenv from 'dotenv';
import session from 'express-session';
import header_middleware from './middleware/header.js';

import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(header_middleware);
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());



// Connect to MongoDB (assuming you have a local MongoDB instance running)
// mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use("/auth", userRoute);
app.use("/group", groupRoute);
app.use("/invite", invitationRoute);
app.use("/todo", todoRoute); // added by koshiro

// added by koshiro
// app.use(todoRoute);
// app.use(shoppingRoute);

// const PORT = process.env.NODE_ENV || 3001; // 環境変数 NODE_ENV が設定されていればそれを使用し、設定されていない場合はデフォルトのポート 3001 を使用
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
