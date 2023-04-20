import { Box, Button, Card, Skeleton, Typography } from '@mui/material';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import axios from 'axios';
import { useEffect, useState } from 'react';

const WeightChart = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/user/weight/${user._id}?timeRange=${timeRange}`
      );
      const chartData = {
        id: 'weight',
        data: response.data,
      };

      setData([chartData]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  const maxWeight = data.reduce(
    (acc, curr) => Math.max(acc, Math.max(...curr.data.map((d) => d.y))),
    0
  );

  const minWeight = data.reduce(
    (acc, curr) => Math.min(acc, Math.min(...curr.data.map((d) => d.y))),
    maxWeight // set initial value to maxWeight to ensure minWeight is calculated correctly
  );

  return (
    <Box className="w-full h-1/3 mb-8">
      <Card className="h-full p-10 pb-32">
        <Typography variant="h6">Your Weight Progress</Typography>
        <Box className="flex my-4 space-x-4">
          <Button
            variant={timeRange === '7days' ? 'contained' : 'outlined'}
            onClick={() => handleTimeRangeChange('7days')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30days' ? 'contained' : 'outlined'}
            onClick={() => handleTimeRangeChange('30days')}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === '90days' ? 'contained' : 'outlined'}
            onClick={() => handleTimeRangeChange('90days')}
          >
            90 Days
          </Button>
        </Box>
        {loading ? (
          <Skeleton className="h-full" />
        ) : (
          <ResponsiveScatterPlot
            data={data}
            margin={{ top: 40, right: 60, bottom: 50, left: 60 }}
            xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
              useUTC: false, // disable UTC
            }}
            yScale={{
              type: 'linear',
              min: minWeight - 10,
              max: maxWeight + 10,
            }}
            axisBottom={{
              orient: 'bottom',
              format: '%b %d', // use full date format
              tickValues: 'every day', // set tick values to every day
              tickSize: 5,
              tickPadding: 5,
              legend: 'Date',
              legendOffset: 40,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Weight (kg)',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            colors={['#00b900']}
            nodeSize={8}
            blendMode="multiply"
            enableGridX={false}
            enableGridY={true}
            useMesh={false}
            tooltip={({ node }) => {
              const { data } = node;
              const formattedX = new Date(data.x).toLocaleDateString();
              const formattedY = data.y;
              return (
                <div className="px-2 py-1 bg-white rounded border-black border-2">
                  <Typography variant="caption">
                    {formattedY} kg on {formattedX}
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

export default WeightChart;
