/* 
    node application root file
*/

import config from "@/Config";
import http from "http"
import app from "@/app";

const server = http.createServer(app)
const {port} = config

const main = async () => {
    try {
        server.listen(port, () => {
            console.log("Hello world")
            console.log(`Server is listening on ${port}. Url: http://localhost:${port}`)
        })
    } catch (e) {
        console.log((e as Error).message);
    }
}

main()