// controllers/order.controller.js
import { Order } from "../models/order.model.js";
import { sendOrderNotif } from "../utils/nodemailer.util.js";
import { Pharmacy } from "../models/pharmacy.model.js";
import { User } from "../models/user.model.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      pharmacyId,
      customDetails,
      name,
      email,
      phoneNumber,
      address,
    } = req.body;
    const prescription = req.files ? req.files.map((file) => file.path) : [];

    const newOrder = new Order({
      user: userId,
      pharmacy: pharmacyId,
      prescription,
      customDetails,
      name,
      email,
      phoneNumber,
      address,
    });

    await newOrder.save();
    await sendOrderNotif(email, name, address, phoneNumber);
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while placing order",
    });
  }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { email } = req.body; // Assuming authentication middleware provides the user

    const orders = await Order.find({ email: email }).populate("pharmacy");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching orders",
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating order status",
    });
  }
};

export { createOrder, getUserOrders, updateOrderStatus };
