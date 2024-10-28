import { Router } from 'express';
import { create, readAll, read, update, destroy } from "../../controllers/users.controllers.js";
import isUserValidData from '../../middleware/isUserValidData.mid.js';


const usersApiRouter = Router()

usersApiRouter.post("/", isUserValidData, create)
usersApiRouter.get("/", readAll)
usersApiRouter.get("/:uid", read)
usersApiRouter.put("/:uid", update)
usersApiRouter.delete("/:uid", destroy)

export default usersApiRouter