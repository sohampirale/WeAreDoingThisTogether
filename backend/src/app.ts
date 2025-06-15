import * as dotenv from 'dotenv'
dotenv.config();
import fs from "fs"
import express from "express";
import cookieParser from "cookie-parser"
//utils
import {connectDB} from "./utils/connectDB.js"

//routers
import userRouter from './routes/user.routes.js';
import { v2 as cloudinary } from "cloudinary";




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


const app = express();

app.use((req,res,next)=>{
  console.log("New Request at backend")
  next();
})

app.use(cookieParser());
app.use(express.json());

app.get("/hello",(req,res)=>{
  res.send("Hello world")
})

app.use("/api/v1/user",userRouter);


connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`);
  })
})

export {app}