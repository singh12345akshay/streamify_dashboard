import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ICustomAreaChartProps {
  chartData: { year: string; count: number }[];
}
// CustomAreaChart component
const CustomAreaChart = ({ chartData }: ICustomAreaChartProps) => {
  // Style for the chart container
  const chartStyles = {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  // Style for the area
  const areaStyles = {
    fill: '#B3CDAD', // Custom area color
    transition: 'fill 0.3s ease', // Smooth color transition
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        style={chartStyles} // Apply custom chart styles
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke="#FFFFFF" />{' '}
        {/* Set X-axis labels to white */}
        <YAxis stroke="#FFFFFF" /> {/* Set Y-axis labels to white */}
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          style={areaStyles} // Apply custom area styles
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
