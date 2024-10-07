import { Router } from "express";
import {
    createNewCart,
    updateCart,
    deleteCart,
    getCartById,
    addProductToCart,
} from "../../controllers/cart.controller.js";

const cartsApiRouter = Router()

// Create a new cart
cartsApiRouter.post('/', createNewCart);

// Get a cart by ID
cartsApiRouter.get('/:cid', getCartById);

// Update a cart
cartsApiRouter.put('/:cid', updateCart);

// Delete a cart
cartsApiRouter.delete('/:cid', deleteCart);

// Add product to cart
cartsApiRouter.post('/:cid/products/:pid', addProductToCart);



// Delete product from cart
//cartsApiRouter.post('/:cid/products/:pid', deleteProductFromCart);

export default cartsApiRouter