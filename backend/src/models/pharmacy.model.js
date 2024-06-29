import mongoose, { Schema } from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    storePic: {
      type: [String],
    },

    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    city:{
      type:String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    gmapLink: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    // review: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: Review,
    //   },
    // ],
    rating: {
      type: Number,
      default: 0.0,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], // 'Point' is the type for GeoJSON points
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);
pharmacySchema.index({ location: '2dsphere' });
const Pharmacy = new mongoose.model("Pharmacy", pharmacySchema);

export { Pharmacy };
