console.log('hello from user routes');
import express from "express"
const userRouter = express.Router();

import {userSignup,userLogin,userAddPartner,userLogout} from "../controllers/user.controllers.js"
import authMiddleware from "../middlewares/auth.middlewares.js";

userRouter.route("/")
  .post(userSignup)
  .put(authMiddleware,userAddPartner);

userRouter.route("/login")
  .post(userLogin)
  .delete(authMiddleware,userLogout)

export default userRouter;