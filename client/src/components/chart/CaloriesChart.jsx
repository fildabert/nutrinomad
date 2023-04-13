import { Box, Card, Skeleton, Typography } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CaloriesChart = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(`/api/diary/calories/week/${user._id}`);
    const chartData = {
      id: 'calories',
      data: response.data,
    };
    setData([chartData]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="w-full h-2/5 mb-8">
      <Card className="h-full p-10">
        <Typography variant="h6">Calories consumed last 7 days</Typography>
        {loading ? (
          <Skeleton className="h-full" />
        ) : (
          <ResponsiveLine
            data={data}
            margin={{ top: 40, right: 60, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Weekdays',
              legendOffset: 40,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Calories (kcal)',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            colors={'#00b900'}
            pointSize={6}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            enableCrosshair={false}
            tooltip={({ point }) => {
              return (
                <div className="px-2 py-1 bg-white rounded border-black border-2">
                  <Typography variant="caption">
                    {point.data.y} kcal consumed on {point.data.x}
                  </Typography>
                </div>
              );
            }}
          />
        )}
      </Card>
    </Box>
  );
};

export default CaloriesChart;
