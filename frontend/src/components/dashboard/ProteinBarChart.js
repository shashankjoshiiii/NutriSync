import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProteinBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">Log some food to see your weekly protein trend.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(1)}g`} />
        <Legend />
        <Bar dataKey="protein" fill="#16a34a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProteinBarChart;
