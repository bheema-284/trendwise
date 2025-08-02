import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [articles, setArticles] = useState([]);
  const BASE_URL = "https://trendwise-p440.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/articles`)
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Trending Articles
      </h1>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors duration-200"
          >
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {article.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default Home;