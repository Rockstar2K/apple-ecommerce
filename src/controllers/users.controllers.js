import usersManager from "../data/fs/users.fs.js"
import jwt from 'jsonwebtoken';
import usersMongoManager from "../data/mongo/managers/user.mongo.js";

async function create(req, res, next) {
    try {
        const data = req.body

        const response = await usersMongoManager.create(data)
        return res.status(201).json({ message: "User created", response: response })

    } catch (error) {
        return next(error)
    }
};

async function readAll(req, res, next) {
    try {
        const filter = req.query;
        const response = response = await usersMongoManager.readAll(filter)
        if (response){
            return res.status(200).json({message: "PRODUCTS READ", response: response})
        } else{
            const error = new Error("USERS NOT FOUND")
            error.statusCode = 404;
            throw error
        }
    } catch (error) {
        return next(error)
    }
};

async function read(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.read(uid)
        if (response) {
            return res.status(200).json({ message: "USER FOUND", response: response })
        } else {
            const error = new Error("USER NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { uid } = req.params;
        const data = req.body;
        const response = await usersMongoManager.update(uid, data);
        if (!response) {
            const error = new Error(`User with id ${uid} doesnt exists`)
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({ message: "User updated", response: response })
    } catch (error) {
        return next(error)
    }
};

async function destroy(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.delete(uid);
        if (!response) {
            const error = new Error(`User with id ${uid} not found`)
            error.statusCode = 404;
            throw error
        };
        return res.status(200).json({ message: "User deleted", response: response })

    } catch (error) {
        return next(error)
    }
}

const registerView = async (req, res, next) =>{
    try {
        const users = await usersMongoManager.read()
        return res.render("register", {users})
    } catch (error) {
        return next(error)
    }
}

async function profileView (req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.readOne(uid)
        if (response) {
            return res.render("myProfile",{data:response})
        } else {
            const error = new Error("USEUR NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

async function login (req, res) {

    const { email, password } = req.body;

    const user = await usersMongoManager.readByEmail(email);
    if (!user || password !== user.password) {
      return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const KEY='my_secret_key' //Esta clave luego la moveré a una variable de entorno
      const token = jwt.sign(payload, KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true, 
      maxAge: 3600000, 
    });
  
    res.json({ success: true, message: 'Auth successful' });
}

async function logout (req, res) {
    res.clearCookie('token', { path: '/' });
  
    res.status(200).json({ message: 'Session ended' });
}

async function getUserId(req, res){
    const token = req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, 'my_secret_key');
        
        res.status(200).json({ userId: decoded.id });
      } catch (error) {
        res.status(401).json({ message: 'Token not available' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
}

export { readAll, read, create, update, destroy, registerView, profileView, login, logout, getUserId }