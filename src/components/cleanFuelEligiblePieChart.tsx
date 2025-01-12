import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { ElectricVehicle } from '@/pages/dashboard/dashboard';

interface ICleanFuelEligibilityPieChartProps {
  data: ElectricVehicle[];
}

const CleanFuelEligibilityPieChart = ({
  data,
}: ICleanFuelEligibilityPieChartProps) => {
  const eligibleCount = data.filter(
    (item) =>
      item['cleanAlternativeFuelVehicleCafvEligibility'] ===
      'Clean Alternative Fuel Vehicle Eligible',
  ).length;
  const notEligibleCount = data.filter(
    (item) =>
      item['cleanAlternativeFuelVehicleCafvEligibility'] ===
      'Not eligible due to low battery range',
  ).length;
  const unknownCount = data.filter(
    (item) =>
      item['cleanAlternativeFuelVehicleCafvEligibility'] ===
      'Eligibility unknown as battery range has not been researched',
  ).length;

  // Pie chart data
  const pieData = [
    { name: 'Eligible', value: eligibleCount },
    { name: 'Not Eligible', value: notEligibleCount },
    { name: 'Unknown', value: unknownCount },
  ];

  // Colors for the pie chart
  const COLORS = ['rgb(76,175,80)', 'rgb(255, 152, 0)', 'rgb(12,124,213)'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
        >
          {pieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CleanFuelEligibilityPieChart;
