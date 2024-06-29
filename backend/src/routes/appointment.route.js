import express from "express";
import { bookAppointment, updateAppointmentStatus } from "../controllers/appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", bookAppointment);
appointmentRouter.put('/update/:id', updateAppointmentStatus);

export { appointmentRouter };
