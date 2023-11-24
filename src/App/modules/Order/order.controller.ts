import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {OrderValidations} from "@/App/modules/Order/order.validation";
import {OrderServices} from "@/App/modules/Order/order.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";

const getAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        role: req.body.role,
        userId: req.body.userId
    }
    const data = await OrderServices.getAllOrders(payload)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'AllOrders fetch successfully',
        data
    })
})
const getSingleOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    const payload = {
        role: req.body.role,
        userId: req.body.userId
    }

    const data = await OrderServices.getSingleOrder(id, payload)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'Order fetch successfully',
        data
    })
})

const newOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = pickFunction(req.body, ['userId', 'orderedBooks'])
    const validateData = OrderValidations.bookOrderZodSchema.parse(payload)

    const data = await OrderServices.createNewOrder(validateData)
    sendResponse.success(res, {
        statusCode: 201,
        message: 'Order created successfully',
        data
    })
})

export const OrderController = {
    getAllOrders,
    getSingleOrder,
    newOrder
}
