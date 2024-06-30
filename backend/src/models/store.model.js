import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: [true, "Phone number is required."],
    },
    address:{
      type:String
    },
    password: {
      type: String,
    },
    type:{
        type: String,
        default: "owner"
    }
  },
  { timestamps: true }
);

const Store = new mongoose.model("Store", storeSchema);

export { Store };
