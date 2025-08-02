import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const BASE_URL = "https://trendwise-p440.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/articles/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => {
        console.error('Failed to fetch article:', err);
      });
  }, [slug]);


  if (!article) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        {article.title}
      </h1>

      <div
        className="prose prose-indigo max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>

  );
};

export default Article;