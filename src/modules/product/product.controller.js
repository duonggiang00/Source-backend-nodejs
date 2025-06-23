import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Product from "./product.model.js";

export const createProduct = handleAsync(async (req, res, next) => {
    const existing = await Product.findOne({ title: req.body.title });
    if (existing) next(createError(400, MESSAGES.PRODUCT.CREATE_ERROR_EXISTS))
    
    const { subCategoryId } = req.body
    if (!subCategoryId) return next(createError(404, MESSAGES.PRODUCT.CREATE_ERROR_CATEGORY_ID))
    
    const data = await Product.create(req.body)
    return res.json(createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, data))
    
});

export const getListProduct = handleAsync(async (req, res, next) => {
    const { subCategoryId } = req.query;
    const filter = subCategoryId ? { subCategoryId } : {};
    const data = await Product.find(filter);

    if (!data || data?.length === 0) return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
    return res.json(createResponse(true,200,MESSAGES.PRODUCT.GET_SUCCESS,data))
})

export const getDetailProduct = handleAsync(async (req, res, next) => {
    const data = await Product.findById(req.params.id)
    if (!data) { next(createError(404, MESSAGES.PRODUCT.NOT_FOUND)); }
    return res.json(createResponse(true, 200, MESSAGES.PRODUCT.GET_BY_ID_SUCCESS, data));

})

export const updateProduct = handleAsync(async (req, res, next) => {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!data) return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
    return res.json(createResponse(true, 200, MESSAGES.PRODUCT.UPDATE_SUCCESS, data));
});

export const deleteProduct = handleAsync(async (req, res, next) => {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) return res.json(createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS, data));
    next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
});

export const softDeleteProduct = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await Product.findOneAndUpdate(
            { _id: id },
            { deletedAt: new Date() },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.PRODUCT.SOFT_DELETE_SUCCESS));
    };
    next(createError(404, MESSAGES.PRODUCT.SOFT_DELETE_FAILED));
});

export const restoreProduct = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await Product.findOneAndUpdate(
            { _id: id },
            { deletedAt: null },
            { new: true }
        );
        return res.json(createResponse(true, 200, MESSAGES.PRODUCT.RESTORE_SUCCESS_SUCCESS));
    };
    next(createError(404, MESSAGES.PRODUCT.RESTORE_FAILED));
});
