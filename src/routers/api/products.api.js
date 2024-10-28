import { Router } from 'express';
import { create, readAll, read, update, destroy, paginate } from "../../controllers/products.controllers.js";
import isValidData from '../../middleware/isValidData.mid.js';


const productsApiRouter = Router()

productsApiRouter.post("/", isValidData, create)
productsApiRouter.get("/", readAll)
productsApiRouter.get("/:pid", read)
productsApiRouter.put("/:pid", update)
productsApiRouter.delete("/:pid", destroy)

//############
productsApiRouter.get("/paginate", paginate)


export default productsApiRouter