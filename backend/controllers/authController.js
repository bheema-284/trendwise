// controllers/authController.js (Fully ES Module Compliant)
import jwt from 'jsonwebtoken';

// Callback after Google OAuth authentication
// FIX: Change `exports.googleCallback` to `export const googleCallback`
export const googleCallback = (req, res) => {
    // Successful authentication, redirect or respond with user info/token
    // req.user contains the authenticated user object from Passport
    if (!req.user) {
        return res.status(401).json({ message: 'Google authentication failed' });
    }

    // Example: Generate a JWT token after successful Google login
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect to a frontend page with the token or user info
    // For a real application, you'd typically redirect to a frontend
    // that then receives this token (e.g., in a query parameter or cookie)
    res.redirect(`/success?token=${token}&name=${req.user.name}&email=${req.user.email}`);
};

// Simple success redirect for frontend
// FIX: Change `exports.authSuccess` to `export const authSuccess`
export const authSuccess = (req, res) => {
    const { token, name, email } = req.query;
    res.send(`
        <h1>Authentication Successful!</h1>
        <p>Welcome, ${name} (${email})</p>
        <p>Your token: ${token}</p>
        <p>Store this token securely on the client side for future API requests.</p>
        <p>Example: Include in 'Authorization' header as 'Bearer ${token}'</p>
        <a href="/">Go to Home</a>
    `);
};

// Logout handler
// FIX: Change `exports.logout` to `export const logout`
export const logout = (req, res) => {
    req.logout((err) => { // Passport's logout method, needs 'next' if error occurs
        if (err) {
            // It's good practice to pass errors to the next middleware for proper handling
            return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};