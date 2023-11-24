import {z, ZodType} from "zod";
import {TSingleBookOrderPayload} from "@/App/modules/Order/order.types";

const singleBookOrderZodSchema: ZodType<TSingleBookOrderPayload> = z.object({
    bookId: z.string(),
    quantity: z.number(),
})

const bookOrderZodSchema = z.object({
    userId: z.string(),
    // role: z.enum(['admin', 'customer']),
    orderedBooks: z.array(singleBookOrderZodSchema)
})

export const OrderValidations = {
    singleBookOrderZodSchema,
    bookOrderZodSchema
}