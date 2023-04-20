import { Box, Button, Container, Typography } from '@mui/material';
import illustration404 from '../../assets/images/404.png';
import Navbar from '../../components/layout/Navbar';

const ErrorPage = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <Box className="flex flex-col justify-center items-center">
        <img src={illustration404} alt="404" className="w-3/5"></img>
        <Typography variant="h5" className="text-center font-bold mb-2">
          Page not found
        </Typography>
        <Typography
          variant="body1"
          className="text-center font-normal px-36 mb-7"
        >
          We couldn't find what you were looking for. Please try again with a
          different search term or URL.
        </Typography>
        <Button variant="contained" className="text-white" href="/">
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
