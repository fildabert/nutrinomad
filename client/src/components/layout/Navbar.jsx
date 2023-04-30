import { Box, Button, Link } from '@mui/material';
import { ReactComponent as NutriNomadLogo } from '../../assets/images/nutrinomad.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import AvatarPopover from './AvatarPopover';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  return (
    <Box className="p-2 pt-4 flex justify-between items-center flex-wrap">
      <Link href="/">
        <NutriNomadLogo className="w-32 sm:w-40" />
      </Link>
      {user && (
        <Box className="flex space-x-4 sm:space-x-8">
          <Button
            variant="outlined"
            href="/food/diary"
            className="text-xs sm:text-sm"
          >
            Food Diary
          </Button>
          <AvatarPopover />
        </Box>
      )}

      {!user && pathname !== '/sign-in' && (
        <Link href="/sign-in" className="text-lg">
          Sign in
        </Link>
      )}
    </Box>
  );
};

export default Navbar;
