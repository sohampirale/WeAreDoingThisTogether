import mongoose,{Model} from "mongoose"

interface INote{
  note:string,
  owner:mongoose.Types.ObjectId,
}

interface INoteMethods{}

type NoteModel=Model<INote,{},INoteMethods>

export {INote,NoteModel,INoteMethods}