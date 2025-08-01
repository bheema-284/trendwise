// routes/commentRoutes.js
import express from 'express';
const router = express.Router();
import * as commentController from '../controllers/commentController.js'; // <-- IMPORTANT: * as for named exports
import isAuthenticated from '../middleware/authMiddleware.js'; // Assuming it's a default export now

// POST /api/comment - Post comment (auth required)
router.post('/comments', isAuthenticated, commentController.postComment);

// GET /api/comments/:slug - Get comments for article
router.get('/comments/:slug', commentController.getCommentsForArticle);

export default router; // <-- IMPORTANT: Default export for the router itself