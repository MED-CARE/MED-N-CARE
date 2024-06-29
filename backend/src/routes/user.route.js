import express from "express"
import { login, register, getAllUsers, verifyEmail, resendOtp, updateUser, getUser } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/verify", verifyEmail)
userRouter.post("/resend", resendOtp)
userRouter.post("/login", login)
userRouter.get("/:email", getUser)
userRouter.get("/", getAllUsers)
userRouter.post("/update", updateUser)


export{ userRouter}