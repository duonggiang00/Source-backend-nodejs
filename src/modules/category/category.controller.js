import Category from "./category.model.js"
import handleAsync from "../../common/utils/handleAsync.js"
import createError from "../../common/utils/error.js"
import createResponse from "../../common/utils/response.js"
import MESSAGES from "../../common/constants/message.js"

export const createCategory = handleAsync(async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title });
    if (existing) next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS));
    const data = await Category.create(req.body);
    return res.json(createResponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data));
});

export const getListCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find()
    if (!data || data.length === 0) {
        return next(createError(404,MESSAGES.CATEGORY.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS,data))
})
export const getDetailCategory = handleAsync(async (req, res, next) => {
    const data = await Category.findById(req.params.id)
    if (!data) {
        next(createError(404,MESSAGES.CATEGORY.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS,data))
})
    
export const updateCategory = handleAsync(async (req, res, next) => {
    const data = await Category.findById(req.body.params)
    if(data) return res.json(createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data))
    next(createError(false,404,MESSAGES.CATEGORY.NOT_FOUND))
    }
)

export const deleteCategory = handleAsync(async (req, res, next) => {
    const data =  await Category.findByIdAndDelete(req.params.id)
    if(data) return res.json(createResponse(true ,2000, MESSAGES.CATEGORY.DELETE_SUCCESS))
    next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND))
})

export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findOneAndUpdate(
            { _id: id },
            { deletedAt: new Date() },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS))
    }
    next(createError(false, 404, MESSAGES.CATEGORY.SOFT_DELETE_FAILED))
});

export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findOneAndUpdate(
            { _id: id },
            { deletedAt: null },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS), data);
    }
    next(createError(false, 404, MESSAGES.CATEGORY.RESTORE_FAILED));
});

