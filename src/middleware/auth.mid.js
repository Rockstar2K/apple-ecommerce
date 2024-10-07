import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Se requiere un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'clave_secreta_super_segura');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

export default authMiddleware;