import express from 'express';
const router = express.Router();
import * as articleController from '../controllers/articleController.js'; // Import all named exports
import isAuthenticated from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js'; // <-- FIX: Import as a default export, no curly braces

// GET /api/articles - Fetch all articles
router.get('/articles', articleController.getAllArticles);

// GET /api/article/:slug - Fetch single article
router.get('/articles/:slug', articleController.getSingleArticle);

// POST /api/article - Create article (admin only)
router.post('/articles', articleController.createArticle);

// POST /api/generate - Trigger ChatGPT article generation (admin only)
router.post('/generates', articleController.generateArticle);

// FIX: Change to ES Module default export
export default router;