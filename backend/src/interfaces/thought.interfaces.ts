import mongoose,{Model} from "mongoose"

interface IThought{
  title:string,
  notes:mongoose.Types.ObjectId[],
  owner:mongoose.Types.ObjectId
}

interface IThoughtMethods{ }

type ThoughtModel = Model<IThought,{},IThoughtMethods>

export {IThought,ThoughtModel,IThoughtMethods}