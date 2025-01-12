import { ElectricVehicle } from '@/pages/dashboard/dashboard';
import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

// Color palette
const COLORS = [
  'rgb(100, 182, 247)',
  'rgb(12, 124, 213)',
  'rgb(76, 175, 80)',
  'rgb(255, 152, 0)',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
];

interface IVehicleTreemapProps {
  rawData: ElectricVehicle[];
}

/**
 * @function VehicleTreemap
 * @param {IVehicleTreemapProps} param0
 * @returns
 */
const VehicleTreemap = ({ rawData }: IVehicleTreemapProps) => {
  // Process data for treemap
  const processData = (data: ElectricVehicle[]) => {
    const modelCounts = data?.reduce((acc: { [key: string]: number }, item) => {
      acc[item.model] = (acc[item.model] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(modelCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = processData(rawData);

  // Custom render for treemap cells
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, index } = props;
    const color = COLORS[index % COLORS.length]; 

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{ fill: color, stroke: '#fff', strokeWidth: 2 }}
        />
        {width > 50 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        )}
        {width > 50 && height > 35 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 14}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {value}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <Treemap data={data} dataKey="value" content={<CustomizedContent />} />
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleTreemap;
