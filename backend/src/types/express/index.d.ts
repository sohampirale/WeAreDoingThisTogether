import type { IUserAuthMiddleware } from "../../interfaces/validation.interfaces";


declare global {
  namespace Express {
    interface Request{
      user?:IUserAuthMiddleware,
      file?:Express.Multer.File,
      files?:Express.Multer.File[],
      body?:any
    }
  }
}