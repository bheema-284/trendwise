import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { slug } = useParams();
  console.log("slug", slug)
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:10000/api/articles/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => {
        console.error('Failed to fetch article:', err);
      });
  }, [slug]);


  if (!article) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default Article;