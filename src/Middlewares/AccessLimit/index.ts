import CustomError from "@/Utils/errors/customErrror.class";
import {NextFunction, Request, Response} from "express";
import catchAsync from "@/Utils/helper/catchAsync";
import {z} from "zod";
import jwt from "jsonwebtoken";
import Config from "@/Config";
import {CustomJwtPayload} from "@/Utils/types/jwtHelper.type";

const AccessOnly = (accessRole: string[]) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const accessToken = z.string({
        required_error: "Access token is required."
    }).parse(token)

    const payload: unknown = jwt.verify(accessToken, Config.jwt.accessToken.secret as string)
    const {id, role} = payload as CustomJwtPayload

    if (accessRole.includes(role)) {
        next()
    } else {
        throw new CustomError('Access permission denied. ', 401)
    }
})

export default AccessOnly