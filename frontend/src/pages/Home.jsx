import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = "https://trendwise-p440.onrender.com";

const Loader = () => {
  return (
    <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full animate-spin bg-gradient-to-r from-orange-400 via-purple-500 to-purple-700"
          style={{
            WebkitMaskImage: 'radial-gradient(farthest-side, transparent 75%, black 76%)',
            maskImage: 'radial-gradient(farthest-side, transparent 75%, black 76%)',
          }}
        ></div>
      </div>
      <div className="mt-5 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700 text-center">
        Please wait...
      </div>
    </div>
  );
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error("Error fetching articles:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

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
