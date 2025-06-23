// Table Banner{
//     id string
//     title string
//     description string
//     order number
//     productId string [ref: > Product.id]
//     imageUrl string
//   }

import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    imageUrl: { type: String, default: null },
    },
    {
        versionKey: false,
        timestamps:true
    }
)

export default mongoose.model("Banner", bannerSchema)