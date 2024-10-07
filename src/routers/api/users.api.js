import { Router } from 'express';
import { readAllUsers, getUser, create, update, deleteUser } from "../../controllers/users.controllers.js";
import isUserValidData from '../../middleware/isUserValidData.mid.js';


const usersApiRouter = Router()

usersApiRouter.get("/", readAllUsers)

usersApiRouter.get("/:uid", getUser)

usersApiRouter.post("/", isUserValidData, create)

usersApiRouter.put("/:uid", update)

usersApiRouter.delete("/:uid", deleteUser)

export default usersApiRouter