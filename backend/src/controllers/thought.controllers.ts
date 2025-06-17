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
  const {note} :{note:string} = req.body;
  const thoughtId = new mongoose.Types.ObjectId(req.params.thoughtId)

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

const getAllThoughts=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  try {
    const allThoughts=await Thought.aggregate([
      {
        $match:{
          owner:{
            $in:[req.user._id,req.user.partnerId]
          }
        }
      },{
          $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"createdBy",
            pipeline:[
              {
                $project:{
                  ownerId:"$_id",
                  username:1,
                  _id:0
                }
              }
            ]
          }
        },{
          $unwind:"$createdBy"
        },{
          $project:{
            thoughtId:"$_id",
            _id:0,
            title:1,
            createdAt:1,
            'createdBy.username':1,
            'createdBy.ownerId':1,
          }
        }
    ])
    
    const meta={
      total:allThoughts.length
    }

    if(allThoughts){
      console.log("allThoughts fetched successfully : "+JSON.stringify(allThoughts));
    } else {
      console.log("couldn't fetch all Thoughts");
      throw new ApiError(404,"No thoughts found")
    }
    res.status(200).json(
      new ApiResponse(200,"All thoughts fetched successfully",allThoughts,meta)
    )
  } catch (error) {
    next(error)
  }
}

const getThought=async(req:Request<AlbumParams>,res:Response):Promise<void>=>{
  console.log('Inside getThought');
  
  const thoughtId=new mongoose.Types.ObjectId(req.params.thoughtId);

  try{
    const thought=await Thought.aggregate([
    {
        $match:{
          _id:thoughtId,
        }
      },{
        $lookup:{
          from:"notes",
          localField:"notes",
          foreignField:"_id",
          as:"notes",
          pipeline:[
            {
              $project:{
                _id:0,
                owner:1,
                createdAt:1,
                note:1
              }
            }
          ]
        }
      },{
        $project:{
          albumId:"$_id",
          _id:0,
          title:1,
          notes:1,
          createdAt:1
        }
      }
    ]);

    if(!thought){
      throw new ApiError(404,"Thought not found")
    }

    res.status(200).json(
      new ApiResponse(200,"Thoguht fetched successfully",thought[0])
    )
    
  } catch(err){
    throw new ApiError(500,"Couldn't fetch thought",err);
  }
  
}


export {createThought,addNoteInThought,getAllThoughts,getThought}