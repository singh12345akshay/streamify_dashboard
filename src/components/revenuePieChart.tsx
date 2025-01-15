import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { YearlyRevenueDistribution } from '@/store/dashboardSlice';

interface RevenuePieChartProps {
  data: YearlyRevenueDistribution;
}

/**
 * @function RevenuePieChart
 * @returns {JSX.Element}
 */
const RevenuePieChart = ({ data }: RevenuePieChartProps) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

  const handleYearChange = (year:string) => {
    setSelectedYear(year);
    setIsDropdownOpen(false);
  };

  const selectedData = data[selectedYear];
  const totalRevenue = selectedData?.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { source, value, fill } = payload[0].payload; 
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-400">
          <div className="mb-2 flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: fill || '#A16EFF' }} 
            ></span>
            <span className="font-bold">{source}</span>
          </div>
          <p className="text-sm">
            <strong>Revenue:</strong> ${value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <p className="text-textColor font-medium">
          Revenue by Source for {selectedYear}
        </p>

        {/* Custom Dropdown */}
        <div className="relative text-textColor">
          <div
            className="py-2 px-3 border border-textColor rounded-md cursor-pointer w-24 flex justify-between items-center"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>{selectedYear}</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isDropdownOpen && (
            <ul className="absolute bg-gray-800 mt-1 top-full p-1 left-0 w-full border border-textColor rounded-md shadow-md z-50">
              {Object.keys(data)?.map((year) => (
                <li
                  key={year}
                  className={`px-3 py-2 rounded-md cursor-pointer hover:bg-[#0c0f19] ${
                    selectedYear === year ? 'text-white font-bold' : ''
                  }`}
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={selectedData}
              dataKey="value"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
            >
              {selectedData?.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Total Revenue in the Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-semibold text-textColor">
            {totalRevenue?.toLocaleString()}
          </p>
          <p className="text-sm text-textColor">Total Revenue</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {selectedData?.map((item, index) => (
          <div key={item.source} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <p className="ml-2 text-sm text-textColor">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePieChart;
