import {z} from "zod";

const singUp = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['admin', 'customer']),
    contactNo: z.string(),
    address: z.string(),
    profileImg: z.string()
})


const singIn = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthValidation = {
    singUp,
    singIn
}