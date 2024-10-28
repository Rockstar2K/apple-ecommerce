import User from "../models/user.model.js";
import MongoManager from "./manager.js";


const usersMongoManager = new MongoManager(User)
export default usersMongoManager