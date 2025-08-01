import express from 'express';
import {
  getAllArticles,
  getArticleBySlug,
  createArticle
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/articles', getAllArticles);
router.get('/articles/:slug', getArticleBySlug);
router.post('/articles', createArticle);


export default router;