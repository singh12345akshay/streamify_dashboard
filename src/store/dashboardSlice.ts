import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDashboardData } from '../services/dashboardService';

export interface IKeyMetrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface UserGrowthEntry {
  month: string;
  totalUsers: number;
  activeUsers: number;
}

interface RevenueSource {
  source: string;
  value: number;
}

export interface TopSong {
  song: string;
  artist: string;
  streams: number;
}

export interface RecentStream {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userID: string;
}

export type YearlyRevenueDistribution = Record<string, RevenueSource[]>;

export interface DashboardData {
  keyMetrics: IKeyMetrics;
  userGrowth: UserGrowthEntry[];
  revenueDistribution: YearlyRevenueDistribution;
  topSongs: TopSong[];
  recentStreams: RecentStream[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchDashboardDataThunk = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, thunkAPI) => {
    try {
      const data: DashboardData = await fetchDashboardData();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const initialState: DashboardData = {
  keyMetrics: {} as IKeyMetrics,
  userGrowth: [] as UserGrowthEntry[],
  revenueDistribution: [] as unknown as YearlyRevenueDistribution,
  topSongs: [] as TopSong[],
  recentStreams: [] as RecentStream[],
  status: 'idle',
  error: null as string | null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardDataThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardDataThunk.fulfilled, (state, action) => {
        const { keyMetrics, userGrowth, revenueDistribution, topSongs, recentStreams } = action.payload;
        state.keyMetrics = keyMetrics;
        state.userGrowth = userGrowth;
        state.revenueDistribution = revenueDistribution;
        state.topSongs = topSongs;
        state.recentStreams = recentStreams;
        state.status = 'succeeded';
      })
      .addCase(fetchDashboardDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
