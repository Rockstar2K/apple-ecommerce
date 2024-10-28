import { Router } from 'express';
import { readAll, read } from '../../controllers/products.controllers.js';
import authMiddleware from '../../middleware/auth.mid.js';



const productsViewRouter = Router()

productsViewRouter.get("/",authMiddleware, readAll)
productsViewRouter.get("/admin", createProductView)
productsViewRouter.get("/update/:pid", updateProductView)
productsViewRouter.get("/:pid", read)


export default productsViewRouter