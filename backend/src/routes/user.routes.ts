console.log('hello from user routes');
import express,{Request,Response} from "express"
import multer from "multer"
const userRouter = express.Router();

import {userLogin,addNoteInThought,createAlbum,createThought,uploadImagesInAlbum} from "../controllers/user.controllers.js"
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

userRouter.route('/album').post(
  upload.array("uploadedImages"),
  uploadImagesInAlbum
);

export default userRouter;

/*
userRouter.route("/login")
  .post(loginValidation,userLogin);
*/