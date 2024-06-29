import express from "express";
import upload from "../utils/multer.util.js";
import {
    addDoctor,
    updateDoctor
} from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.post("/add", upload.single('profilePic'), addDoctor);
doctorRouter.post("/update/:id", upload.single('profilePic'), updateDoctor);
export { doctorRouter };
