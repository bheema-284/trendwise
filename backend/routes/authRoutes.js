// routes/authRoutes.js (ES Module Version)
import express from 'express';
const router = express.Router();
import passport from 'passport';
// Fix 1: Add .js extension to the local import
import * as authController from '../controllers/authController.js'; // <-- IMPORTANT: Add .js and use * as if controller has named exports

// GET /auth/google - Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback - Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), // Redirect to home on failure
    authController.googleCallback // Access named export
);

// Route for successful authentication (frontend redirect target)
router.get('/success', authController.authSuccess); // Access named export

// GET /auth/logout - Logout
router.get('/logout', authController.logout); // Access named export

// Fix 2: Change to ES Module default export
export default router;