import * as dotenv from 'dotenv'
dotenv.config();
import express,{Request,Response,NextFunction} from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

//utils
import {connectDB} from "./utils/connectDB.js"
import ApiError from './utils/ApiError.js';
//routers
import userRouter from './routes/user.routes.js';
import albumRouter from './routes/album.routes.js';
import thoughtRouter from './routes/thought.routes.js';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const app = express();

const allowedOrigins=["https://cautious-funicular-x5v49945gprwcv9px-5173.app.github.dev","https://vigilant-garbanzo-wrvgj6vppjxg29v99-5173.app.github.dev"]

app.use(cors({
  origin:function(origin,callback){
    console.log("Origin = "+origin);
    
    if(!origin)callback(null,true);

    if(allowedOrigins.includes(origin)){
      console.log("allowed");
      
      callback(null,true)
    } else {
      callback(new ApiError(403,"This frontend website is not allowed"))
    }
  },
  credentials:true
}));

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
app.use("/api/v1/album",albumRouter);
app.use("/api/v1/thought",thoughtRouter);

app.use((err:ApiError,req:Request,res:Response,next:NextFunction)=>{
  console.log('Inside global handling middleware');
  console.log("ERROR : "+JSON.stringify(err));
  
  res.status(err.statusCode||500).json({
    message:err.message,
    success:false
  })
  
})

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`);
  })
})

export {app}