import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  meta: String,
  media: [String],
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Article', articleSchema);