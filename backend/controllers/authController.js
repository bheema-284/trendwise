// controllers/authController.js
import jwt from 'jsonwebtoken';

// Google OAuth callback
export const googleCallback = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Google authentication failed' });
    }

    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const frontendBase = process.env.FRONTEND_URL || 'https://trendwise-beta.vercel.app';
    // *** Redirect directly to the frontend's /admin route ***
    res.redirect(`${frontendBase}/?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
};

// Remove or refactor authSuccess as it's no longer needed for this flow
export const authSuccess = (req, res) => {
    res.status(200).send("Authentication successful! Redirecting...");
};


// Logout handler (remains the same)
export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};