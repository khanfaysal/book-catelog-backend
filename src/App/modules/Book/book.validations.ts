/*
* {
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "genre": "Fiction",
  "price": 350.75,
  "publicationDate": "1951-07-16",
  "categoryId": "a3c7b742-6a34-4c6f-b6b0-58f41d48d5c6"
}
* */

import {z} from "zod";

const bookZodSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    price: z.number(),
    publicationDate: z.string(),
    categoryId: z.string(),
})

export const BookValidation = {
    bookZodSchema
}