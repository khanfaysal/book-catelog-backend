import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {AuthServices} from "@/App/modules/Auth/auth.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import {prisma} from "@/Config";

const singUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data =
        pickFunction(req.body, ['name', 'email', 'password', 'role', 'contactNo', 'address', 'profileImg'])

    const validate = AuthValidation.singUp.parse(data)
    const user = await AuthServices.CreateNewAccount(validate)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Successfully created new account',
        data: user
    })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   try {
        const data = pickFunction(req.body, ['email', 'password', 'role']);
        const validateData = AuthValidation.singIn.parse(data);
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if(!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            })
        }
        const {accessToken, refreshToken} = await AuthServices.logIntoAccount(validateData, user)
        console.log(data, "data");
        console.log( accessToken, "access token");
        console.log(refreshToken, "refresh token");
        res.cookie('refreshToken', refreshToken)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User signin successfully!",
            token: accessToken
        })
    
   } catch (error) {
        console.log(error, "error")
   }
})


export const AuthController = {
    singUp,
    login
}