import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log('Server is running on port '+ port);
});