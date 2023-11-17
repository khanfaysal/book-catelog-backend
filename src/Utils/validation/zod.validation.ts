import {z, ZodError, ZodIssue, ZodType} from "zod";
import {TCustomErrorResponse} from "@/Utils/types/response.type";
import {TGenericErrorMessages} from "@/Utils/types/errors.type";
import {TLogin} from "@/Utils/types/login.type";

const errorValidation = (err: ZodError): TCustomErrorResponse => {
    const errors: TGenericErrorMessages[] = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message
        }
    })
    return {
        statusCode: 400,
        message: "validation error",
        errorMessages: errors,
    }
}

const loginPayload: ZodType<TLogin> = z.object({
    phoneNumber: z.string(),
    password: z.string(),
})

export const processZodValidation = {
    errorValidation
}
export const ValidationSchema = {
    loginPayload
}