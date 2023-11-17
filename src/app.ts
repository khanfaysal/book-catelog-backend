/* 
    express application root file
*/

import express, {Application} from 'express'
import cors from 'cors'
import rootRouter from "./Routes";
import globalErrorHandler from "@/Middlewares/Errors/globalErrorHandler";
import notFoundHandler from "@/Middlewares/Errors/notFoundHandler";


const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1', rootRouter)
app.use(globalErrorHandler)
app.use(notFoundHandler)


export default app