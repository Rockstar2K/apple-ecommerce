import { Router } from 'express';
import { showProducts, showOneProduct, createProductView, updateProductView } from '../../controllers/products.controllers.js';
import authMiddleware from '../../middleware/auth.mid.js';



const productsViewRouter = Router()

productsViewRouter.get("/",authMiddleware, showProducts)
productsViewRouter.get("/admin", createProductView)
productsViewRouter.get("/update/:pid", updateProductView)
productsViewRouter.get("/:pid", showOneProduct)


export default productsViewRouter