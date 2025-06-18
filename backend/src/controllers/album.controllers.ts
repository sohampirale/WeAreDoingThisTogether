import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"

//models
import Album from "../models/album.models.js";
import Note from "../models/note.models.js";
import Resource from "../models/resource.models.js"

//utils
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";

const createAlbum = async (req: Request, res: Response): Promise<void> => {
  const { title }: { title: string } = req.body;

  if (await Album.exists({
    title
  })) {
    throw new ApiError(409, "Album with that title already exists")
  }

  try {
    const album = await Album.create({
      title,
      notes: [],
      images: [],
      owner: req.user!._id
    })

    res.status(201).json(new ApiResponse<typeof album>(201, `Album : ${title} created successfully`, album));
    return
  } catch (error) {
    throw new ApiError(500, "Failed to create the Album(" + title + ")")
  }
}

//authMiddleware -> uplodImagesValidation -> route handler
/**
 * 1.fetch the album
 * 2.upload all images on cloudinary
 * 3.append each url to album.images[]
 * 4.return
 */
/*
const uploadImagesInAlbum=async(req:Request,res:Response,next:NextFunction)=>{
  console.log('Inside uploadImagesInAlbum');
  
  const files = req.files! as Express.Multer.File[];
  const albumId = new mongoose.Types.ObjectId(req.params.albumId);

  try {
    
    const album = await Album.findById(albumId);
    if(!album){
      throw new ApiError(404,"Album not found - Invalid albumId");
    }
  
    const allUrl=[]
    for(let i=0;i<files!.length;i++){
      try{
        const response=await uploadFileOnCloudinary(files[i].path);
        if(response && response.url){
          allUrl.push(response.url);
        }
      } catch(err){
      
      }
    }
    console.log('All files uploded to cloudinary');
    console.log('allUrl = '+allUrl);
    
    album.images.push(...allUrl);
    await album.save();
    console.log('Album saved successfully');
  } catch (error) {
    next(error);
  }

  return res.status(201).json(
    new ApiResponse(201,files.length+' new files uploaded successfully')
  )
}
*/

type AlbumParams = {
  albumId: string,
  resourceId?: string
}

const addNoteInAlbum = async (req: Request<AlbumParams>, res: Response): Promise<void> => {
  let { note }: { note: string } = req.body;

  const albumId = new mongoose.Types.ObjectId(req.params.albumId)

  console.log("note = " + note);
  console.log("albumId = " + albumId)

  try {
    const album = await Album.findById(albumId);

    if (!album) {
      console.log("Album not found")
      throw new ApiError(404, "album not found - Invalid album id")
    }

    const createdNote = await Note.create({
      note,
      owner: req.user!._id
    })

    console.log("Note created successfully")
    album.notes.push(createdNote._id);
    await album.save();
  } catch (error) {
    throw new ApiError(500, "Error while adding new note in the album", error);
  }

  res.status(201).json(
    new ApiResponse(200, "New note posted successfully in the album")
  )
}

const addNoteInResourceOfAlbum = async (req: Request<AlbumParams>, res: Response,next:NextFunction): Promise<void> => {
  let { note }: { note: string } = req.body;

  const albumId = new mongoose.Types.ObjectId(req.params.albumId)
  const resourceId = new mongoose.Types.ObjectId(req.params.resourceId);

  console.log("note = " + note);
  console.log("albumId = " + albumId)
  console.log('resourceId = ' + resourceId);

  try {
    const album = await Album.findById(albumId);
    console.log('test1');
    
    if (!album) {
      console.log("Album not found")
      throw new ApiError(404, "album not found - Invalid album id")
    }
    console.log('test2');


    let respData;
    for (let i = 0; i < album.data.length; i++) {
      console.log("curr resource : "+album.data[i].resource);
      
      if (album.data[i].resource.equals(resourceId)) {
        console.log('matched : '+album.data[i].resource );
        respData = album.data[i];
        break;
      }
    }
    console.log('test3 respData = '+respData);

    if (!respData) {
      throw new ApiError(404, "Unable to find the resource to add note in it")
    }

    const createdNote = await Note.create({
      note,
      owner: req.user!._id
    })

    respData.notes.push(createdNote._id);
    console.log("Note created successfully")
    await album.save();
  } catch (error) {
    next(error)
  }

  res.status(201).json(
    new ApiResponse(200, "New note posted successfully for the resource in the album")
  )
}

const getAllAlbums = async (req: Request, res: Response): Promise<void> => {
  try {
    const allAlbums = await Album.aggregate([
      {
        $match: {
          owner: {
            $in: [req.user._id, req.user.partnerId]
          }
        }
      }, {
        $project: {
          albumId: "$_id",
          _id: 0,
          title: 1,
          owner: 1,
          createdAt: 1,
          thumbnail: 1
        }
      }
    ])

    if (!allAlbums || allAlbums.length === 0) {
      throw new ApiError(404, "Couldn't fetch albums");
    }

    const meta = {
      total: allAlbums.length
    }

    res.status(200).json(
      new ApiResponse(200, "All albums fetched successfully", allAlbums, meta)
    )
  } catch (err) {
    throw new ApiError(500, "Failed to fetch all albums", err)
  }

}

