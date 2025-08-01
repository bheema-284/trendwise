// controllers/commentController.js (Fully ES Module Compliant)

// FIX 1: Add .js extension to local model imports
// FIX 2: Import models as default exports (without curly braces) as they use `export default mongoose.model(...)`
import Comment from '../models/comment.js'; // Corrected import
import Article from '../models/Article.js'; // Corrected import

// POST /api/comment
// FIX 3: Change CommonJS `exports.functionName` to ES Module `export const functionName`
export const postComment = async (req, res) => {
    const { content, articleSlug } = req.body;
    if (!content || !articleSlug) {
        return res.status(400).json({ message: 'Comment content and article slug are required' });
    }

    try {
        const article = await Article.findOne({ slug: articleSlug });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const comment = new Comment({
            content,
            author: req.user._id, // Assuming req.user is populated by authentication middleware
            article: article._id
        });

        const newComment = await comment.save();
        // Populate author details for response
        await newComment.populate('author', 'name email'); // Populate 'name' and 'email' fields from the 'User' model
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET /api/comments/:slug
// FIX 3: Change CommonJS `exports.functionName` to ES Module `export const functionName`
export const getCommentsForArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const comments = await Comment.find({ article: article._id })
            .populate('author', 'name email') // Populate author details
            .sort({ createdAt: 1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};