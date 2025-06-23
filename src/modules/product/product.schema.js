import { z } from "zod";


const productColors = [
  "red", "green", "violet", "yellow", "black",
  "white", "blue", "gray", "orange", "multiColor", "other"
];

const productSizes = ["S", "M", "L", "XL", "XXL"];

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  slug: z.string().min(1, "Slug is required"),
  subCategory: z.string().min(1, "SubCategory is required"),

  thumbnail: z.string().url().optional(),
  images: z.array(
    z.object({
      url: z.string().url({ message: "Image URL must be valid" }),
      alt: z.string().optional()
    })
  ).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.record(z.any()).optional(),

  oldPrice: z.number().optional(),

  brand: z.string().optional(),

  color: z.enum([...productColors]).optional(),
  size: z.enum([...productSizes]).optional(),

  stock: z.number().min(0).optional(),
  soldCount: z.number().min(0).optional(),

  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),

  tags: z.array(z.string()).optional(),

  deletedAt: z.date().nullable().optional(),
  deletedBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export default productSchema