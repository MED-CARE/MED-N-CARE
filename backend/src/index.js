import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { connectdb } from "./db/index.js";
import { userRouter } from "./routes/user.route.js";
import { hospitalRouter } from "./routes/hospital.route.js";
import { doctorRouter } from "./routes/doctor.route.js";
import { pharmacyRouter } from "./routes/pharmacy.route.js";
import { appointmentRouter } from "./routes/appointment.route.js";
import { orderRouter } from "./routes/order.route.js";
import { labRouter } from "./routes/lab.route.js";
import authRoute  from "./routes/auth.route.js";

//middlewares
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

connectdb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/hospital", hospitalRouter)
app.use("/uploads", express.static("uploads"));
app.use("/api/doctor", doctorRouter)
app.use("/api/pharmacy", pharmacyRouter)
app.use("/api/appointment", appointmentRouter)
app.use("/api/order", orderRouter)
app.use("/api/lab", labRouter)
app.use('/api/auth', authRoute);


app.listen(process.env.PORT, () => {
  console.log(`✨ Server is running on port ${process.env.PORT}. ✨`);
});
