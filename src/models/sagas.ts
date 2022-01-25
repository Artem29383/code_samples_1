import { all } from 'redux-saga/effects';

import userSagas from './user/sagas';
import pushesSagas from './pushes/sagas';
import propertiesSagas from './properties/sagas';
import boardsSagas from './boards/sagas';
import requestsSagas from './requests/sagas';
import searchesSagas from './searches/sagas';
import favoritesSagas from './favorites/sagas';
import stepsSagas from './steps/sagas';

export const rootSaga = function* rootSaga() {
  yield all([
    userSagas(),
    pushesSagas(),
    propertiesSagas(),
    boardsSagas(),
    requestsSagas(),
    searchesSagas(),
    favoritesSagas(),
    stepsSagas(),
  ]);
};
