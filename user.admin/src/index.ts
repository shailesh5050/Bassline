import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import adminRoutes from  './routes.js';
import cloudinary from 'cloudinary';
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

  
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const app = express();
const port = process.env.PORT || 8001;
app.use(cors())
async function initDB(){
    try {
        await sql `CREATE TABLE IF NOT EXISTS albums
         ( id SERIAL PRIMARY KEY,
           title VARCHAR(255) NOT NULL,
           description VARCHAR(255),
           thumbnail VARCHAR(255) NOT NULL,
           artist VARCHAR(255), year INTEGER)`;

        await sql `CREATE TABLE IF NOT EXISTS song
         ( id SERIAL PRIMARY KEY,
           title VARCHAR(255) NOT NULL,
           description VARCHAR(255),
           thumbnail VARCHAR(255),
           album_id INTEGER REFERENCES album(id) ON DELETE SET NULL,
           audio VARCHAR(255) NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           artist VARCHAR(255), year INTEGER)`;
           console.log('DB initialized');
    } catch (error) {
        console.log(error);
    }
}
app.use(express.json());
app.use('/api/v1',adminRoutes);
initDB().then(() => { 
app.listen(port, () => {
    console.log('Admin Service is running on port '+ port);
});

})