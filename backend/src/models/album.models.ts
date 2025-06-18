// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// //interfaces
// import {IAlbum,AlbumModel,IAlbumMethods} from "../interfaces/album.interfaces.js"

// //constants
// import { defaultAlbumThumbnail } from "../constants/constants.js";

// const albumSchema = new Schema<IAlbum,AlbumModel,IAlbumMethods>({
//   title:{
//     type:String,
//     required:true
//   },
//   owner:{
//     type:ObjectId,
//     required:true
//   },
//   data:[{
//     resource:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"Resource"
//     },
//     notes:[{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"Note"
//     }]
//   }],
//   thumbnail:{
//     type:String,
//     default:defaultAlbumThumbnail
//   }
// },{
//   timestamps:true
// })

// albumSchema.pre("save",async function(next){
//   if(this.isModified("images")){
//     if(this.data.length!=0){
//       let firstImageSecureUrl;
//       for(let i=0;i<this.data.length;i++){
//         const resource_type=this.data[i].resource.resource_type;
//         if(resource_type="image"){
//           firstImageSecureUrl=this.data[i].resource.secure_url;
//           break;
//         }
//       }
//       if(!firstImageSecureUrl){
//         firstImageSecureUrl=defaultAlbumThumbnail
//       }
//       this.thumbnail=firstImageSecureUrl
//     } else {
//       this.thumbnail=defaultAlbumThumbnail
//     }
//   }
//   next();
// })

// const Album = mongoose.model("Album",albumSchema);

// export default Album;




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
