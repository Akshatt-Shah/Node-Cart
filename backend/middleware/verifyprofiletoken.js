const jwt = require('jsonwebtoken');

const verifyProfileToken = (req, res, next) => {
    
    // Extract the token from the request headers
    const tokennn = req.headers.authorization;
    console.log(tokennn)

    // Check if token is present
    if (!tokennn) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(tokennn, 'your-secret-key', (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err.message);
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }

        // Store decoded user information in request object for further use
        req.users = decoded;
        next(); // Call the next middleware or route handler
    });
};

module.exports = verifyProfileToken;
