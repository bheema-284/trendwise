import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/articles')
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Trending Articles</h1>
      {articles.map(article => (
        <div key={article._id} className="mb-2">
          <Link to={`/article/${article.slug}`} className="text-blue-500 underline">
            {article.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;