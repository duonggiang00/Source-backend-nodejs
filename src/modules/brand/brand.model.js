// Table Brand{
//     id string
//     title string
//     logoUrl string
//     description string
//     deletedAt datetime [default: null]
//     slug string
//   }

import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    title: { type: String, required: true },
    logoUrl: { type: String, default: null },
    description: { type: String},
    deletedAt: { type: Date, default: null },
    slug: { type: String, required: true },
}, { versionKey: false, timestamps: true });

export default mongoose.model("Brand", brandSchema);