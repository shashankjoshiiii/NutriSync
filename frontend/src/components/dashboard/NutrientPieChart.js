import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define colors for the macronutrient chart segments
const COLORS = {
  protein: '#16a34a', // Green
  carbs: '#f97316',   // Orange
  fats: '#ef4444',    // Red
};

const NutrientPieChart = ({ data }) => {
  // Data format expected: [{ name: 'protein', value: 100 }, { name: 'carbs', value: 200 }, { name: 'fats', value: 50 }]
  
  const chartData = [
    { name: 'Protein (g)', value: data.protein || 0 },
    { name: 'Carbs (g)', value: data.carbs || 0 },
    { name: 'Fats (g)', value: data.fats || 0 },
  ];

  const colorMapping = {
    'Protein (g)': COLORS.protein,
    'Carbs (g)': COLORS.carbs,
    'Fats (g)': COLORS.fats,
  };

  // Render a message if there's no data to display
  if (!data || (data.protein === 0 && data.carbs === 0 && data.fats === 0)) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Log your first meal to see today's nutrient breakdown.</p>
      </div>
    );
  }

  return (
    // ResponsiveContainer makes the chart adapt to the size of its parent container
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {/* Assign a color to each segment of the pie chart */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorMapping[entry.name]} />
          ))}
        </Pie>
        {/* Tooltip shows details when hovering over a chart segment */}
        <Tooltip formatter={(value, name) => [`${value.toFixed(1)}g`, name]} />
        {/* Legend provides a key for the chart's colors */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default NutrientPieChart;

