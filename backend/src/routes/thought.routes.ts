import express,{Request,Response,NextFunction} from "express"
const thoughtRouter = express.Router();
import multer from "multer";

//controllers
import {createThought,addNoteInThought,getAllThoughts,getThought} from "../controllers/thought.controllers.js"
import authMiddleware from "../middlewares/auth.middlewares.js";

//create Thought
//add notes in thought

thoughtRouter.route("/")
  .get(authMiddleware,getAllThoughts)
  .post(authMiddleware,createThought)
  
thoughtRouter.route("/:thoughtId")
  .get(authMiddleware,getThought)
  .post(authMiddleware,addNoteInThought)


export default thoughtRouter;
