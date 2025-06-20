import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,

    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    deletedAt: {
        type:Date,
        default: null,

    }
},{versionKey: false, timestamps:true})

export default mongoose.model("Product", productSchema)