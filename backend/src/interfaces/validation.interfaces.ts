import mongoose from "mongoose"

interface IUserAuthMiddleware{
  _id:mongoose.Types.ObjectId,
  username:string,
  partnerId:mongoose.Types.ObjectId,
  avatar?:string
}

export {IUserAuthMiddleware}