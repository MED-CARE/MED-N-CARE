import express from "express";
import { createOrder, updateOrderStatus, getUserOrders } from "../controllers/order.controller.js";
import upload from "../utils/multer.util.js";

const orderRouter = express.Router();

orderRouter.post("/place", upload.array('prescription', 10), createOrder);
orderRouter.post("/getorders", getUserOrders);
orderRouter.put('/update/:id', updateOrderStatus);

export { orderRouter };
