const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check for the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Split the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId; // Attach userId to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle any errors (e.g., invalid token)
    res.status(401).json({ error: 'Authentication failed' });
  }
};
