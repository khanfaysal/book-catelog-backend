import {config} from "dotenv";
import path from "path";
import {PrismaClient} from "@prisma/client";

config({
    path: path.join(process.cwd(), ".env")
})

export const prisma = new PrismaClient()

export default {
    port: process.env.PORT || 5000,
    mongo_uri: process.env.MONGO_URI,
    node_env: process.env.NODE_ENV,
    bcrypt_saltRounds: process.env.BCRYPT_SALTROUND,
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESSTOKEN_SECRET,
            exp: process.env.JWT_ACCESSTOKEN_EXP
        },
        refreshToken: {
            secret: process.env.JWT_REFRESHTOKEN_SECRET,
            exp: process.env.JWT_REFRESHTOKEN_EXP
        }
    }
}