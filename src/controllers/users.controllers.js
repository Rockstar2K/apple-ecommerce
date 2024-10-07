import usersManager from "../data/users.manager.js"
import jwt from 'jsonwebtoken';


async function readAllUsers(req, res, next) {
    try {
        let { role } = req.query;
        let response;
        if (!role) {
            response = await usersManager.read()
        } else {
            response = await usersManager.read(role)
        }
        if (response.length > 0) {
            return res.status(200).json({ response })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404;
            throw error
        }
    } catch (error) {
        return next(error)
    }
};

async function getUser(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersManager.readOne(uid)
        if (response) {
            return res.status(200).json({ response })
        } else {
            const error = new Error("USER NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
};

async function create(req, res, next) {
    try {
        let data = req.body

        const responseManager = await usersManager.create(data)
        return res.status(201).json({ message: "User created", response: responseManager })

    } catch (error) {
        return next(error)
    }
};

async function update(req, res, next) {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const responseManager = await usersManager.update(uid, newData);
        if (!responseManager) {
            const error = new Error(`User with id ${uid} doesnt exists`)
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({ message: "User updated", response: responseManager })
    } catch (error) {
        return next(error)
    }
};

async function deleteUser(req, res, next) {
    try {
        const { uid } = req.params;
        const responseManager = await usersManager.delete(uid);
        if (!responseManager) {
            const error = new Error(`User with id ${uid} not found`)
            error.statusCode = 404;
            throw error
        };
        return res.status(200).json({ message: "User deleted", response: responseManager })

    } catch (error) {
        return next(error)
    }
}

const registerView = async (req, res, next) =>{
    try {
        const users = await usersManager.read()
        return res.render("register", {users})
    } catch (error) {
        return next(error)
    }
}

async function profileView (req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersManager.readOne(uid)
        if (response) {
            return res.render("myProfile",{data:response})
        } else {
            const error = new Error("PRODUCT NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

async function login (req, res) {

    const { email, password } = req.body;

    const user = await usersManager.readByEmail(email);
    if (!user || password !== user.password) {
      return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const CLAVE='clave_secreta_super_segura' //Esta clave luego la moveré a una variable de entorno
      const token = jwt.sign(payload, CLAVE, { expiresIn: '1h' });
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
        const decoded = jwt.verify(token, 'clave_secreta_super_segura');
        
        res.status(200).json({ userId: decoded.id });
      } catch (error) {
        res.status(401).json({ message: 'Token not available' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
}

export { readAllUsers, getUser, create, update, deleteUser, registerView, profileView, login, logout, getUserId }