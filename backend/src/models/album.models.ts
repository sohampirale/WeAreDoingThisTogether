import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//interfaces
import {IAlbum,AlbumModel,IAlbumMethods} from "../interfaces/album.interfaces.js"

//constants
import { defaultAlbumThumbnail } from "../constants/constants.js";

const albumSchema = new Schema<IAlbum,AlbumModel,IAlbumMethods>({
  title:{
    type:String,
    required:true
  },
  owner:{
    type:ObjectId,
    required:true
  },
  notes:[{
    type:ObjectId,
    ref:"Note"
  }],
  images:[String],
  thumbnail:{
    type:String,
    default:defaultAlbumThumbnail
  }
},{
  timestamps:true
})

albumSchema.pre("save",async function(next){
  if(this.isModified("images")){
    if(this.images.length!=0){
      this.thumbnail=this.images[0]
    } else {
      this.thumbnail=defaultAlbumThumbnail
    }
  }
  next();
})

const Album = mongoose.model("Album",albumSchema);

export default Album;