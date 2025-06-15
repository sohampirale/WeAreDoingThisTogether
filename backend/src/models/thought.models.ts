import mongoose,{Schema, Model,model} from "mongoose"
const ObjectId = Schema.Types.ObjectId;

interface IThought{
  title:string,
  notes:typeof ObjectId[],
  owner:mongoose.Types.ObjectId
}

type ThoughtModel = Model<IThought,{},{}>

const thoughtSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  notes:[{
    type:ObjectId,
    ref:"Note"
  }],
  owner:{
    type:ObjectId,
    ref:"User"
  }
},{
  timestamps:true
})

const Thought = model("Thought",thoughtSchema);

export default Thought;