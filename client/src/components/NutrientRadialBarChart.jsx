import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const NutrientRadialBarChart = ({ name, value, max, fill }) => {
  const data = [{ name, value, max, fill }];

  const renderChart = (data) => (
    <ResponsiveContainer width={150} height={150}>
      <RadialBarChart
        innerRadius="40%"
        outerRadius="60%"
        data={data}
        barSize={20}
      >
        <RadialBar clockWise dataKey="value" fill={fill} background />
        <RadialBar clockWise data={[{ value: max }]} />
        <Tooltip
          separator={''}
          position={{ x: 115, y: 50 }}
          labelFormatter={() => name}
          formatter={() => [`${value}/${max} g`]}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );

  return <div>{renderChart(data)}</div>;
};

export default NutrientRadialBarChart;
