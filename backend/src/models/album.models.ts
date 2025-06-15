import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//interfaces
import {IAlbum,AlbumModel,IAlbumMethods} from "../interfaces/album.interfaces.js"

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
  images:[String]
},{
  timestamps:true
})

const Album = mongoose.model("Album",albumSchema);

export default Album;