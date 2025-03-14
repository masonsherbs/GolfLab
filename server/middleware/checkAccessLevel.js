const checkAccessLevel = (requiredLevel) => {
  return (req, res, next) => {
    if (req.userData && req.userData.accessLevel >= requiredLevel) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
    }
  };
};

export default checkAccessLevel;