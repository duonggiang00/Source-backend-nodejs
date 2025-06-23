import { z } from "zod";

const bannerSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
    order: z.number().optional(),
    productId: z.string(),
    imageUrl: z.string().url().optional()
})

export default bannerSchema;