import mongoose,{Model} from "mongoose"

interface IAlbum{
  title:string,
  owner:mongoose.Types.ObjectId,
  notes:mongoose.Types.ObjectId[],
  images:string[]
}

interface IAlbumMethods{}

type AlbumModel=Model<IAlbum,{},IAlbumMethods>

export {IAlbum,AlbumModel,IAlbumMethods}