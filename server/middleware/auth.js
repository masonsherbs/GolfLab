import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token format' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { 
      userId: decodedToken.userId, 
      email: decodedToken.email,
      accessLevel: decodedToken.accessLevel
    };
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default authMiddleware;