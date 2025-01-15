import React from 'react';

import { ActiveUser, Revenue, Star, Stream, User } from '@/assets/icons';
import { IKeyMetrics } from '@/store/dashboardSlice';

interface KeyMetricsProps {
  data: IKeyMetrics;
}

/**
 * @function KeyMetrics
 * @param {KeyMetricsProps} param0
 * @returns {JSX.Element}
 */
const KeyMetrics = ({ data }: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Total Users */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-textColor">Total Users</h2>
          <User className="size-4 text-textColor" />
        </div>
        <p className="text-2xl font-semibold text-[#64b6f7] mt-4">
          {data.totalUsers?.toLocaleString()}
        </p>
      </div>

      {/* Active Users */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-textColor">Active Users</h2>
          <ActiveUser className="size-4 text-textColor" />
        </div>
        <p className="text-2xl font-semibold text-[#64b6f7] mt-4">
          {data.activeUsers?.toLocaleString()}
        </p>
      </div>

      {/* Total Streams */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-textColor">Total Streams</h2>
          <Stream className="size-4 text-textColor" />
        </div>
        <p className="text-2xl font-semibold text-[#64b6f7] mt-4">
          {data.totalStreams?.toLocaleString()}
        </p>
      </div>

      {/* Revenue */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-textColor">Revenue</h2>
          <Revenue className="size-4 text-textColor" />
        </div>
        <p className="text-2xl font-semibold text-[#64b6f7] mt-4">
          ${data.revenue?.toFixed(2)}
        </p>
      </div>

      {/* Top Artist */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-textColor">Top Artist</h2>
          <Star className="size-4 text-textColor" />
        </div>
        <p className="text-2xl font-semibold text-[#64b6f7] mt-4">
          {data.topArtist}
        </p>
      </div>
    </div>
  );
};

export default KeyMetrics;
