import {Category} from "@prisma/client";
import {prisma} from "@/Config";
import {ICategory} from "@/App/modules/Category/category.types";
import CustomError from "@/Utils/errors/customErrror.class";

const allCategories = async (): Promise<Category[]> => {
    return prisma.category.findMany()
}

const singleCategory = async (id: string): Promise<Category | null> => {
    return prisma.category.findUnique({
        where: {
            id
        },
        include: {
            books: true
        }
    })
}

const newCategory = async (payload: ICategory): Promise<Category> => {
    return prisma.category.create({
        data: payload
    })
}

const updateCategory = async (id: string, payload: Partial<ICategory>): Promise<Category> => {
    return prisma.category.update({
        where: {
            id
        },
        data: payload
    })
}

const deleteCategory = async (id: string) => {
    try {
        const data = await prisma.category.delete({
            where: {
                id
            }
        })
        return data
    } catch (err) {
        throw new CustomError('Something went wrong.', 400)
    }
}

export const CategoryServices = {
    allCategories,
    singleCategory,
    newCategory,
    updateCategory,
    deleteCategory
}