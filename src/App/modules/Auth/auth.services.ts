import CustomError from "@/Utils/errors/customErrror.class";
import {IAuthProperty, TLoginPayload, TokenPayload} from "./auth.types";
import {prisma} from "@/Config";
import {IUser} from "@/App/modules/User/user.types";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";

const CreateNewAccount = async (data: IAuthProperty): Promise<IUser> => {
    // find user by email address
    const exist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (exist) throw new CustomError(`User with ${data.email} already exists`, 400)
    //create new account
    const newAccount = await prisma.user.create({
        data: {
            ...data,
            password: await HashHelper.generateHashPassword(data.password)
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true
        }
    })
    //return new user info
    return newAccount
}

const logIntoAccount = async (data: TLoginPayload, user: Partial<IAuthProperty>) => {

    const validPassword = user && await HashHelper.comparePassword(data.password as string, user.password as string)
    if (!validPassword) throw new CustomError('Invalid email or password', 401)

    const tokenData: TokenPayload = {
        role: user.role as string,
        userId: user.id as string
    }
    const accessToken = generateToken.accessToken(tokenData)
    const refreshToken = generateToken.refreshToken(tokenData)

    return {
        accessToken,
        refreshToken
    }
}


export const AuthServices = {
    CreateNewAccount,
    logIntoAccount
}