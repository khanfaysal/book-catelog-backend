import {IOrder} from "@/App/modules/Order/order.types";
import {prisma} from "@/Config";
import {Order} from "@prisma/client";
import {TokenPayload} from "@/App/modules/Auth/auth.types";

const getAllOrders = async (payload: TokenPayload): Promise<Order[]> => {
    const {userId, role} = payload;
    if (role === "customer") {
        return prisma.order.findMany({
            where: {
                userId
            }
        })
    }
    return prisma.order.findMany()
}


const getSingleOrder = async (id: string, payload: TokenPayload): Promise<Order | null> => {
    const {userId, role} = payload;
    if (role === "customer") {
        return prisma.order.findUnique({
            where: {
                userId,
                id
            }
        })
    }
    return prisma.order.findUnique({
        where: {
            id
        }
    })
}

const createNewOrder = async (payload: IOrder): Promise<Order> => {
    return prisma.order.create({
        data: payload
    })
}

export const OrderServices = {
    getAllOrders,
    getSingleOrder,
    createNewOrder
}