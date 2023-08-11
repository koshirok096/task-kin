
// code is WIP. it could be similar as todoRoute.js. 

///// shopping controller /////

// import { handleError } from "../error.js";
// import Shopping from "../models/Shopping.js";

// // ADD
// export const addShopping = async (request, response) => {
//   try {
//     const createdBy = request.user.id;
//     const newShopping = await Shopping.create({
//       title: request.body.shopping,
//       createdBy: createdBy,
//     });

//     return response.status(200).json(newShopping);
//   } catch (error) {
//     return response.status(500).json(error.message);
//   }
// }

// // GET
// export const getAllShoppings = async (request, response) => {
//   try {
//       const shoppings = await Shopping.find({}).sort({ 'createdAt': -1 });

//       return response.status(200).json(shoppings);
//   } catch (error) {
//       return response.status(500).json(error.message);
//   }
// }

// // COMPLETE
// export const toggleShoppingDone = async (request, response) => {
//   try {
//       const shoppingRef = await Shopping.findById(request.params.id);

//       const shopping = await Shopping.findOneAndUpdate(
//           { _id: request.params.id },
//           { completed: !shoppingRef.completed }
//       );

//       await shopping.save();

//       return response.status(200).json(shopping);
//   } catch (error) {
//       return response.status(500).json(error.message);
//   }
// }

// // UPDATE
// export const updateShopping = async (request, response) => {
//   try {
//       await Shopping.findOneAndUpdate(
//           { _id: request.params.id },
//           { title: request.body.title }
//       );

//       const shopping = await Shopping.findById(request.params.id);

//       return response.status(200).json(shopping);
//   } catch (error) {
//       return response.status(500).json(error.message);
//   }
// }

// // DELETE
// export const deleteShopping = async (request, response) => {
//   try {
//       const shopping = await Shopping.findByIdAndDelete(request.params.id);

//       return response.status(200).json(shopping);
//   } catch (error) {
//       return response.status(500).json(error.message);
//   }
// }


///// shopping route /////

// import express from "express";
// import {
//   addShopping,
//   getAllShoppings,
//   toggleShoppingDone,
//   updateShopping,
//   deleteShopping,
// } from "../controllers/shopping.js";
// import { verifyToken } from "../verifyToken.js";

// const router = express.Router();

// router.post('/:id', verifyToken, addShopping);
// router.get('/', verifyToken, getAllShoppings);
// router.get('/:id', verifyToken, toggleShoppingDone);
// router.put('/:id', verifyToken, updateShopping);
// router.delete('/:id', verifyToken, deleteShopping);

// export default router;
