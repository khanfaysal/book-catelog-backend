import {z} from "zod";

const categoryZodSchema = z.object({
    title: z.string()
})

export const CategoryValidation = {
    categoryZodSchema
}