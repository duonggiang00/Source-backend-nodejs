import Category from "../models/Category.js"
import handleAsync from "../utils/handleAsync.js"
import createError from "../utils/error.js"
import createResponse from "../utils/respone.js"

export const createCategory = handleAsync(async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title })
    if(existing) next(createError(400,"Duplicated Category"))
    const data = await Category.create(req.body)
    if (data) {
        return res.json(createResponse(true,201,"Create Category successfully!", data))
    }
    next(createError(400,"Create Category failed!"))
    }
) 

export const getListCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find()
    return res.json(createResponse(true, 200, "get list successfully",data))
})
export const getDetailCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findById()
    }
    next(createError(false,404,"Not Found"))
    return res.json(createResponse(true, 200, "get detail successfully",data))
})
    
export const updateCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findByIdAndUpdate(id, req.body)
        return res.json(createResponse(true, 200, "Category update successfully"))
     }
    next(createError(false,404,"Category update failed"))
    }
)

export const deleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndDelete(id)
        return res.json(createResponse(true ,2000, "Delete successfully!"))
    }
    next(createError(false, 404, "Category delete failed!"))
})

export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate(id, {
            deletedAt: new Date()
        })
        return res.json(createResponse(true,200,"Hidden category successfully"))
    }
    next(createError(false, 404, "Hidden category failed!"))
})

export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate(id,{
            deletedAt:null
        })
        return res.json(createResponse(true,200,"restore category successfully!"))
    }
    next(createError(false, 404, "Restore category failed!"))
})

