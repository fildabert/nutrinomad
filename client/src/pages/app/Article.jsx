import { Box, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';

const Article = () => {
  const location = useLocation();
  const article = location.state?.article;

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const publishedAt = new Date(article.publishedAt).toLocaleString(
    undefined,
    options
  );

  return (
    <AppLayout>
      <Box className="mx-8 my-4">
        <Typography className="text-3xl font-bold mb-4">
          {article?.title}
        </Typography>
        <div className="flex justify-between mb-4">
          <Typography className="text-gray-500">{article?.author}</Typography>
          <Typography className="text-gray-500">{publishedAt}</Typography>
        </div>
        <img
          src={article?.urlToImage}
          alt={article?.title}
          className="w-1/2 h-auto mb-4 m-auto"
        />
        <Typography variant="body1" className="leading-relaxed mb-4">
          {article?.description}
        </Typography>
        <Typography variant="body1" className="leading-relaxed mb-4">
          {article?.content}
        </Typography>
        <Link href={article?.url} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </Link>
      </Box>
    </AppLayout>
  );
};

export default Article;
