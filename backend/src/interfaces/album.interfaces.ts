import mongoose,{Model} from "mongoose"

interface IAlbum{
  title:string,
  owner:mongoose.Types.ObjectId,
  images:string[],
  notes:mongoose.Types.ObjectId[],
  thumbnail:string
}

/*
interface IData{
  resource:mongoose.Types.ObjectId,
  notes:mongoose.Types.ObjectId[]
}


interface IAlbum{
  title:string,
  owner:mongoose.Types.ObjectId,
  data:IData[],
  thumbnail:string
}
*/

interface IAlbumMethods{}

type AlbumModel=Model<IAlbum,{},IAlbumMethods>

export {IAlbum,AlbumModel,IAlbumMethods}