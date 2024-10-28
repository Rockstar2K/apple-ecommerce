import productsManager from "../data/fs/products.fs.js"
import productsMongoManager from "../data/mongo/managers/product.manager.js";
import Controller from "./controller.js";

const productsController = new Controller(productsManager, "PRODUCT")
const { create, readAll, read,  update, destroy} = productsController;

export { create, readAll, read,  update, destroy}