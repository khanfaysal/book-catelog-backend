import {ErrorRequestHandler} from "express";
import {TCustomErrorResponse} from "@/Utils/types/response.type";
import {Error} from "mongoose";
import {processMongooseValidationError} from "@/Utils/validation/mongoose.validation";
import CustomError from "@/Utils/errors/customErrror.class";
import {ZodError} from "zod";
import {processZodValidation} from "@/Utils/validation/zod.validation";
import {sendResponse} from "@/Utils/helper/sendResponse";
import config from "@/Config";
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError
} from "@prisma/client/runtime/library";
import {processPrismaError} from "@/Utils/validation/prisma.validation";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let defaultError: TCustomErrorResponse = {
        statusCode: 500,
        message: "Something went wrong !.",
        errorMessages: [],
        stack: config.node_env === "development" && err.stack ? err.stack : undefined
    }

    if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
        const handler = processMongooseValidationError(err)
        defaultError.statusCode = handler.statusCode
        defaultError.message = handler.message
        defaultError.errorMessages = handler.errorMessages
    } else if (err instanceof CustomError) {
        defaultError.statusCode = err.statusCode
        defaultError.message = err.message
    } else if (err instanceof ZodError) {
        const handler = processZodValidation.errorValidation(err)
        defaultError.statusCode = handler.statusCode
        defaultError.message = handler.message
        defaultError.errorMessages = handler.errorMessages
    } else if (
        err instanceof PrismaClientUnknownRequestError ||
        err instanceof PrismaClientKnownRequestError ||
        err instanceof PrismaClientValidationError ||
        err instanceof PrismaClientInitializationError ||
        err instanceof PrismaClientRustPanicError
    ) {
        const {message, statusCode} = processPrismaError(err)
        defaultError.message = message
        defaultError.statusCode = statusCode


    }
    sendResponse.error(res, defaultError)
}

export default globalErrorHandler