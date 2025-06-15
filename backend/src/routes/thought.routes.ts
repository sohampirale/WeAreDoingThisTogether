import express,{Request,Response,NextFunction} from "express"
const thoughtRouter = express.Router();
import multer from "multer";

//controllers
import {createThought,addNoteInThought} from "../controllers/thought.controllers.js"
import authMiddleware from "../middlewares/auth.middlewares.js";

//create Thought
//add notes in thought

thoughtRouter.route("/")
  .post(authMiddleware,createThought)
  .put(authMiddleware,addNoteInThought)


export default thoughtRouter;
