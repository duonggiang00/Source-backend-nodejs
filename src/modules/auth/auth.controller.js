import { JWT_EXPIRES_IN, JWT_EXPIRES_IN_FOR_EMAIL, JWT_SECRET_KEY, JWT_SECRET_KEY_FOR_EMAIL } from "../../common/configs/enviroment.js";
import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js"
import sendMail from "../../common/utils/mailSender.js";
import createResponse from "../../common/utils/response.js";
import User from "../../modules/user/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const authRegister = handleAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	// * Create User
	const newUser = await User.create({
		...req.body,
		password: hash,
		role: "guest",
	});

	if (!newUser) {
		return next(createError(500, MESSAGES.AUTH.REGISTER_FAILED));
    }
    
    //* verify email
    const verifyEmailToken = jwt.sign({ id: newUser._id },
        JWT_SECRET_KEY_FOR_EMAIL, {
        expiresIn: JWT_EXPIRES_IN_FOR_EMAIL,
    }
    );

    const verifyEmailLink= `http://localhost:5173/auth/verify-email/${verifyEmailToken}`

    sendMail(
        newUser.email,
        "Verify your Email",
        `Xin chao ${newUser.fullName || "User"},
        Vui long click vao link duoi day de xac thu email cua ban:
        <a href="${verifyEmailLink}">Xac thuc email</a>
        <br>
        Neu ban khong dang ky tai khoan nay vui long bo qua mail nay.
        <br>
        Cam on ban da su dung dich vu cua chung toi
        `
    )
    
	// * Response
	newUser.password = undefined;
	return res.status(201).json(createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser));
});

export const authLogin = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
        return next(createError(400, MESSAGES.AUTH.USER_NOT_EXIST));
    }

    const isMatch = bcrypt.compareSync(password, existUser.password);
    if (!isMatch) return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));

    //* generate token
    
    const accessToken = jwt.sign(
        { id: existUser._id },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRES_IN}
    )

    if (accessToken) {
        existUser.password = undefined;
        return res.status(200).json(createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
            user: existUser,
            accessToken
        }))
    }

    return next(createError(500, MESSAGES.AUTH.LOGIN_FAILED))
})

