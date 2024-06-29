import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    if (db) {
      console.log(`Connected to ${db.connection.name} database.`);
    }
  } catch (e) {
    console.log("Error while connecting to Database.");
  }
};

export { connectdb };
