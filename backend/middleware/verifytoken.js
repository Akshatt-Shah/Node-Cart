const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("first")
    // Extract the token from the request headers
    const token = req.headers.authorization;
    console.log("Inside verify token ", token)
    // Check if token is present
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err.message);
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }
        console.log("decoded: ", decoded)

        // Store decoded user information in session
        req.session.user = decoded;

        // Continue to the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;
