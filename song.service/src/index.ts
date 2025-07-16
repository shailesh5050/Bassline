import express from 'express'
import dotenv from 'dotenv'
import routes from './router.js'
import redis , {createClient} from 'redis'
import cors from 'cors'

dotenv.config()

// Initialize Redis client with better error handling
export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-17840.c258.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 17840,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.log('Too many Redis connection attempts, giving up');
        return false;
      }
      console.log(`Retrying Redis connection... Attempt ${retries}`);
      return Math.min(retries * 50, 500);
    }
  }
});

// Add error event handlers
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('ready', () => {
  console.log('Redis client ready');
});

redisClient.on('end', () => {
  console.log('Redis client disconnected');
});

// Connect to Redis with better error handling
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    console.log('Server will continue without Redis caching');
  }
};

// Connect to Redis
connectRedis();


const app = express()
app.use(cors())
const PORT =process.env.PORT;
app.use('/api/v1',routes)
app.listen(PORT,()=>{
    console.log("Song service is running on PORT "+PORT)
})