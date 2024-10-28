import jwt from 'jsonwebtoken';
import "dotenv/config.js"


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token is required' });
  }
    

  try {
    const key = process.env.SECRET_KEY
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token not validated or expired' });
  }
    
};


export default authMiddleware;