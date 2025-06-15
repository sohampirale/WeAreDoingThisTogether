import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
import {model,Document,Model} from "mongoose"

import {IUser,IUserMethods,UserModel} from "../interfaces/user.interfaces.js"

const userSchema = new Schema<IUser,UserModel,IUserMethods>({
  username:{
    type:String,
    required:true,
    unique:true
  },
  partnerId:{
    type:ObjectId,
    ref:"User"
  },
  avatar:{
    type:String
  },
  password:{
    type:String,
    required:true
  },
  refreshToken:{
    type:String,
    default:undefined
  }
},{
  timestamps:true
});


userSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,5);
  }
  next();
})

userSchema.methods.comparePassword=async function(password:string):Promise<Boolean>{
  return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User",userSchema);

export default User;