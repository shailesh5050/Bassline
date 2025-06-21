import express from 'express'
import dotenv from 'dotenv'
import routes from './router.js'
dotenv.config()

const app = express()
const PORT =process.env.PORT;
app.use('api/v1/song',routes)
app.listen(PORT,()=>{
    console.log("Song service is running on PORT "+PORT)
})