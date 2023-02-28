import { Box, Typography } from '@mui/material';

const SignUpSuccess = ({ goal, bmr }) => {
  return (
    <Box className="text-center">
      <Typography className="text-3xl font-medium mb-10">
        You're Signed Up!
      </Typography>
      <Typography>To {goal} weight, you need to consume:</Typography>
      <Typography variant="h3" className="font-bold">
        {bmr}
      </Typography>
      <Typography className="mb-10">calories/day</Typography>
    </Box>
  );
};

export default SignUpSuccess;
