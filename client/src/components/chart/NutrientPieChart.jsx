import { Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

const COLORS = ['#CC3366', '#FFE07D', '#99CC66'];

const NutrientPieChart = ({ protein, fat, carbs }) => {
  const data = [
    { 'id': 'Protein', 'value': protein },
    { 'id': 'Fat', 'value': fat },
    { 'id': 'Carbs', 'value': carbs },
  ];

  return (
    <ResponsivePie
      data={data}
      colors={COLORS}
      width={100}
      height={100}
      innerRadius={0.6}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      activeOuterRadiusOffset={1}
      animate={true}
      tooltip={({ datum }) => {
        const color = datum.color;

        return (
          <div
            className="flex items-center p-2 bg-white rounded whitespace-nowrap overflow-hidden text-ellipsis"
            style={{
              border: `1px solid ${color}`,
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: color,
                marginRight: '8px',
              }}
            ></div>
            <Typography variant="caption">
              {datum.id}: {datum.value} g
            </Typography>
          </div>
        );
      }}
    />
  );
};

export default NutrientPieChart;
