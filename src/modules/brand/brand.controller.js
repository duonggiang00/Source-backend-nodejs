import Brand from "./brand.model.js"
import handleAsync from "../../common/utils/handleAsync.js"
import createError from "../../common/utils/error.js"
import createResponse from "../../common/utils/response.js"
import MESSAGES from "../../common/constants/message.js"

export const createBrand = handleAsync(async (req, res, next) => {
    const existing = await Brand.findOne({ title: req.body.title });
    if (existing) next(createError(400, MESSAGES.BRAND.CREATE_ERROR_EXISTS));
    const data = await Brand.create(req.body);
    return res.json(createResponse(true, 201, MESSAGES.BRAND.CREATE_SUCCESS, data));
});

export const getListBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.find()
    if (!data || data.length === 0) {
        return next(createError(404,MESSAGES.BRAND.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_SUCCESS,data))
})
export const getDetailBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.findById(req.params.id)
    if (!data) {
        next(createError(404,MESSAGES.BRAND.NOT_FOUND))
    }
    return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_BY_ID_SUCCESS,data))
})

export const updateBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.findById(req.body.params)
    if(data) return res.json(createResponse(true, 200, MESSAGES.BRAND.UPDATE_SUCCESS, data))
    next(createError(false,404,MESSAGES.BRAND.NOT_FOUND))
    }
)

export const deleteBrand = handleAsync(async (req, res, next) => {
    const data =  await Brand.findByIdAndDelete(req.params.id)
    if(data) return res.json(createResponse(true ,2000, MESSAGES.BRAND.DELETE_SUCCESS))
    next(createError(false, 404, MESSAGES.BRAND.NOT_FOUND))
})

export const softDeleteBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Brand.findOneAndUpdate(
            { _id: id },
            { deletedAt: new Date() },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.BRAND.SOFT_DELETE_SUCCESS))
    }
    next(createError(false, 404, MESSAGES.BRAND.SOFT_DELETE_FAILED))
});

export const restoreBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Brand.findOneAndUpdate(
            { _id: id },
            { deletedAt: null },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.BRAND.RESTORE_SUCCESS), data);
    }
    next(createError(false, 404, MESSAGES.BRAND.RESTORE_FAILED));
});

