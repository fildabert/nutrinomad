import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const COLORS = ['#CC3366', '#FFE07D', '#99CC66'];

const NutrientPieChart = ({ protein, fat, carbs, quantity }) => {
  const data = [
    { name: 'Protein', value: protein },
    { name: 'Fat', value: fat },
    { name: 'Carbs', value: carbs },
  ];

  return (
    <PieChart width={75} height={75}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={20}
        outerRadius={35}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          value={quantity}
          position="center"
          className="font-bold"
          fill="black"
        />
      </Pie>
    </PieChart>
  );
};

export default NutrientPieChart;
