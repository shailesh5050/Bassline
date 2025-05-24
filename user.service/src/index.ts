import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config(); // Add this line to load .env variables
const app = express();

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string,{ // Changed MONGO_URI to MONGODB_URI
      dbName:process.env.DB_NAME
    });
    //green color console.log
    console.log('\x1b[32m', 'Connected to MongoDB');
    
  } catch (error) {
    // Handle the error in red color
    console.error('\x1b[31m', 'Error connecting to MongoDB:', error);
  }
}
connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port '+port);
});