import {Book, Prisma} from "@prisma/client";
import {prisma} from "@/Config";
import {IBook} from "@/App/modules/Book/book.types";
import {IQueryItems, TPaginationOptions} from "@/Utils/types/query.type";
import {calculatePagination, manageSorting} from "@/Utils/helper/queryOptimize";
import {BookUtils} from "@/App/modules/Book/book.utils";
import CustomError from "@/Utils/errors/customErrror.class";

const allBooks = async (options: IQueryItems<IBook>) => {

    const {search} = options.searchFields
    const {page, limit, skip} = calculatePagination(options.paginationFields)
    const {sortBy, sortOrder} = manageSorting(options.sortFields)

    const searchCondition = []
    const filterCondition = []

    //search query
    if (search) {
        searchCondition.push({
            OR: BookUtils.searchFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive"
                }
            }))
        })
    }

    //filter query
    if (Object.entries(options.filterFields).length > 0) {
        let x: {}[] = [];
        //filter fields query
        Object.entries(options.filterFields).map(([key, value]) => {
            if (BookUtils.filterFields.includes(key) && key === 'category') {
                x.push({
                    categoryId: {
                        equals: value
                    }
                })
            } else if (BookUtils.filterFields.includes(key)) {
                x.push({
                    [key]: {
                        equals: value
                    }
                })
            }

            //extra fields query
            if (BookUtils.filterPriceFields.includes(key)) {
                if (key === 'minPrice') {
                    x.push({
                        price: {
                            gte: Number(value)
                        }
                    })
                } else if (key === 'maxPrice') {
                    x.push({
                        price: {
                            lte: Number(value)
                        }
                    })
                } else {
                    x.push({
                        price: {
                            equal: Number(value)
                        }
                    })
                }
            }
        })
        filterCondition.push({
            AND: x
        })
    }

    let query: Prisma.BookWhereInput = {}
    if (searchCondition.length) {
        query.OR = searchCondition
    }
    if (filterCondition.length) {
        query.AND = filterCondition
    }

    const data: Book[] = await prisma.book.findMany({
        where: query,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.book.count()
    const meta = {
        page,
        size: limit,
        total,
        totalPage: Math.round(total / limit)
    }

    return {
        data,
        meta,
    }
}

const singleBookInfo = async (id: string) => {
    return prisma.book.findUnique({
        where: {
            id
        }
    })
}

const booksByCategoryId = async (id: string, options: Partial<TPaginationOptions>) => {
    const {page, limit, size, skip} = calculatePagination(options)
    const data: Book[] = await prisma.book.findMany({
        where: {
            categoryId: id
        },
        skip,
        take: limit
    })
    const total = await prisma.book.count()
    const meta = {
        page,
        size: limit,
        total,
        totalPage: Math.round(total / Number(limit))
    }

    return {
        data,
        meta
    }
}

const newBook = async (payload: IBook): Promise<Book> => {
    console.log(payload)
    return prisma.book.create({
        data: payload,
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    })
}

const updateBook = async (id: string, payload: Partial<IBook>): Promise<Book> => {
    return prisma.book.update({
        where: {
            id
        },
        data: payload
    })
}

const deleteBook = async (id: string) => {
    try {
        const data = await prisma.book.delete({
            where: {
                id
            }
        })
        return data
    } catch (err) {
        throw new CustomError('Something went wrong.', 400)
    }
}

export const BookService = {
    allBooks,
    singleBookInfo,
    booksByCategoryId,
    newBook,
    updateBook,
    deleteBook
}
