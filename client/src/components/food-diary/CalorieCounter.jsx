import { Box, Card, Typography } from '@mui/material';

const CalorieCounter = ({ bmr, totalCalories }) => {
  const goalCalorie = bmr;
  const calorieConsumed = totalCalories;
  const remainingCalories = goalCalorie - calorieConsumed;

  return (
    <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 m-auto p-4">
      <Box className="flex justify-between items-center text-center px-16">
        <Box>
          <Typography variant="h5">{goalCalorie}</Typography>
          <Typography variant="caption" className="text-gray-500">
            Goal
          </Typography>
        </Box>
        <Typography variant="h5">-</Typography>
        <Box>
          <Typography variant="h5">{calorieConsumed}</Typography>
          <Typography variant="caption" className="text-gray-500">
            Food
          </Typography>
        </Box>
        <Typography variant="h5">=</Typography>
        <Box>
          <Typography variant="h5">{remainingCalories}</Typography>
          <Typography variant="caption" className="text-gray-500">
            Remaining
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CalorieCounter;
