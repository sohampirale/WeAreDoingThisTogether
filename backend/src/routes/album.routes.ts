import express,{Request,Response,NextFunction} from "express"
const albumRouter = express.Router();
import multer from "multer";

//controllers
import {createAlbum,uploadImagesInAlbum,addNoteInAlbum,getAllAlbums,getAlbum} from "../controllers/album.controllers.js"

import authMiddleware from "../middlewares/auth.middlewares.js";

type DestinationCallback=(err:Error|null,filepath:string)=>void
type FilenameCallback=(err:Error|null,filename:string)=>void

const storage=multer.diskStorage({
  destination:function(req:Request,file:Express.Multer.File,cb:DestinationCallback){
    cb(null,"public/data");
  },
  filename:function(req:Request,file:Express.Multer.File,cb:FilenameCallback){
    cb(null,file.originalname);
  }
})

const upload=multer({
  storage
})


albumRouter.route("/")
  .post(authMiddleware,createAlbum)                 //create album
  .get(authMiddleware,getAllAlbums)


albumRouter.route("/:albumId")
  .get(authMiddleware,getAlbum)
  .post(authMiddleware,addNoteInAlbum)                                          //add note in album   
  .put(authMiddleware,upload.array("uploadedImages"),uploadImagesInAlbum);      //add images in album


export default albumRouter;
