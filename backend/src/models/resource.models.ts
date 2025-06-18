// import mongoose, { Schema, Model, model } from "mongoose"
// const ObjectId = Schema.Types.ObjectId;

// interface IResource {
//     public_id: string,
//     format: string,
//     resource_type: string,
//     secure_url: string,
//     owner: mongoose.Types.ObjectId
// }

// type ResourceModel = Model<IResource, {}, {}>

// const resourceSchema = new Schema({
//     public_id: {
//         type: String,
//         required: true
//     },
//     format: {
//         type: String,
//         required: true
//     },
//     resource_type: {
//         type: String,
//         required: true
//     },
//     secure_url: {
//         type: String,
//         required: true
//     },
//     url:{
//         type:string,
//         required:true
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required: true
//     },

// }, {
//     timestamps: true
// })

// const Resource = model("Resource", resourceSchema);

// export default Resource;