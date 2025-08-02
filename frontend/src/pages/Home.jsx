import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// IMPORTANT: Replace this with your deployed Render backend URL when deploying!
// For local development, keep it as localhost.
const BASE_URL = "http://localhost:10000";

// Loader component for a better user experience during data fetching
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-full animate-spin border-4 border-t-4 border-purple-500 border-opacity-25"
          style={{
            borderTopColor: 'rgb(168 85 247 / var(--tw-border-opacity))', // Tailwind purple-500
            WebkitMaskImage: 'radial-gradient(farthest-side, transparent 75%, black 76%)',
            maskImage: 'radial-gradient(farthest-side, transparent 75%, black 76%)',
          }}
        ></div>
        <div className="absolute text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700">
          Loading...
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate('/comments', {
      state: {
        articleId: article._id,
        articleTitle: article.title
      }
    });
  };
  useEffect(() => {
    // Fetch articles from the backend API
    axios
      .get(`${BASE_URL}/api/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later."); // Set user-friendly error message
      })
      .finally(() => setLoading(false)); // Always set loading to false when done
  }, []);

  // Display loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // Display error message if fetching failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 1 1-1.697-1.697l2.758-3.887-2.758-3.887a1.2 1.2 0 1 1 1.697-1.697L10 8.103l2.651-3.746a1.2 1.2 0 1 1 1.697 1.697L11.103 10l3.746 2.651a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 leading-tight">
          TrendWise: Discover What's Trending
        </h1>

        {articles.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 text-lg">
            No articles found. Check back later!
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {articles.map((article) => (
              <div
                key={article._id}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Article Image */}
                {article.media && article.media.length > 0 && article.media[0].type === 'image' && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={article.media[0].url}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x450/6B7280/FFFFFF?text=Image+Not+Found`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  {/* Title wrapped in Link */}
                  <Link to={`/article/${article.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight hover:underline">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Description */}
                  {article.meta?.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-3">
                      {article.meta.description}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      {/* Date */}
                      {article.createdAt && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      )}

                      {/* Likes */}
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                        {article.likes || 0}
                      </span>

                      {/* Comments (clickable to #comments) */}
                      <button
                        onClick={() =>
                          navigate('/comments', {
                            state: {
                              articleId: article._id,
                              articleTitle: article.title,
                              msg: article.commentsCount
                            }
                          })
                        }
                        className="flex items-center hover:underline text-sm text-gray-500 dark:text-gray-400"
                      >
                        <svg
                          className="w-4 h-4 mr-1 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.339-4.69A8.842 8.842 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {article.commentsCount || 0}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
