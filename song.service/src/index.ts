import express from 'express'
import dotenv from 'dotenv'
import routes from './router.js'
import redis , {createClient} from 'redis'
import cors from 'cors'

dotenv.config()

// Initialize Redis client
export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-17840.c258.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 17840
  }
});

// Connect to Redis
redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });


const app = express()
app.use(cors())
const PORT =process.env.PORT;
app.use('/api/v1',routes)
app.listen(PORT,()=>{
    console.log("Song service is running on PORT "+PORT)
})