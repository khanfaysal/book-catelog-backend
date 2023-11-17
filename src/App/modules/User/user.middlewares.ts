import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import config, {prisma} from "@/Config";
import CustomError from "@/Utils/errors/customErrror.class";
import {z} from "zod";
import jwt from "jsonwebtoken";
import {TokenPayload} from "@/App/modules/Auth/auth.types";

const userExists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    console.log({id})

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (!user) throw new CustomError('Invalid user', 404)

    next()
})

const validateAccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = z.string({
        required_error: 'Authorization token required'
    }).parse(req.headers.authorization)

    const {role, userId} = jwt.verify(token, config.jwt.accessToken.secret as string) as TokenPayload

    req.body.userId = userId
    req.body.role = role

    next()
})

export const UserMiddleware = {
    userExists,
    validateAccess
}