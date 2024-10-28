import usersManager from "../data/fs/users.fs.js"
import jwt from 'jsonwebtoken';
import usersMongoManager from "../data/mongo/managers/user.manager.js";
import Controller from "./controller.js";

const usersController = new Controller(usersManager, "USER")
const { create, readAll, read,  update, destroy} = usersController;


export { create, readAll, read, update, destroy }