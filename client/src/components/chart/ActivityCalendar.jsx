import { Box, Card, Skeleton, Typography } from '@mui/material';
import { ResponsiveCalendar } from '@nivo/calendar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityCalendar = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(`/api/diary/calendar/${user._id}`);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="mb-8 h-96 w-full">
      <Card className="h-full p-10">
        <Typography variant="h6">Your Activity</Typography>
        {loading ? (
          <Skeleton className="h-full" />
        ) : (
          <ResponsiveCalendar
            data={data}
            from="2023-01-01"
            to="2023-12-31"
            emptyColor="#eeeeee"
            colors={[
              'rgba(25, 255, 25, 0.2)',
              'rgba(25, 255, 25, 0.4)',
              'rgba(25, 255, 25, 0.6)',
              'rgba(25, 255, 25, 0.8)',
              'rgba(25, 255, 25, 1)',
            ]}
            maxValue={10}
            margin={{ top: 80, right: 20, bottom: 80, left: 20 }}
            monthBorderColor="#fff"
            daySpacing={2}
            dayBorderWidth={2}
            dayBorderColor="#fff"
            tooltip={(data) => {
              const date = new Date(data.day);
              const dayOfWeek = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
              }).format(date);
              const month = new Intl.DateTimeFormat('en-US', {
                month: 'long',
              }).format(date);
              return (
                <div className="p-2 bg-white rounded whitespace-nowrap overflow-hidden text-ellipsis border-black border-2">
                  <Typography variant="caption">{`${
                    data.value
                  } foods logged on ${dayOfWeek}, ${month} ${date.getDate()}, ${date.getFullYear()}.`}</Typography>
                </div>
              );
            }}
          />
        )}
      </Card>
    </Box>
  );
};

export default ActivityCalendar;
