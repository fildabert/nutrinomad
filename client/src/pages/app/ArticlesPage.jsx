import axios from 'axios';
import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { Card, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_NEWS_API_URL}/everything?q=food+nutrition+diet+exercise&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=30`
        );
        setArticles(response.data.articles);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    const articleId = uuidv4();
    navigate(`/articles/${encodeURIComponent(articleId)}`, {
      state: { article, articleId },
    });
  };

  return (
    <AppLayout>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} md={6} key={article.url}>
            <Card
              className="h-60 shadow-md overflow-hidden hover:brightness-75"
              onClick={() => handleArticleClick(article)}
            >
              <Grid container spacing={2} className="h-full">
                <Grid item xs={12} md={5}>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  className="flex flex-col justify-between"
                >
                  <div className="p-4">
                    <Typography
                      variant="h6"
                      className="font-bold mb-2 overflow-hidden max-h-24 text-ellipsis"
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="overflow-hidden max-h-16 text-ellipsis"
                    >
                      {article.description}
                    </Typography>
                  </div>
                  <div className="p-4">
                    <Typography variant="body2" className="text-gray-500">
                      {article.author}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AppLayout>
  );
};

export default ArticlesPage;
