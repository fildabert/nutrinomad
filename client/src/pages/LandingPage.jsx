import illustration1 from '../assets/images/illustration1.png';
import Button from '@mui/material/Button';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <Box className="flex flex-row justify-between items-center my-20">
        <Box className="flex-1 p-10">
          <Typography variant="h1" className="text-4xl font-bold mb-2">
            Empowering healthy journeys, one bite at a time.
          </Typography>
          <Typography className="text-base mb-4">
            Track your nutrition, fuel your life. Start your nutritious journey
            with NutriNomad today.
          </Typography>
          <Button
            variant="contained"
            className="w-32 text-white"
            href="/sign-up"
          >
            Sign Up
          </Button>
        </Box>
        <Box className="flex-1 flex justify-center items-center">
          <img src={illustration1} alt="Illustration" className="w-3/4"></img>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
