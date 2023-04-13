import { Box, IconButton, Popover, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryDate = ({ currentDate, setCurrentDate }) => {
  const [anchor, setAnchor] = useState(null);

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

  const handlePopoverOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchor(null);
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box className="flex justify-center my-4">
      <IconButton onClick={handlePrevDate}>
        <ChevronLeft />
      </IconButton>

      <Typography
        variant="h6"
        onClick={handlePopoverOpen}
        className="w-72 text-center"
      >
        {formattedDate}
      </Typography>

      <IconButton onClick={handleNextDate}>
        <ChevronRight />
      </IconButton>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Calendar value={currentDate} onChange={setCurrentDate} />
      </Popover>
    </Box>
  );
};

export default DiaryDate;
