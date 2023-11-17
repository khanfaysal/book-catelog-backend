import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {UserService} from "@/App/modules/User/user.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {UserValidation} from "@/App/modules/User/user.validation";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await UserService.allUsers()
    sendResponse.success(res, {
        data,
        message: 'All users fetched successfully',
        statusCode: 200,
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    const data = await UserService.singleUser(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'User fetched successfully',
        data
    })
})

const getUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        role: req.body.role,
        userId: req.body.userId
    }

    const data = await UserService.getProfile(payload.userId)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'User fetched successfully',
        data
    })
})


const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    const payload =
        pickFunction(req.body, ['name', 'email', 'role', 'contactNo', 'address', 'profileImg'])

    const validatedData = UserValidation.userInfo.partial().parse(payload)
    const data = await UserService.updateUser(id, validatedData)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'User updated successfully',
        data
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)
    const data = await UserService.deleteUser(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'User deleted successfully',
        data
    })
})

export const UserController = {
    getAllUsers,
    getSingleUser,
    getUserProfile,
    updateUser,
    deleteUser
}