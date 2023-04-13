import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Typography } from '@mui/material';

const NutrientRadialBarChart = ({ name, value, max, fill }) => {
  const macroData = [
    {
      id: name,
      data: [
        {
          x: name,
          y: value,
          tooltip: `${name}: ${value} g / ${max} g`,
        },
      ],
    },
  ];

  return (
    <ResponsiveRadialBar
      data={macroData}
      width={100}
      height={100}
      maxValue={max}
      innerRadius={0.1}
      padding={0.6}
      endAngle={360}
      cornerRadius={0}
      colors={fill}
      enableRadialGrid={false}
      enableCircularGrid={false}
      enableSliceLabels={false}
      radialAxisStart={false}
      circularAxisOuter={false}
      animate={true}
      tooltip={({ bar }) => {
        const color = bar.color;

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
            <Typography variant="caption">{bar.data.tooltip}</Typography>
          </div>
        );
      }}
    />
  );
};

export default NutrientRadialBarChart;
