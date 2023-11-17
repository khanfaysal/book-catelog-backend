import {z} from "zod";

const userInfo = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'customer']),
    contactNo: z.string(),
    address: z.string(),
    profileImg: z.string()
})

export const UserValidation = {
    userInfo
}