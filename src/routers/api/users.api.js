import { Router } from 'express';
import { readAll, read, create, update, destroy } from "../../controllers/users.controllers.js";
import isUserValidData from '../../middleware/isUserValidData.mid.js';


const usersApiRouter = Router()

usersApiRouter.get("/", readAll)

usersApiRouter.get("/:uid", read)

usersApiRouter.post("/", isUserValidData, create)

usersApiRouter.put("/:uid", update)

usersApiRouter.delete("/:uid", destroy)

export default usersApiRouter