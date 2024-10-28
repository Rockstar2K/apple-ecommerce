import { Router } from 'express';
import { create, readAll, read, update, destroy } from "../../controllers/carts.controller.js";
import isValidData from '../../middleware/isValidData.mid.js';


const cartsApiRouter = Router()

cartsApiRouter.post("/", isValidData, create)
cartsApiRouter.get("/", readAll)
cartsApiRouter.get("/:cid", read)
cartsApiRouter.put("/:cid", update)
cartsApiRouter.delete("/:cid", destroy)

export default cartsApiRouter