import { Router } from 'express';
import { readAll, getProduct, create, update, destroy } from "../../controllers/products.controllers.js";
import isValidData from '../../middleware/isValidData.mid.js';


const productsApiRouter = Router()

productsApiRouter.get("/", readAll)

productsApiRouter.get("/:pid", getProduct)

productsApiRouter.post("/", isValidData, create)

productsApiRouter.put("/:pid", update)

productsApiRouter.delete("/:pid", destroy)

export default productsApiRouter