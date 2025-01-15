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

import { UserGrowthEntry } from '@/store/dashboardSlice';

interface ICustomAreaChartProps {
  chartData: UserGrowthEntry[]
}

const CustomAreaChart = ({ chartData }: ICustomAreaChartProps) => {
  return (
    <div style={{ width: '100%' }}>
      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#6A5ACD', 
              marginRight: '5px',
            }}
          ></div>
          <span className="text-textColor font-semibold">Total Users</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#FF7F50', 
              marginRight: '5px',
            }}
          ></div>
          <span className="text-textColor font-semibold">Active Users</span>
        </div>
      </div>

      {/* Total Users Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 14, fill: '#FFFFFF' }}
            stroke="#FFFFFF"
          />
          <YAxis
            tick={{ fontSize: 14, fill: '#FFFFFF' }}
            stroke="#FFFFFF"
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#333', 
              border: '1px solid #6A5ACD', 
              borderRadius: '10px', 
              padding: '10px',
            }}
            itemStyle={{
              color: '#FFFFFF', 
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            labelStyle={{
              color: '#6A5ACD', 
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '5px',
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString(), 
              name,
            ]}
          />
          <Area
            type="monotone"
            dataKey="totalUsers"
            stroke="#6A5ACD" 
            name="Total Users"
            fill="url(#totalUsersGradient)"
          />
          <defs>
            <linearGradient id="totalUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6A5ACD" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6A5ACD" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>

      {/* Active Users Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 14, fill: '#FFFFFF' }}
            stroke="#FFFFFF"
          />
          <YAxis
            tick={{ fontSize: 14, fill: '#FFFFFF' }}
            stroke="#FFFFFF"
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#333', 
              border: '1px solid #FF7F50', 
              borderRadius: '10px', 
              padding: '10px',
            }}
            itemStyle={{
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            labelStyle={{
              color: '#FF7F50', 
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '5px',
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString(), 
              name,
            ]}
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            stroke="#FF7F50" 
            name="Active Users"
            fill="url(#activeUsersGradient)" 
          />
          <defs>
            <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF7F50" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FF7F50" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
