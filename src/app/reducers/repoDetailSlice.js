// src/redux/reducers/repoDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Slice for repository detail
export const repoDetailSlice = createSlice({
  name: 'repoDetail',
  initialState: {
    commitHistory: [],
    contributorStats: [],
    codeFrequency: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommitHistory: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommitHistorySuccess: (state, action) => {
      state.loading = false;
      state.commitHistory = action.payload;
    },
    fetchCommitHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchContributorStats: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContributorStatsSuccess: (state, action) => {
      state.loading = false;
      state.contributorStats = action.payload;
    },
    fetchContributorStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCodeFrequency: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCodeFrequencySuccess: (state, action) => {
      state.loading = false;
      state.codeFrequency = action.payload;
    },
    fetchCodeFrequencyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  fetchCommitHistory,
  fetchCommitHistorySuccess,
  fetchCommitHistoryFailure,
  fetchContributorStats,
  fetchContributorStatsSuccess,
  fetchContributorStatsFailure,
  fetchCodeFrequency,
  fetchCodeFrequencySuccess,
  fetchCodeFrequencyFailure,
} = repoDetailSlice.actions;

// Export reducer
export default repoDetailSlice.reducer;
