import mongoose from "mongoose"

async function connectDB():Promise<void>{
  try {
    const MONGODB_URI:string|undefined = process.env.MONGODB_URI+'/'+process.env.DB_NAME;
    if(MONGODB_URI){
      await mongoose.connect(MONGODB_URI);
      console.log('DB connected successfully!');
    } else {
      console.log('Unable to connect to DB update the .env file');
    }
  } catch (error) {
    console.log("Error connecting to the database");
  }
}

export {connectDB}