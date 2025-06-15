import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const noteSchema =  new Schema({
  note:{
    type:String,
    required:true
  },
  owner:{
    type:ObjectId,
    ref:"User"
  }
},{
  timestamps:true
});

const Note = mongoose.model("Note",noteSchema);

export default Note;