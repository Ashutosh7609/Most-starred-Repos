import { all } from 'redux-saga/effects';
import { repoSaga } from './repoSaga';

// Root saga function to combine all sagas
export default function* rootSaga() {
  yield all([
    repoSaga(),
  ]);
}
