// models/Article.js (ES Module Version)
import mongoose from 'mongoose'; // <-- No change needed here

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming you'll have a User model later for article authors
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update `updatedAt` on save
ArticleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Fix: Change from CommonJS 'module.exports' to ES Module 'export default'
export default mongoose.model('Article', ArticleSchema);