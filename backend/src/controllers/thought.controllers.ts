import {Request,Response,NextFunction} from "express"
import mongoose from "mongoose"

//models
import Thought from "../models/thought.models.js";
import Note from "../models/note.models.js";

//utils
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";

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

const addNoteInThought=async(req:Request,res:Response):Promise<void>=>{
  const {note,thoughtId} :{note:string,thoughtId:mongoose.Types.ObjectId} = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if(!thought){
      throw new ApiError(404,"thought not found - Invalid thought id")
    }

    const createdNote= await Note.create({
      note,
      owner:req.user!._id
    })

    thought.notes.push(createdNote._id);
    await thought.save();
  } catch (error) {
    throw new ApiError(500,"Error while adding new note in the thought");
  }

  res.status(201).json(
    new ApiResponse(200,"New note posted successfully in the thought")
  )
}

export {createThought,addNoteInThought}