import { useLocation } from 'react-router-dom';

const Comments = () => {
    const location = useLocation();
    const { articleId, articleTitle, msg } = location.state || {};

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">
                Comments for: <span className="text-indigo-600">{articleTitle}</span>
            </h1>
            <p>Article ID: {articleId}</p>
            <p>Total Message: {msg || 0}</p>

            {/* Add form and comments list here */}
        </div>
    );
};

export default Comments;
