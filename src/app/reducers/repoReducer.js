import { createSlice } from '@reduxjs/toolkit';

// Define a slice for managing repository-related state
export const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    repos: [],
    selectedRepo: null,
    metrics: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchRepos: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReposSuccess: (state, action) => {
      state.loading = false;
      state.repos = action.payload;
    },
    fetchReposFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectRepo: (state, action) => {
      state.selectedRepo = action.payload;
    },
  },
});

// Export action creators
export const { fetchRepos, fetchReposSuccess, fetchReposFailure, selectRepo } = repoSlice.actions;

// Export reducer
export default repoSlice.reducer;
