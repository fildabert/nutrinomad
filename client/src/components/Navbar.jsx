import { Box, Link } from '@mui/material';
import { ReactComponent as NutriNomadLogo } from '../assets/images/nutrinomad.svg';

const Navbar = () => {
  return (
    <Box className="p-2 pt-4 flex justify-between">
      <Link href="/">
        <NutriNomadLogo className="w-40" />
      </Link>
      {/* TODO: Handle state when signed in or not */}
      <Link href="/create/sign-in" className="text-lg">
        Sign in
      </Link>
    </Box>
  );
};

export default Navbar;
