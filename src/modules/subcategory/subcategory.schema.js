import { z } from "zod";

const subCategorySchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "slug is required"),
    deletedAt: z.date().nullable().optional(),
    categoryParentId: z.string(),
    logoUrl: z.string().url().optional()
})

export default subCategorySchema;