import { Router } from 'express';
import { create, readAll, read, update, destroy, calculateTotal } from "../../controllers/carts.controller.js";
import isValidData from '../../middleware/isValidData.mid.js';


const cartsApiRouter = Router()

cartsApiRouter.post("/", isValidData, create)
cartsApiRouter.get("/", readAll)
cartsApiRouter.get("/:cid", read)
cartsApiRouter.put("/:cid", update)
cartsApiRouter.delete("/:cid", destroy)

//###################
cartsApiRouter.get("/total/:uid", calculateTotal)


export default cartsApiRouter