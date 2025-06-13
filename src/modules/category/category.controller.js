import Category from "./category.model.js"
import handleAsync from "../../common/utils/handleAsync.js"
import createError from "../../common/utils/error.js"
import createResponse from "../../common/utils/respone.js"
import findByIdCategory from "./category.services.js"
import MESSAGES from "../../common/constants/message.js"

export const createCategory = handleAsync(async (req, res, next) => {

    //validate
    const validationData = categorySchema.parse(req.body);
    console.log(validationData)

    const existing = await Category.findOne({ title: req.body.title })
    if(existing) next(createError(400,MESSAGES.CATEGORY.CREATE_ERROR_EXISTS))
    const data = await Category.create(req.body)
    if (data) {
        return res.json(createResponse(true,201,MESSAGES.CATEGORY.CREATE_SUCCESS, data))
    }
    next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR))
    }
) 

export const getListCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find()
    return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS,data))
})
export const getDetailCategory = handleAsync(async (req, res, next) => {
    const data = await findByIdCategory(req.id)
    if (!data) {
        next(createError(404,MESSAGES.CATEGORY.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS,data))
})
    
export const updateCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findByIdAndUpdate(id, req.body)
        return res.json(createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data))
     }
    next(createError(false,404,MESSAGES.CATEGORY.NOT_FOUND))
    }
)

export const deleteCategory = handleAsync(async (req, res, next) => {
    const data =   await Category.findByIdAndDelete(id)
    if(data) return res.json(createResponse(true ,2000, MESSAGES.CATEGORY.DELETE_SUCCESS))
    next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND))
})

export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findOnedAndUpdate({id, deletedAt: null}, {
            deletedAt: new Date()
        })
        return res.json(createResponse(true,200,MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS))
    }
    next(createError(false, 404, MESSAGES.CATEGORY.SOFT_DELETE_FAILED))
})

export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByOneAndUpdate({id, deletedAt: { $ne:null }},{
            deletedAt:null
        })
        return res.json(createResponse(true,200, MESSAGES.CATEGORY.RESTORE_SUCCESS))
    }
    next(createError(false, 404, MESSAGES.CATEGORY.RESTORE_FAILED))
})

