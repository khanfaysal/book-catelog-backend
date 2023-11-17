import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {prisma} from "@/Config";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import CustomError from "@/Utils/errors/customErrror.class";

const userExists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['email', 'password'])
    const validateData = AuthValidation.singIn.parse(data)
    const user = await prisma.user.findUnique({
        where: {
            email: validateData.email
        }
    })
    if (!user) throw new CustomError('Invalid user', 404)

    req.body.user = user

    next()
})

export const AuthMiddleware = {
    userExists
}