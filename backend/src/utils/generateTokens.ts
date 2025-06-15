import jwt from "jsonwebtoken"

import asyncHandler from "./asyncHandler.js";
import mongoose from "mongoose";

interface IPayload{
  _id:mongoose.Types.ObjectId,
  username:string,
  partnerId?:string
}

const generateAccessToken=(payload)=>{
  const token = jwt.sign(payload,process.env.JWT_ACCESS_TOKEN_SECRET);
  return token;
}

const generateRefreshToken=(payload)=>{
  const token = jwt.sign(payload,process.env.JWT_ACCESS_TOKEN_SECRET);
  return token;
}

export {generateAccessToken,generateRefreshToken}