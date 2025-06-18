import mongoose from "mongoose"
import {Request,Response ,NextFunction} from "express"
import jwt from "jsonwebtoken"

//models
import User from "../models/user.models.js"
import Note from "../models/note.models.js"
import Album from "../models/album.models.js"
import Thought from "../models/thought.models.js"

//utils
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"
import { generateAccessToken,generateRefreshToken } from "../utils/generateTokens.js"

// interfaces
import { IUserAuthMiddleware } from "../interfaces/validation.interfaces.js"; 
import asyncHandler from "../utils/asyncHandler.js"
interface MulterRequest extends Request{
  body:{
    albumId?:mongoose.Types.ObjectId
  },
  file?:Express.Multer.File,
  files?:Express.Multer.File[]
}

interface AuthenticatedUserRequest extends Request{
  user:IUserAuthMiddleware
}

type LoginBody={
  username:string,
  password:string
}

//userSignup validation   ->
const userSignup=asyncHandler(async(req:Request,res:Response)=>{
  const {username,password}= req.body;
  
  if(await User.exists({
    username
  })){
    throw new ApiError(409,"User with that username already exists")
  }

  try {
    const user = await User.create({
      username,
      password
    })
    res.status(201).json(
      new ApiResponse(201,"User signed up successfully")
    )
  } catch (err) {
    throw new ApiError(500,"Couldn't create the user",err);
  }

})

const userLogin=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  const {username,password}:LoginBody=req.body;
  try {
    // console.log('username : '+username);
    // console.log("password : "+password);
    
    
    const user = await User.findOne({
      username
    });

    if(!user){
      throw new ApiError(404,"User does not exists");
    }
  
    if(!await user.comparePassword(password)){
  
      console.log("Incorrect password");
      res.status(401).json(
        new ApiError(401,"Incorrect Password")
      )
    } else {
      console.log("Login successfull");
      const payload={
        _id:user._id,
        username:user.username,
        partnerId:user.partnerId?user.partnerId:null
      }
  
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      user.refreshToken = refreshToken;
      await user.save();
  
      res.status(200)
      .cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
      })
      .json(
        new ApiResponse(200,"Login successfull",{
          accessToken,
          refreshToken,
          user:{
            _id:user._id,
            username:user.username,
            partnerId:user.partnerId?user.partnerId:null
          }
        })
      )

    }
  } catch (error) {
    next(error)
  }
}

const userAddPartner=asyncHandler(async(req:Request,res:Response)=>{
  console.log('Inside userAddPartner');
  
  const {user1Username,user1Password,user2Username,user2Password} =req.body

  const user1=await User.findOne({
    username:user1Username,
  })

  const user2=await User.findOne({
    username:user2Username
  })

  if(!user1 || !user2){
    throw new ApiError(404,"User not found - couldn't add partner")
  } else if(!user1.comparePassword(user1Password) || !user2.comparePassword(user2Password)){
    throw new ApiError(401,"Incorrect password")
  } else if(user1.partnerId || user2.partnerId){
    throw new ApiError(409,"User already has a partner");
  }

  user1.partnerId=user2._id;
  user2.partnerId=user1._id;

  await user1.save();
  await user2.save();
  res.status(200).json(
    new ApiResponse(200,"Partner connected successfully")
  )
})

//authMiddleware  ->
const userLogout=asyncHandler(async(req:Request,res:Response)=>{

  const options = {
      httpOnly: true,
      secure: true,
  };

  const user = await User.findByIdAndUpdate(req.user!._id,{
    refreshToken:undefined
  });


  res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
      new ApiResponse(200,"Logout successfull")
    )
})

const isLoggedIn=async(req:Request,res:Response)=>{
  console.log('inside isLoggedIn');
  
  let accessToken;

  if(req&&req.cookies&&req.cookies.accessToken){
    accessToken=req.cookies.accessToken
  } else if(req && req.headers && req.headers.authorization &&req.headers.authorization.startsWith("Bearer ")){
    accessToken=req.headers.authorization.slice(7)
  }

  if(!accessToken){
    throw new ApiError(403,"User not logged in")
  }
  try {
    jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET);
    console.log('user is logged in !');
    
    res.status(200).json(
      new ApiResponse(200,"User is logged in")
    )
  } catch (error) {
    throw new ApiError(403,"Access token expired or invalid")
  }
}


export {userSignup,userLogin,userAddPartner,userLogout,isLoggedIn}