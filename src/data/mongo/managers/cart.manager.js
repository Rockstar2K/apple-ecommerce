import Cart from "../models/cart.model.js";
import MongoManager from "./manager.js";

const cartsMongoManger = new MongoManager(Cart);

export default cartsMongoManger