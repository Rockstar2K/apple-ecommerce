import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import { engine } from "express-handlebars"
import __dirname from "./utils.js";
import { Server} from "socket.io";
import {createServer} from "http"
import socket from "./src/routers/index.socket.js";
import cors from "cors"
import cookieParser from 'cookie-parser'


try {
    const server = express()
    server.use(cookieParser())
    const port = 8000;
    const ready = () => console.log("Server ready on port: http://localhost:" + port);
    const httpServer = createServer(server)
    const tcpServer = new Server(httpServer);
   
    tcpServer.on("connection", socket) 
    httpServer.listen(port, ready);
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())
    server.use(morgan("dev"))
    server.use(cors())
    server.use("/public", express.static("public"))
    server.use(router)
    server.use(errorHandler)
    server.use(pathHandler)
    server.engine("handlebars", engine())
    server.set("view engine", "handlebars")
    server.set("views", __dirname + "/src/views")

} catch (error) {
    console.log(error);
}