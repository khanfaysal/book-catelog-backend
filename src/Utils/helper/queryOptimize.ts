import {
    IQueryItems,
    PaginationKeys,
    SortKeys,
    TPaginationOptions,
    TSearchOption,
    TSortOptions
} from "@/Utils/types/query.type";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {Request} from "express";

export const calculatePagination = (data: Partial<TPaginationOptions>): TPaginationOptions => {
    const page = Number(data.page || 1)
    const limit = Number(data.limit || data.size || 10)
    const skip = (page - 1) * limit
    return {
        page,
        limit,
        skip,
    }
}

export const manageSorting = (data: Partial<TSortOptions>): TSortOptions => {
    const sortOrder = data.sortOrder || "desc"
    const sortBy = data.sortBy || "createdAt"
    return {
        sortOrder,
        sortBy
    }
}

export const queryOptimization = <M>(req: Request, fields: (keyof M)[], extraFields: string[] = []): IQueryItems<Partial<M>> => {
    const search: Partial<TSearchOption> = pickFunction(req.query, ["search"])
    const filter: Partial<any> = pickFunction(req.query, [
        ...fields.map((field) => String(field)),
        ...extraFields
    ])
    const pagination: Partial<TPaginationOptions> = pickFunction(req.query, PaginationKeys)
    const sort: Partial<TSortOptions> = pickFunction(req.query, SortKeys)

    return {
        searchFields: search,
        paginationFields: pagination,
        sortFields: sort,
        filterFields: filter,
    }
}

export const MongoQueryHelper = (fieldType: string, fieldName: string, searchValue: string) => {
    if (fieldType === "Number") {
        //number
        if (!isNaN(Number(searchValue))) {
            return {
                [fieldName]: Number(searchValue)
            }
        } else {
            return {
                [fieldName]: {
                    $exists: false,
                }
            }
        }
    } else if (fieldType === 'ObjectId') {
        /*
        *  validate if you need to query by objectId=> Types.ObjectId.isValid(search)
        * */
        return {
            [fieldName]: {
                $exists: false,
            }
        }
    } else if (fieldType === 'Date') {
        /*
        *  validate if you need to query by Date
        * */
        return {
            [fieldName]: {
                $exists: false,
            }
        }
    } else {
        //default for string search
        return {
            [fieldName]: {
                $regex: searchValue.toString(),
                $options: "i"
            }
        }
    }
}