import usersManager from "../data/fs/users.fs.js"
import jwt from 'jsonwebtoken';
import usersMongoManager from "../data/mongo/managers/user.manager.js";
import Controller from "./controller.js";

const usersController = new Controller(usersManager, "USER")
const { create, readAll, read,  update, destroy} = usersController;

const registerView = async (req, res, next) => {
    try {
        const users = await usersManager.read()
        return res.render("register", { users })
    } catch (error) {
        return next(error)
    }
}

async function profileView(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.readOne(uid)
        if (response) {
            return res.render("myProfile", { data: response })
        } else {
            const error = new Error("USER NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

async function login(req, res) {

    const { email, password } = req.body;

    const user = await usersMongoManager.readByEmail(email);
    if (!user || password !== user.password) {
        return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    const payload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const CLAVE = process.env.SECRET_KEY
    const token = jwt.sign(payload, CLAVE, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
    });

    res.json({ success: true, message: 'Auth successful' });
}

async function logout(req, res) {
    res.clearCookie('token', { path: '/' });

    res.status(200).json({ message: 'Session ended' });
}

async function getUserId(req, res) {
    const token = req.cookies.token;

    if (token) {
        try {
            const clave = process.env.SECRET_KEY
            const decoded = jwt.verify(token, clave);

            res.status(200).json({ userId: decoded.id });
        } catch (error) {
            res.status(401).json({ message: 'Token not available' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}


export { create, readAll, read, update, destroy, registerView, profileView, login, logout, getUserId }