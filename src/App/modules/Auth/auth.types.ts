import {IUser} from "@/App/modules/User/user.types";
import {JwtPayload} from "jsonwebtoken";

export interface IAuthProperty extends IUser {
    password: string
}

export type TLoginPayload = {
    email: string,
    password: string
}

export interface TokenPayload extends JwtPayload {
    role: string
    userId: string
}