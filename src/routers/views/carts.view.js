import { Router } from 'express';
import { cartsView } from '../../controllers/carts.controller.js';
import authMiddleware from '../../middleware/auth.mid.js';


const cartsViewRouter = Router()


cartsViewRouter.get("/",authMiddleware, cartsView)


export default cartsViewRouter