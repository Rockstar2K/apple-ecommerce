import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socket from "./src/routers/index.socket.js";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import dbConnect from "./src/utils/db.util.js";

const server = express();
server.use(cookieParser());
const port = process.env.PORT || 8000;
const ready = async () => {
  console.log("Server ready on port: http://localhost:" + port);
  await dbConnect();
};
const httpServer = createServer(server);
httpServer.listen(port, ready);

//tcp server
const socketServer = new Server(httpServer);
socketServer.on("connection", socket);
export { socketServer };

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use("/public", express.static("public"));

//routers
server.use(router);
server.use(errorHandler);
server.use(pathHandler);

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
