import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError
} from "@prisma/client/runtime/library";
import {TCustomErrorResponse} from "@/Utils/types/response.type";

export const processPrismaError = (
    err: PrismaClientKnownRequestError | PrismaClientUnknownRequestError | PrismaClientRustPanicError | PrismaClientInitializationError | PrismaClientValidationError
): TCustomErrorResponse => {
    return {
        statusCode: 400,
        message: err.message
    }
}

