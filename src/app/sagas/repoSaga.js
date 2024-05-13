import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchReposSuccess,
  fetchReposFailure,
} from '../reducers/repoReducer';
import {
  fetchCommitHistorySuccess,
  fetchCommitHistoryFailure,
  fetchContributorStatsSuccess,
  fetchContributorStatsFailure,
  fetchCodeFrequencySuccess,
  fetchCodeFrequencyFailure
} from '../reducers/repoDetailSlice';

// Saga to fetch repositories
function* fetchReposSaga(data) {
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/search/repositories?q=created:>${data.payload.formattedDate}&sort=stars&order=desc&page=${data.payload.page}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    yield put(fetchReposSuccess(response.data));
  } catch (error) {
    yield put(fetchReposFailure(error.message));
  }
}

// Saga to handle fetching commit history
function* handleFetchCommitHistory(action) {
  try {
    const { owner, name } = action.payload;
    const response = yield call(fetch, `${process.env.REACT_APP_API_URL}/repos/${owner}/${name}/stats/commit_activity`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = yield response.json();
    yield put(fetchCommitHistorySuccess(data));
  } catch (error) {
    yield put(fetchCommitHistoryFailure(error.message));
  }
}

// Saga to handle fetching contributor statistics
function* handleFetchContributorStats(action) {
  try {
    const { owner, name } = action.payload;
    const response = yield call(axios.get, `${process.env.REACT_APP_API_URL}/repos/${owner}/${name}/stats/contributors`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    yield put(fetchContributorStatsSuccess(response.data));
  } catch (error) {
    yield put(fetchContributorStatsFailure(error.message));
  }
}

// Saga to handle fetching commit history
function* handleFetchCodeFrequency(action) {
  try {
    const { owner, name } = action.payload;
    const response = yield call(fetch, `${process.env.REACT_APP_API_URL}/repos/${owner}/${name}/stats/code_frequency`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = yield response.json();
    yield put(fetchCodeFrequencySuccess(data));
  } catch (error) {
    yield put(fetchCodeFrequencyFailure(error.message));
  }
}

// Root saga to combine all sagas
export function* repoSaga() {
  yield takeLatest('repo/fetchRepos', fetchReposSaga);
  yield takeLatest('repoDetail/fetchCommitHistory', handleFetchCommitHistory);
  yield takeLatest('repoDetail/fetchContributorStats', handleFetchContributorStats);
  yield takeLatest('repoDetail/fetchCodeFrequency', handleFetchCodeFrequency);
}
