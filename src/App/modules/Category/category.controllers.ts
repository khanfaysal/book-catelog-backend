import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {CategoryServices} from "@/App/modules/Category/category.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {CategoryValidation} from "@/App/modules/Category/category.validations";

const categoryList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await CategoryServices.allCategories()

    sendResponse.success(res, {
        statusCode: 200,
        message: "Category list fetched successfully",
        data
    })
})

const singleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    const data = await CategoryServices.singleCategory(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: "Category data fetched successfully",
        data
    })
})

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ["title"])
    const validated = CategoryValidation.categoryZodSchema.parse(payload)
    const data = await CategoryServices.newCategory(validated)

    sendResponse.success(res, {
        statusCode: 200,
        message: "Category created successfully",
        data
    })
})

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ["title"])
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    const validated = CategoryValidation.categoryZodSchema.partial().parse(payload)
    const data = await CategoryServices.updateCategory(id, validated)

    sendResponse.success(res, {
        statusCode: 200,
        message: "Category updated successfully",
        data
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'ID is required'
    }).parse(req.params.id)

    console.log({id})

    const data = await CategoryServices.deleteCategory(id)
    sendResponse.success(res, {
        statusCode: 200,
        message: "Category deleted successfully",
        data
    })
})


export const CategoryController = {
    categoryList,
    singleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}