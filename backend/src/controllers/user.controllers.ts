import mongoose from "mongoose"
import {Request,Response ,NextFunction} from "express"

//models
import User from "../models/user.models.js"
import Note from "../models/note.models.js"
import Album from "../models/album.models.js"
import Thought from "../models/thought.models.js"

//utils
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"

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

type LoginBody={
  username:string,
  password:string
}

const userLogin=async(req:Request,res:Response):Promise<void>=>{
  const {username,password}:LoginBody=req.body;
  const user = await User.findOne({
    username
  });

  if(!user){
    console.log("User does not exists");
    return;
  }

  if(!user.comparePassword(password)){
    console.log("Incorrect password");
    res.status(401).json(
      new ApiError(401,"Incorrect Password")
    )
  } else {
    console.log("Login successfull");
    res.status(200).json(
      new ApiResponse(200,"Login successfull")
    )
  }
}

//auth middleware(req.user)  -> addNoteInThoughtValidation()  -> route handler
const addNoteInThought=async(req:Request,res:Response):Promise<void>=>{
  const {note,thoughtId} :{note:string,thoughtId:mongoose.Types.ObjectId} = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if(!thought){
      throw new ApiError(404,"Thought not found - Invalid thought id")
    }

    const createdNote= await Note.create({
      note,
      owner:req.user!._id
    })

    thought.notes.push(createdNote._id);
    await thought.save();
  } catch (error) {
    throw new ApiError(500,"Error while adding new note in the Thought");
  }

  res.status(201).json(
    new ApiResponse(200,"New note posted successfully")
  )
}

const createAlbum=async (req:Request,res:Response):Promise<void>=>{
  const {title}:{title:string} = req.body;
  
  if(await Album.exists({
    title
  })){
      throw new ApiError(409,"Album with that title already exists")
  } 

  try {
    const album = await Album.create({
      title,
      notes:[],
      images:[],
      owner:req.user!._id
    })

    res.status(201).json(new ApiResponse<typeof album>(201,`Album : ${title} created successfully`,album));
    return 
  } catch (error) {
    throw new ApiError(500,"Failed to create the Album("+title+")")
  }
}

//authMiddleware  ->  createThoughtValidation   ->  route handler
const createThought=async(req:Request,res:Response):Promise<void>=>{
  const {title} = req.body;

  try {

    const thought = await Thought.create({
      title,
      owner:req.user!._id
    })

    res.status(201).json(
      new ApiResponse(201,"New Thought created successfully")
    )
    return;
  } catch (error) {
    throw new ApiError(500,"Error creating Thought")
  }
}

//authMiddleware -> uplodImagesValidation -> route handler
/**
 * 1.fetch the album
 * 2.upload all images on cloudinary
 * 3.append each url to album.images[]
 * 4.return
 */
const uploadImagesInAlbum=async(req:MulterRequest,res:Response,next:NextFunction)=>{
  console.log('Inside uploadImagesInAlbum');
  
  const files = req.files!;
  const {albumId} = req.body;
  try {
    
    const album = await Album.findById(albumId);
    if(!album){
      throw new ApiError(404,"Album not found - Invalid albumId");
    }
  
    const allPaths=files!.map(obj=>{
      return obj.path
    })
  
    const allUrl=[]
    for(let i=0;i<files!.length;i++){
      try{
        const response=await uploadFileOnCloudinary(files[i].path);
        if(response && response.url){
          allUrl.push(response.url);
        }
      } catch(err){
      
      }
    }
    console.log('All files uploded to cloudinary');
    console.log('allUrl = '+allUrl);
    
    album.images.push(...allUrl);
    await album.save();
    console.log('Album saved successfully');
  } catch (error) {
    next(error);
  }
  
  return res.status(201).json(
    new ApiResponse(201,files.length+' new files uploaded successfully')
  )
}

export {userLogin,addNoteInThought,createAlbum,createThought,uploadImagesInAlbum}