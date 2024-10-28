import { Router } from 'express';
import { registerView, profileView, login, logout, getUserId } from '../../controllers/users.controllers.js';
import authMiddleware from '../../middleware/auth.mid.js';


const usersViewRouter = Router()

usersViewRouter.get("/register", registerView)
usersViewRouter.get("/login", (req, res)=>res.render("login"))
usersViewRouter.post("/login", login)
usersViewRouter.post("/logout", logout)
usersViewRouter.get("/getUserId", getUserId)
usersViewRouter.get("/:uid",authMiddleware, profileView)


export default usersViewRouter