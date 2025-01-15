import { DashboardData } from "@/store/dashboardSlice";

/**
 * @function fetchDashboardData
 */
export const fetchDashboardData = async () => {
    try {
        const response = await fetch('/streamify_sample_data.json'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data:DashboardData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
