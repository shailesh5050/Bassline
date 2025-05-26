import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./user.routes.js";
import cors from "cors";
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

// CORS configuration
app.use(cors());  // Most permissive configuration for testing

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/user', userRoutes);
app.get('/', (req, res) => {
  res.send('This is the User Service API'); 
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port '+port);
  connectDB();  
});