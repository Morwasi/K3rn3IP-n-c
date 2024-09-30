// jwtMiddleware.js
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded user information to the request
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = jwtMiddleware;
