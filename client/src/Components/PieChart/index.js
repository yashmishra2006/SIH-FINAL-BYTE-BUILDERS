import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChartComponent = () => {
  // Example data for the pie chart
  const data = [
    { name: '0-18', value: 400 },
    { name: '19-35', value: 300 },
    { name: '36-50', value: 200 },
    { name: '51+', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
