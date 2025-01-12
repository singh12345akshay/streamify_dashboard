import React from 'react';

import { ElectricVehicle } from '@/pages/dashboard/dashboard';

interface KeyMetricsProps {
  data: ElectricVehicle[];
}

const KeyMetrics = ({ data }: KeyMetricsProps) => {
  const totalVehicles = data.length;
  const totalElectricRange = data.reduce(
    (sum, item) => sum + (parseInt(item['electricRange']) || 0),
    0,
  );
  const avgElectricRange = totalVehicles
    ? (totalElectricRange / totalVehicles).toFixed(2)
    : 0;

  const cleanFuelEligible = data.filter(
    (item) =>
      item['cleanAlternativeFuelVehicleCafvEligibility'] ===
      'Clean Alternative Fuel Vehicle Eligible',
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow py-12 pl-12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Total Vehicles</h2>
        </div>
        <p className="text-3xl font-semibold text-[#64b6f7] mt-4">
          {totalVehicles}
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow py-12 pl-12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Total Electric Range</h2>
        </div>
        <p className="text-3xl font-semibold text-[#64b6f7] mt-4">
          {totalElectricRange} miles
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow py-12 pl-12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Average Electric Range
          </h2>
        </div>
        <p className="text-3xl font-semibold text-[#64b6f7] mt-4">
          {avgElectricRange} miles
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow py-12 pl-12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Clean Fuel Eligible</h2>
        </div>
        <p className="text-3xl font-semibold text-[#64b6f7] mt-4">
          {cleanFuelEligible}
        </p>
      </div>
    </div>
  );
};

export default KeyMetrics;
