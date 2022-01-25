import { put, takeLatest, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApiSearch, SaveSearchPayload } from './types';
import { Filters } from 'models/properties/types';
import { Address } from 'models/addresses/types';
import { Routes } from '@types';

import { normalize, NormalizedSearches } from './schema';
import { filtersSelector } from 'models/properties/selectors';
import { listSelector as addressesListSelector } from 'models/addresses/selectors';
import { actions as userActions } from 'models/user';

import { request, delayRequest } from 'utils/call';
import history from 'utils/history';
import { pushNotification } from 'utils/pushNotification';

import { actions } from './index';

import * as api from 'api/searches';

function* fetchSearchesList() {
  try {
    const response: AxiosResponse<{
      user_saved_searches: ApiSearch[];
    }> = yield delayRequest(api.fetchSearchesList, {});

    yield put<PayloadAction<NormalizedSearches>>({
      type: actions.fetchSearchesListSuccess.type,
      payload: normalize(response.data.user_saved_searches),
    });
  } catch (err) {
    console.error('error', err);
  }
}

function* saveSearch(payload: SaveSearchPayload) {
  const addresses: Address[] = yield select(addressesListSelector);
  const activeAddress = addresses.find(item => item.active);

  const response: AxiosResponse<ApiSearch> = yield request(api.saveSearch, {
    ...payload,
    address: activeAddress
      ? { title: activeAddress.title, location: activeAddress.location }
      : null,
  });

  yield put<PayloadAction<NormalizedSearches>>({
    type: actions.fetchSearchesListSuccess.type,
    payload: normalize([response.data]),
  });
}

function* saveUserSearch({ payload }: PayloadAction<SaveSearchPayload>) {
  yield saveSearch(payload);
  yield pushNotification('Your search was successfully saved', 'Success!');
}

function* saveIntroSearch() {
  try {
    const filters: Filters = yield select(filtersSelector);

    yield put({
      type: userActions.updateUserPassedIntro.type,
      payload: true,
    });

    yield saveSearch({
      title: 'Default',
      query: filters,
    });

    history.replace(`${Routes.properties}`);
  } catch (err) {
    console.error('error', err);
  }
}

function* deleteSearch({ payload }: PayloadAction<number>) {
  try {
    yield request(api.deleteSearch, payload);
  } catch (err) {
    console.error('error', err);
  }
}

export default function*() {
  yield takeLatest(actions.fetchSearchesList.type, fetchSearchesList);
  yield takeLatest(actions.saveIntroSearch.type, saveIntroSearch);
  yield takeLatest(actions.saveUserSearch.type, saveUserSearch);
  yield takeLatest(actions.deleteSearch.type, deleteSearch);
}
