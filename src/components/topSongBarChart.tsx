import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
} from 'recharts';

interface SongData {
  song: string;
  artist: string;
  streams: number;
}

/**
 * @function TopSongsBarChart
 * @param {SongData[]} param0
 * @returns {JSX.Element}
 */
const TopSongsBarChart = ({ data }: { data: SongData[] }) => {
  // Custom Tooltip with styled chip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { song, artist, streams } = payload[0].payload;
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-400">
          <div className="mb-2">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: '#A16EFF' }}
            ></span>
            <span className="font-bold">{song}</span>
          </div>
          <p className="text-sm">
            <strong>Artist:</strong> {artist}
          </p>
          <p className="text-sm">
            <strong>Streams:</strong> {streams.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={[...data].sort((a, b) => b.streams - a.streams)} 
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          {/* Gradient for bars */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A16EFF" /> 
              <stop offset="100%" stopColor="#3B82F6" /> 
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
          <XAxis
            dataKey="song"
            stroke="#D1D1D1"
            tick={{ fill: '#D1D1D1', fontSize: '12px' }}
            interval={0} 
          />
          <YAxis
            stroke="#D1D1D1"
            tick={{ fill: '#D1D1D1', fontSize: '12px' }}
            label={{
              value: 'Streams',
              angle: -90,
              position: 'insideLeft',
              fill: '#D1D1D1',
              fontSize: 14,
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }} 
          />
          <Bar
            dataKey="streams"
            fill="url(#barGradient)" 
            radius={[10, 10, 0, 0]} 
            label={{
              position: 'top',
              fill: '#FFFFFF',
              fontSize: '12px',
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSongsBarChart;
