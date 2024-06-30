import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      // required: [true, "Name is required."],
    },
    age: {
      type: Number,
      // required: [true, "Age is required."],
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
    location: {
      lat: {
        type: Number,
        required: true,
        default: 22.569859,
      },
      long: {
        type: Number,
        required: true,
        default: 88.364241,
      },
    },
    type:{
      type: String,
      required: true,
      enum: ["user", "pharmacist", "admin"]
    },
    biodata: {
      height: {
        type: Number,
        // default: 180,
      },
      weight: {
        type: Number,
        // default: 70,
      },
      bloodGroup: {
        type: String,
      },
      bmi: {
        type: Number,
      },
    },
    disease: {
      type: [String],
      default: null,
    },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export { User };