const getAlbum = async (req: Request<AlbumParams>, res: Response): Promise<void> => {
  console.log('Inside getAlbum');

  const albumId = new mongoose.Types.ObjectId(req.params.albumId);
  console.log('inside getAlbum albumId = '+albumId);
  
  try {

    const album=await Album.aggregate([
      {
        $match: {
          _id: albumId
        }
      }, {
        $unwind: {
          path:"$data",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "resources",
          localField: "data.resource",
          foreignField: "_id",
          as: "fetchedResource"
        }
      }, {
        $unwind: {
          path:"$fetchedResource",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "notes",
          localField: "notes",
          foreignField: "_id",
          as: "fetchedNormalNotes",
          pipeline: [
            {
              $project: {
                noteId: "$_id",
                _id: 0,
                note: 1,
                owner: 1,
                createdAt: 1
              }
            }
          ]
        }
      }, {
        $lookup: {
          from: "notes",
          localField: "data.notes",
          foreignField: "_id",
          as: "fetechedNotesOfResource",
          pipeline: [
            {
              $project: {
                noteId: "$_id",
                _id: 0,
                note: 1,
                owner: 1,
                createdAt: 1
              }
            }
          ]
        }
      }, {
        $project: {
          albumId: "$_id",
          _id: 0,
          title: 1,
          createdAt: 1,
          fetchedNormalNotes: 1,
          fetechedNotesOfResource: 1,
          fetchedResource: 1,
          thumbnail: 1
        }
      }, {
        $group: {
          _id: "$_id",
          albumId: { $first: "$albumId" },
          title: { $first: "$title" },
          thumbnail: { $first: "$thumbnail" },
          createdAt: { $first: "$createdAt" },
          notes: { $first: "$fetchedNormalNotes" },
          data: {
            $push: {
              resource: "$fetchedResource",
              notes: "$fetechedNotesOfResource"
            }
          }
        }
      }
    ])

    if (!album) {
      throw new ApiError(404, "Album not found - Invalid album id")
    }
    console.log('inside getALbum album = '+JSON.stringify(album));
    
    res.status(200).json(
      new ApiResponse(200, "Album fetched successfully", album[0])
    )

  } catch (err) {
    throw new ApiError(500, "Couldn't fetch album", err);
  }

}

interface IData {
  resource: mongoose.Types.ObjectId,
  notes: mongoose.Types.ObjectId[]
}


const uploadImagesInAlbum2 = async (req: Request, res: Response, next: NextFunction) => {
  const albumId = new mongoose.Types.ObjectId(req.params.albumId);
  const files = req.files! as Express.Multer.File[]

  if (!albumId) {
    throw new ApiError(409, "AlbumId not given in params");
  } else if (!files) {
    throw new ApiError(409, "Images not received");
  }

  const album = await Album.findById(albumId);

  if (!album) {
    throw new ApiError(404, "Album not found");
  }

  const allResponses = []
  for (let i = 0; i < files.length; i++) {
    try {
      const response = await uploadFileOnCloudinary(files[i].path)
      allResponses.push(response)
    } catch (error) {
      console.log("Failed to upload : " + files[i].originalname + " to cloudinary");
    }
  }

  for (const response of allResponses) {
    try {
      const resource = await Resource.create({
        public_id: response.public_id,
        format: response.format,
        resource_type: response.resource_type,
        secure_url: response.secure_url,
        url: response.url,
        owner: req.user._id
      })

      const temp: IData = {
        resource: resource._id,
        notes: []
      }
      if (resource) {
        album.data?.push(temp);
      }

    } catch (error) {
      console.log('Failed to add ' + response.original_filenam + " in the array('data') of album");
    }
  }

  try {
    await album.save();

    res.status(200).json(
      new ApiResponse(200, allResponses.length + " new resources addedd successfully")
    );
  } catch (error) {
    next(error)
  }

}


export { createAlbum, uploadImagesInAlbum2, addNoteInAlbum, getAllAlbums, getAlbum, addNoteInResourceOfAlbum }



/*
  const album=await Album.aggregate([
    {
      $match:{
        _id:albumId,
      }
    },{
      $lookup:{
        from:"notes",
        localField:"notes",
        foreignField:"_id",
        as:"notes",
        pipeline:[
          {
            $project:{
              _id:0,
              owner:1,
              createdAt:1,
              note:1
            }
          }
        ]
      }
    },{

    },{
      $project:{
        albumId:"$_id",
        _id:0,
        title:1,
        notes:1,
        images:1,
        createdAt:1
      }
    }
  ]);
  */