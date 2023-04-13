import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import AppLayout from '../../components/layout/AppLayout';
import ActivityCalendar from '../../components/chart/ActivityCalendar';
import { useAuthContext } from '../../hooks/useAuthContext';
import CaloriesChart from '../../components/chart/CaloriesChart';

const Dashboard = () => {
  const { user } = useAuthContext();
  return (
    <AppLayout>
      {user && (
        <>
          <Box className="mb-4">
            <Typography variant="h6">Welcome, {user.name}</Typography>
          </Box>

          <ActivityCalendar user={user} />
          <CaloriesChart user={user} />
        </>
      )}
    </AppLayout>
  );
};

export default Dashboard;
