import illustration1 from '../../assets/images/illustration1.png';
import illustration2 from '../../assets/images/illustration2.png';
import illustration3 from '../../assets/images/illustration3.png';
import Button from '@mui/material/Button';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <Box className="mb-44">
        <Box className="flex flex-row justify-between items-center my-20">
          <Box className="flex-1 p-10">
            <Typography variant="h1" className="text-4xl font-bold mb-2">
              Empowering healthy journeys, one bite at a time.
            </Typography>
            <Typography className="text-base mb-4">
              Track your nutrition, fuel your life. Start your nutritious
              journey with NutriNomad today.
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

        <Box className="flex flex-row justify-between items-center my-20">
          <Box className="flex-1 flex justify-center items-center">
            <img src={illustration2} alt="Illustration" className="w-3/4"></img>
          </Box>
          <Box className="flex-1 p-10">
            <Typography variant="h1" className="text-4xl font-bold mb-2">
              Personalized nutrition insights.
            </Typography>
            <Typography className="text-base mb-4">
              Personalized diet plans designed to help you achieve your health
              and wellness goals.
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-row justify-between items-center my-20">
          <Box className="flex-1 p-10">
            <Typography variant="h1" className="text-4xl font-bold mb-2">
              Calorie and macronutrient tracking.
            </Typography>
            <Typography className="text-base mb-4">
              Take control of your health with personalized calorie and
              macronutrient tracking.
            </Typography>
          </Box>
          <Box className="flex-1 flex justify-center items-center">
            <img src={illustration3} alt="Illustration" className="w-3/4"></img>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default LandingPage;
