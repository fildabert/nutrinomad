import { Box, Toolbar } from '@mui/material';
import SideBar from './SideBar';
import TopBar from './TopBar';

const AppLayout = ({ children }) => {
  return (
    <Box className="flex flex-col min-h-screen">
      <TopBar />
      <Box className="flex grow">
        <SideBar />
        <Box className="grow p-3">
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
