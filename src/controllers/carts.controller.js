import cartsMongoManger from "../data/mongo/managers/cart.manager.js";
import Controller from "./controller.js";

const cartController = new Controller(cartsMongoManger, "CART")
const { create, readAll, read,  update, destroy} = cartController;

export { create, readAll, read,  update, destroy}