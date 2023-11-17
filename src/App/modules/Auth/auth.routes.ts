import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";
import {AuthMiddleware} from "@/App/modules/Auth/auth.middlewares";

const AuthRoutes = Router()

AuthRoutes
    .post('/signup', AuthController.singUp)
    .post('/signin', AuthMiddleware.userExists, AuthController.login)
// .post('/logout', AuthMiddleware)
// .post('/forget-password', AuthMiddleware)
// .post('/reset-password', AuthMiddleware)


export default AuthRoutes


/* 
- [ ]  Route: /api/v1/auth/signup (POST)
- [ ]  Route: /api/v1/auth/signin (POST)
*/