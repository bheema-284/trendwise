// middleware/authMiddleware.js

// Note: The 'jsonwebtoken' import is commented out as it was for a JWT-based authentication
// example. If you are solely relying on Passport.js sessions (req.isAuthenticated()),
// you don't need the 'jsonwebtoken' library here.
// import jwt from 'jsonwebtoken';

/**
 * Middleware to check if a user is authenticated.
 * This function relies on Passport.js's `req.isAuthenticated()` method,
 * which checks if a user is logged in via a session.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const isAuthenticated = (req, res, next) => {
    // Passport.js populates req.isAuthenticated() if a user is logged in
    if (req.isAuthenticated()) {
        // If the user is authenticated, proceed to the next middleware or route handler
        return next();
    }

    // If not authenticated, send a 401 Unauthorized response
    res.status(401).json({ message: 'Authentication required. Please log in.' });


    // Uncomment and adapt this section if you want to implement JWT-based authentication
    // alongside or instead of session-based authentication.
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token using your JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded.user; // Assuming your JWT payload has a 'user' object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If token verification fails (e.g., invalid or expired token)
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Export `isAuthenticated` as the default export for this module.
// This matches the `import isAuthenticated from '../middleware/authMiddleware.js';` syntax.
export default isAuthenticated;