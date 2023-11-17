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
            console.log(`Server is listening on ${port}. Url: http://localhost:${port}`)
            console.log(`Server documentation: http://localhost:${port}/api/v1/docs`)
        })
    } catch (e) {
        console.log((e as Error).message);
    }
}

main()