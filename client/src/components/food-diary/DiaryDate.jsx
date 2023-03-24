import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const DiaryDate = ({ currentDate, setCurrentDate }) => {
  const handlePrevDate = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  const handleNextDate = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box className="flex justify-center">
      <IconButton onClick={handlePrevDate}>
        <ChevronLeft />
      </IconButton>
      <Typography variant="h6">{formattedDate}</Typography>
      <IconButton onClick={handleNextDate}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default DiaryDate;
