import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import KeyMetrics from '@/components/keyMetrics';
import CompaniesBarChart from '@/components/modelCompanies';
import CleanFuelEligibilityPieChart from '@/components/cleanFuelEligiblePieChart';
import CustomAreaChart from '@/components/barChart';
import VehicleTreemap from '@/components/treeMapData';
import StringHelper from '@/utils/stringHelper';

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
  const [csvData, setCsvData] = useState<ElectricVehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [filteredData, setFilteredData] = useState<ElectricVehicle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Electric_Vehicle_Population_Data.csv');
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            const parsedData = result.data.map((item) => {
              return StringHelper.convertKeysToCamelCase(item);
            }) as ElectricVehicle[];
            setCsvData(parsedData);
            setFilteredData(parsedData);
            setError(null);
            setLoading(false);
          },
          header: true,
          skipEmptyLines: true,
          error: () => {
            setError('Failed to parse CSV file.');
            setLoading(false);
          },
        });
      } catch (err) {
        setError('Failed to load CSV file.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cities = ['All Cities', ...new Set(csvData?.map((item) => item.city))];

  /**
   * @function handleCityChange
   * @param event
   */
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city === 'All Cities') {
      setFilteredData(csvData);
    } else {
      setFilteredData(csvData?.filter((item) => item.city === city));
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  const yearCount = filteredData?.reduce((acc: { [key: string]: number }, curr) => {
    const year = curr['modelYear'];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(yearCount).map((year) => ({
    year,
    count: yearCount[year as keyof typeof yearCount],
  }));

  const aggregateData = (data: ElectricVehicle[]) => {
    const makeCount: { [key: string]: number } = {};
    data.forEach((item) => {
      const make = item['make'];
      if (makeCount[make]) {
        makeCount[make] += 1;
      } else {
        makeCount[make] = 1;
      }
    });
    const chartData = Object.keys(makeCount).map((make) => ({
      name: make,
      value: makeCount[make],
    }));

    return chartData;
  };

  const companiesModel = aggregateData(filteredData);

  return (
    <Layout>
      <div className="flex max-md:flex-col justify-between items-center max-md:py-4 py-8">
        <h1 className="max-md:text-xl text-4xl font-bold text-[#EDF2F7]">
          Electric Vehicle Analysis Dashboard
        </h1>
        <div className="mr-10">
          <label htmlFor="city-select" className="text-lg font-medium ">
            Select City:
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            className="p-2 border border-white rounded-md text-white px-6 text-lg font-semibold bg-[#1F2937]"
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="my-6">
        <KeyMetrics data={filteredData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-gray-800 rounded-lg max-md:px-2 p-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Models Introduced by Year
          </h3>
          <CustomAreaChart chartData={chartData} />
        </div>

        <div className="md:col-span-1 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Total Vehicle by (CAFV) Eligibility
          </h3>
          <CleanFuelEligibilityPieChart data={filteredData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg max-md:px-2 p-6 my-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Car Manufacturer Market Share
          </h3>
          <CompaniesBarChart chartData={companiesModel} />
        </div>
        <div className="bg-gray-800 rounded-lg max-md:px-2 p-6 my-6">
          <h3 className="text-lg font-semibold mb-4 text-white ">
            Total Vehicle by Model
          </h3>
          <VehicleTreemap rawData={filteredData} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
