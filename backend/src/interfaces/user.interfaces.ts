import mongoose,{Model} from "mongoose"

interface IUser{
  username:string,
  partnerId?:mongoose.Types.ObjectId,
  avatar?:string,
  password:string,
  refreshToken?:string
}

interface IUserMethods {
  comparePassword(password:string):Promise<Boolean>,
}

type UserModel=Model<IUser,{},IUserMethods>

export {IUser,IUserMethods,UserModel}