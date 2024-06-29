import express from "express";
import upload from "../utils/multer.util.js";
import {
    addLab,
    labById,
    searchLab,
    updateLab
} from "../controllers/lab.controller.js";
import { nearbyLabs } from "../controllers/lab.controller.js";
    
const labRouter = express.Router();

labRouter.post("/add", upload.array('labPic', 20), addLab);
labRouter.get("/getbyId/:id", labById);
labRouter.get("/search", searchLab);
labRouter.get("/nearby", nearbyLabs);
labRouter.post("/update/:id", updateLab);
export { labRouter };
