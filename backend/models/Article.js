// models/Article.js
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: String, // 'image' or 'video'
  url: String
});

const metaSchema = new mongoose.Schema({
  description: String,
  keywords: String,
  ogTitle: String,
  ogImage: String,
  ogDescription: String
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: String,
  meta: metaSchema,
  media: [mediaSchema],
  likes: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
