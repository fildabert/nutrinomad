import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Link,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ReactComponent as NutriNomadLogo } from '../../assets/images/nutrinomad.svg';

const Footer = () => {
  return (
    <div className="bottom-0 left-0 right-0 h-16 px-12 py-16 bg-sky-900 text-white flex items-center justify-center">
      <NutriNomadLogo className="w-40" />
      <Box className="mx-auto text-center">
        <Typography variant="body2">
          &copy; 2023 NutriNomad. All rights reserved.
        </Typography>
        <Typography variant="body2" className="mt-4">
          Illustrations by storyset on Freepik
        </Typography>
      </Box>

      <div className="flex ml-4">
        <a
          href="https://github.com/VELDR/nutrinomad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="text-white mx-2 hover:text-gray-500 transition duration-300" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="text-white mx-2 hover:text-gray-500 transition duration-300" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon className="text-white mx-2 hover:text-gray-500 transition duration-300" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className="text-white mx-2 hover:text-gray-500 transition duration-300" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
