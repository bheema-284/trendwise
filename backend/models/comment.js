import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you'll have a User model later for comment authors
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Comment', CommentSchema);

//module.exports = mongoose.model('Comment', CommentSchema);