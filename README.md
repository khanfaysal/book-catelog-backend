servers:

- name: Auth
  description: User authentication
- name: Book
  description: Managing Book services
- name: WishList
  description: Operation about Lists
  paths:
  "/auth/login":
  post:
  tags: - Auth
  requestBody:
  content:
  "application/json":
  schema:
  type: object
  properties:
  email:
  type: string
  format: email
  example: admin@example.com
  password:
  type: string
  format: password
  example: admin@Password
  required: - email - password
  responses:
  "200":
  description: Success response
  content: &success
  "application/json":
  schema:
  type: object
  properties:
  success:
  type: boolean
  example: true
  message:
  type: string
  example: successfully logged in
  data:
  type: object
  properties:
  email:
  type: string
  example: admin@example.com
  accessToken:
  type: string
  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

          "400":
            $ref: "#/components/responses/400"
          "500":
            $ref: "#/components/responses/500"

  "/auth/register":
  post:
  description: Sign up as a new user
  tags: - Auth
  requestBody:
  content:
  "application/json":
  schema:
  type: object
  properties:
  name:
  title: object
  properties:
  firstName:
  type: string
  example: Ataur
  lastName:
  type: string
  example: Rahman
  email:
  type: string
  format: email
  example: ataur@gmail.com
  password:
  type: string
  format: password
  example: 12345678
  required: - firstName - lastName - email - password
  responses:
  "201":
  description: Signup successful
  content:
  "application/json":
  schema:
  type: object
  properties:
  success:
  type: boolean
  example: true
  message:
  type: string
  example: Account created successfully
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"
  "/books":
  get:
  description: Query books
  tags: - Book
  parameters: - $ref: "#/components/parameters/BookSearch" - $ref: "#/components/parameters/BookFilterByGenre" - $ref: "#/components/parameters/BookFilterByDate"
  responses:
  "200":
  description: successfully retrieved books
  content:
  "application/json":
  schema:
  type: object
  properties:
  success:
  type: boolean
  example: true
  message:
  type: string
  example: Books retrieved successfully
  data:
  type: array
  items:
  allOf: - type: object
  properties:
  \_id:
  type: string
  example: 6427f934f98e745f8458fe83 - $ref: "#/components/schemas/Book"
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"
  post:
  security: - Auth: [ ]
  description: Add new Book
  tags: - Book
  requestBody:
  content:
  "application/json":
  schema:
  allOf: - $ref: "#/components/schemas/Book" - required: - title - author - genre - publicationDate

        responses:
          "200":
            description: Successfully added new Book
            content:
              "application/json":
                schema:
                  type: object
                  properties:
                    success:
                      type: boolean
                      example: true
                    message:
                      type: string
                      example: successfully added new book
                    data:
                      $ref: "#/components/schemas/Book"
          "400":
            $ref: "#/components/responses/400"
          "500":
            $ref: "#/components/responses/500"

  "/books/{id}":
  patch:
  security: - Auth: [ ]
  description: Update book information
  tags: - Book
  parameters: - $ref: "#/components/parameters/BookParamsById"
  requestBody:
  content:
  "application/json":
  schema:
  $ref: "#/components/schemas/Book"
  responses:
  "200":
  $ref: "#/components/responses/simple200"
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"
  delete:
  security: - Auth: [ ]
  description: Delete a book
  tags: - Book
  parameters: - $ref: "#/components/parameters/BookParamsById"
  responses:
  "200":
  $ref: "#/components/responses/simple200"
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"
  "/wishlist":
  get:
  security: - Auth: [ ]
  description: retrieved books from wishlist.
  tags: - WishList
  responses:
  "200":
  description: Successful response.
  content:
  "application/json":
  schema:
  type: object
  properties:
  success:
  type: boolean
  example: true
  message:
  type: string
  example: Successfully retrieved books from wishlist
  data:
  type: array
  items:
  allOf: - type: object
  properties:
  \_id:
  type: string
  example: 6427f934f98e745f8458fe83 - $ref: "#/components/schemas/Book"
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"
  post:
  security: - Auth: [ ]
  description: add books in wishlist.
  tags: - WishList
  parameters: - $ref: "#/components/parameters/BookParamsById"
  responses:
  "200":
  description: Successful response.
  content:
  "application/json":
  schema:
  type: object
  properties:
  success:
  type: boolean
  example: true
  message:
  type: string
  example: Successfully added books to wishlist
  "400":
  $ref: "#/components/responses/400"
  "500":
  $ref: "#/components/responses/500"

components:
securitySchemes:
Auth:
type: http
scheme: bearer
bearerFormat: JWT
responses:
"simple200":
description: success responses
content:
"application/json":
schema:
type: object
properties:
statusCode:
type: integer
format: int32
example: 200
message:
type: string
example: Operation success
"400":
description: Bad request
content:
"application/json":
schema:
type: object
properties:
statusCode:
type: integer
format: int32
example: 400
message:
type: string
example: Issue detected
errorMessages:
type: array
items:
type: object
properties:
path:
type: string
example: /api/v1
message:
type: string
example: details of the issue
"404":
description: Route not found
content:
"application/json":
schema:
type: object
properties:
statusCode:
type: integer
format: int32
example: 404
message:
type: string
example: Issue detected
errorMessages:
type: array
items:
type: object
properties:
path:
type: string
example: /api/v1/unknownRoute
message:
type: string
example: not found
"500":
description: Server error
content:
"application/json":
schema:
type: object
properties:
statusCode:
type: integer
format: int32
example: 500
message:
type: string
example: Something went wrong
errorMessages:
type: array
items:
type: object
properties:
path:
type: string
example: ""
message:
type: string
example: ""
schemas:
Book:
type: object
properties:
title:
type: string
example: My hope
author:
type: string
example: Faysal Khan
genre:
type: string
example: Motivation
publicationDate:
type: string
example: 01-01-1901
parameters:
BookParamsById:
in: path
name: id
required: true
description: book id
schema:
type: string
example: 6427f934f98e745f8458fe83
BookSearch:
in: query
name: search
description: search by author name,book title or genre
schema:
type: string
BookFilterByGenre:
name: genre
description: filter
in: query
schema:
type: string
BookFilterByDate:
name: publicationDate
description: filter (MM-DD-YYYY)
in: query
schema:
type: string
