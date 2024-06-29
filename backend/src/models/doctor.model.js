import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    specialized: {
      type: String,
      required: true,
    },
    hospital: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Hospital" 
        }
    ],
  },
  { timestamps: true }
);

const Doctor = new mongoose.model("Doctor", doctorSchema);

export { Doctor };
