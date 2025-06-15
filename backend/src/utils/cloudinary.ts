import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import ApiError from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileOnCloudinary = async function (fileUploadPath: string) {
    console.log('fileUploadPath = ' + fileUploadPath);
    console.log("CLOUDINARY ENV VALUES:");
    console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
    console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET);

    try {
        const response = await cloudinary.uploader.upload(fileUploadPath);
        console.log('file uploaded successfully : ' + response.url);
        console.log('response = ' + JSON.stringify(response));

        fs.unlink(fileUploadPath, (err) => {
            if (err) {
                console.log('Error deleting files from server');
            } else {
                console.log('Files deleted successfully from server');
            }
        })
        return response;
    } catch (err) {
        console.log('failed to upload the file');
        console.log('ERROR : ' + err);
        fs.unlink(fileUploadPath, (err) => {
            if (err) {
                console.log('Error deleting files from server');
            } else {
                console.log('Files deleted successfully from server');
            }
        })
        throw new ApiError(500, "Failed to upload on cloudinary");
    }
}

export { uploadFileOnCloudinary }