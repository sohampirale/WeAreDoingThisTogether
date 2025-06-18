import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {Request,Response,NextFunction,RequestHandler} from "express"

//models
import User from "../models/user.models.js"

//utils
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

//interfaces
interface decodedPayload{
  _id:string,
  username:string,
  partnerId:string
}

const authMiddleware:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
  console.log('Inside authMiddleware');

  // const accessToken = (req.cookies?.accessToken?req.cookies.accessToken:false) || (req.headers?.authorization?.startsWith('Bearer ')?req.headers.authorization.slice(7):false);
  let accessToken;
  if(req&&req.cookies&&req.cookies.accessToken){
    accessToken=req.cookies.accessToken
  } else if(req && req.headers && req.headers.authorization &&req.headers.authorization.startsWith("Bearer ")){
    accessToken=req.headers.authorization.slice(7)
  }

  // console.log('accessToken = '+accessToken);
  
  if(!accessToken){
    throw new ApiError(401,"Access Token not found")
  }

  try {
    const decoded=jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET!) as decodedPayload;
    const {_id} = decoded;
    const user= await User.findById(_id).select("-password");
    if(!user){
      throw new ApiError(401,"User not found");
    }
    req.user={
      _id:user._id,
      username:user.username,
      partnerId:user.partnerId,
      avatar:user.avatar
    };
  } catch (error) {
    throw new ApiError(401,"Invalid access token"); 
  }
  console.log('authMiddleware passed successfully!');
  next();
}

export default authMiddleware