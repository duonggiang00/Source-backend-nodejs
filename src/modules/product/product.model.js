import mongoose, { Schema } from "mongoose";

const productColors = [
  "red", "green", "violet", "yellow", "black",
  "white", "blue", "gray", "orange", "multiColor", "other"
];

const productSizes = ["S", "M", "L", "XL", "XXL"];

const productSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    slug: { type: String, unique: true, required: true },
    subCategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
    thumbnail: { type: String },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String }
      }
    ],
    description: { type: String },
    shortDescription: { type: String },
    specifications: { type: Schema.Types.Mixed },
    oldPrice: { type: Number },
    brand: { type: Schema.Types.ObjectId, ref: "Brand",},
    color: {
      type: String,
      enum: productColors,
      default: null
    },
    size: {
      type: String,
      enum: productSizes,
      default: null
    },
    stock: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
    tags: [{ type: String }],
    deletedAt: { type: Date, default: null },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    versionKey: false,
    timestamps: true, // tự động tạo createdAt và updatedAt
  }
);

export default mongoose.model("Product", productSchema);
