import { Router } from 'express'
import { showProductsInIndex } from '../../controllers/products.controllers.js';
import productsViewRouter from './products.view.js';
import usersViewRouter from './users.view.js';


const viewRouter = Router()


viewRouter.get("/", showProductsInIndex);
viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);


export default viewRouter