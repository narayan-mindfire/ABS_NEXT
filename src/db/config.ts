const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("connecting to mongodb");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
