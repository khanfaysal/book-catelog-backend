import {prisma} from "@/Config";
import {IUser} from "@/App/modules/User/user.types";
import CustomError from "@/Utils/errors/customErrror.class";

const allUsers = async (): Promise<IUser[]> => {
    return prisma.user.findMany({
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
}

const singleUser = async (id: string): Promise<IUser | null> => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

const getProfile = async (userid: string): Promise<IUser | null> => {
    return prisma.user.findUnique({
        where: {
            id: userid
        }
    })
}

const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser> => {
    return prisma.user.update({
        where: {
            id
        },
        data: payload,
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
}

const deleteUser = async (id: string) => {

    try {
        const data = await prisma.user.delete({
            where: {
                id
            }
        })
        return data
    } catch (err) {
        throw new CustomError('Something went wrong.', 400)
    }
}


export const UserService = {
    allUsers,
    singleUser,
    getProfile,
    updateUser,
    deleteUser
}