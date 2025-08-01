import Article from '../models/Article.js';

export const getAllArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
};

export const getArticleBySlug = async (req, res) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug });
  if (!article) return res.status(404).json({ message: 'Not found' });
  res.json(article);
};

export const createArticle = async (req, res) => {
  const { title, slug, meta, content, media } = req.body;
  const article = new Article({ title, slug, meta, content, media });
  await article.save();
  res.status(201).json(article);
};