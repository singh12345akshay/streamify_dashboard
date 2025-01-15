import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import KeyMetrics from '@/components/keyMetrics';
import CustomAreaChart from '@/components/areaChart';
import RevenuePieChart from '@/components/revenuePieChart';
import { fetchDashboardDataThunk } from '@/store/dashboardSlice';
import TopSongsBarChart from '@/components/topSongBarChart';
import TableData from '@/components/tableData';
import { AppDispatch } from '@/store/store';

import Layout from '../../layout';

export interface ElectricVehicle {
  vin110: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: string;
  make: string;
  model: string;
  electricVehicleType: string;
  cleanAlternativeFuelVehicleCafvEligibility: string;
  electricRange: string;
  baseMsrp: string;
  legislativeDistrict: string;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
}

/**
 * @function Home
 */
const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchDashboardDataThunk());
    setLoading(false);
  }, [dispatch]);

  const {
    keyMetrics,
    userGrowth,
    revenueDistribution,
    topSongs,
    recentStreams,
  } = useSelector((state: any) => state.dashboard);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <Layout>
      <div className="flex max-md:flex-col justify-between items-center max-md:py-4 py-8">
        <h1 className="max-md:text-xl text-4xl font-bold text-textColor">
          Music Streaming Analytics Dashboard
        </h1>
      </div>
      <div className="mb-6">
        <KeyMetrics data={keyMetrics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 mb-6">
        <div className="md:col-span-4 bg-gray-800 rounded-lg max-md:px-2 p-6">
          <h3 className="text-textColor text-lg font-semibold mb-4">
            User Engagement Overview: Total vs Active Users
          </h3>
          <CustomAreaChart chartData={userGrowth} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 mb-6 gap-6">
        <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-textColor">
            Revenue Breakdown
          </h3>
          <RevenuePieChart data={revenueDistribution} />
        </div>

        <div className="md:col-span-3 bg-gray-800 rounded-lg max-md:px-2 p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-20 text-textColor">
            Top 5 Streamed Songs (Last 30 Days)
          </h3>
          <TopSongsBarChart data={topSongs} />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="bg-gray-800 rounded-lg max-md:px-2 ">
          <TableData data={recentStreams} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
