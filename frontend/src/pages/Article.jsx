import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const BASE_URL = "http://localhost:10000";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/articles/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => {
        console.error('Failed to fetch article:', err);
      });
  }, [slug]);


  if (!article) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
    Loading ...
  </div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-md space-y-6">
      {/* Meta image */}
      {article.media?.[0]?.type === 'image' && (
        <img
          src={article.media[0].url}
          alt={article.meta?.ogTitle || 'Article Image'}
          className="w-full rounded-lg object-cover"
        />
      )}

      {/* Title and meta info */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By {article.author || "Anonymous"} • Published {format(new Date(article.createdAt), 'PPP')} • Updated {format(new Date(article.updatedAt), 'PPP')}
        </p>
      </div>

      {/* Social preview (meta) */}
      {article.meta?.description && (
        <div className="p-4 border border-indigo-200 dark:border-indigo-700 rounded bg-indigo-50 dark:bg-indigo-900">
          <p className="font-medium">{article.meta.ogDescription ||article. meta.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{article.meta.keywords}</p>
        </div>
      )}

      {/* Article content */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Footer Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t pt-4 mt-6">
        <span>👍 {article.likes} likes</span>
        <span>💬 {article.commentsCount} comments</span>
      </div>
    </div>
  );
};

export default Article;