import {Request,Response,NextFunction} from "express"

//utils
import ApiError from "./ApiError.js"

const asyncHandler=(fn:(req:Request,res:Response,next:NextFunction)=>void)=>{
  return async(req:Request,res:Response,next:NextFunction)=>{
    try {
      await fn(req,res,next);
    } catch (error) {
      next(error);
    }
  }
}

export default asyncHandler