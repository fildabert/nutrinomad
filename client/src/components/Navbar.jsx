import { Box, Link } from '@mui/material';
import { ReactComponent as NutriNomadLogo } from '../assets/images/nutrinomad.svg';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import AvatarPopover from './AvatarPopover';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  return (
    <Box className="p-2 pt-4 flex justify-between flex-wrap">
      <Link href="/">
        <NutriNomadLogo className="w-40" />
      </Link>
      {/* TODO: Handle state when signed in or not */}
      {user && (
        <Box className="flex">
          <AvatarPopover />
          {/* <Avatar>{user.name.charAt(0)}</Avatar>
          <Link onClick={handleSignOut} className="text-lg" href="/">
            Sign Out
          </Link> */}
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
