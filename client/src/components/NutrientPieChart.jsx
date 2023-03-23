import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const COLORS = ['#CC3366', '#FFE07D', '#99CC66'];

const NutrientPieChart = ({ protein, fat, carbs, quantity }) => {
  const data = [
    { name: 'Protein', value: protein },
    { name: 'Fat', value: fat },
    { name: 'Carbs', value: carbs },
  ];

  return (
    <ResponsiveContainer width={100} height={100}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={50}
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
    </ResponsiveContainer>
  );
};

export default NutrientPieChart;
