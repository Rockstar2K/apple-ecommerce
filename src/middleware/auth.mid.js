import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Se requiere un token.' });
  }
    

  try {
    const decoded = jwt.verify(token, 'my_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
    
};


export default authMiddleware;