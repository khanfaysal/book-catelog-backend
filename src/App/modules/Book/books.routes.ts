/*
* - [ ]  Route: /create-book (POST) → Only Allowed For Admin
- [ ]  Route: / (GET)(Pagination)
- [ ]  Route: /:categoryId/category (GET)
- [ ]  Route: /:id (GET)
- [ ]  Route: /:id (PATCH)(OA)
- [ ]  Route: /:id ( DELETE)
* */

import {Router} from "express";
import {BookController} from "@/App/modules/Book/book.controllers";
import AccessOnly from "@/Middlewares/AccessLimit";

const BooksRoutes = Router()

BooksRoutes
    .get('/',
        BookController.allBooks
    )
    .get('/:id',
        BookController.singleBook
    )
    .get('/:categoryId/category',
        BookController.booksByCategoryId
    )
    .post('/create-book',
        AccessOnly(['admin']),
        BookController.createNewBook
    )
    .patch('/:id',
        AccessOnly(['admin']),
        BookController.updateBook
    )
    .delete('/:id',
        AccessOnly(['admin']),
        BookController.deleteBook
    )

export default BooksRoutes