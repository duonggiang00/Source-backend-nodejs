import { z } from "zod";

const brandSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    logoUrl: z.string().url("Logo URL must be a valid URL"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
    slug: z.string().min(1, "Slug is required").max(100, "Slug must be less than 100 characters"),
    deletedAt: z.date().nullable().optional(),
});

export default brandSchema;