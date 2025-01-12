import React from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

const CompaniesBarChart = ({ chartData }: { chartData: ChartData[] }) => {
  const chartStyles = {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const barStyles = {
    fill: '#ff6622', 
    transition: 'fill 0.3s ease',
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom:60,
        }}
        style={chartStyles} 
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-65} 
          textAnchor="end"
          stroke="#FFFFFF" 
          fontSize='14px'
          interval={0}
        /> 
        <YAxis stroke="#FFFFFF" /> 
        <Tooltip />
        <Bar
          dataKey="value"
          style={barStyles} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompaniesBarChart;
