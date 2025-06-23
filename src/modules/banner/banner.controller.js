import MESSAGES from "../../common/constants/message";
import createError from "../../common/utils/error";
import handleAsync from "../../common/utils/handleAsync";
import Banner from "./banner.model";

export const createBanner = handleAsync(async (req, res, next) => {
    const existing = await Banner.findOne({ order: req.body.order })
    if(existing) next(createError(400, MESSAGES.BANNER.CREATE_ERROR_EXISTS))
})