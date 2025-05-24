import express from "express"
import morgan from "morgan"
import { config } from "./config.js";


const app=express()
const port=process.env.PORT


app.listen(config.port,()=>console.log(`Auth Service running in ${port}`))
