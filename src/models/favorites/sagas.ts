/* eslint-disable no-underscore-dangle */

import { put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';

import { request } from 'utils/call';
import history from 'utils/history';

import { toNormalizeWithCamelCaseFavorites } from 'models/favorites/schema';

import * as api from 'api/favorites';
import { PayloadAction } from '@reduxjs/toolkit';
import { ToolBar } from 'models/favorites/types';
import { AxiosPromise } from 'axios';

const objectFetch: {
  [key in ToolBar]: {
    fn: (data: {
      query: string;
      propertyTypes: string;
    }) => AxiosPromise<unknown>;
    field: string;
  };
} = {
  [ToolBar.favorites]: {
    fn: api.getFavorites,
    field: 'user_favorites',
  },
  [ToolBar.hidden]: {
    fn: api.getFavoritesHidden,
    field: 'user_hidden_properties',
  },
  [ToolBar.recent]: {
    fn: api.getRecentFavorites,
    field: 'user_property_view_histories',
  },
};

function* fetchFavorites({
  payload,
}: PayloadAction<{
  query: string;
  propertyTypes: string;
}>) {
  try {
    const response = yield request(
      objectFetch[payload.propertyTypes as ToolBar].fn,
      payload
    );
    const { entities, result } = toNormalizeWithCamelCaseFavorites(
      response.data[objectFetch[payload.propertyTypes as ToolBar].field]
    );
    yield put({
      type: actions.setFavorites.type,
      payload: {
        collection: entities.favorites,
        ids: result.favorites,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

function* filterSelect({
  payload,
}: PayloadAction<{
  query: string;
  propertyTypes: string;
}>) {
  const query = new URLSearchParams(history.location.search);
  query.set('q', payload.propertyTypes);
  if (payload.query.trim()) {
    query.set('property_type', payload.query);
    history.replace(`${history.location.pathname}?${query}`);
  } else {
    query.delete('property_type');
    history.replace(`${history.location.pathname}?${query}`);
  }

  yield put({
    type: actions.setFilter.type,
    payload: payload.query,
  });

  yield put({
    type: actions.getFavorites.type,
    payload: {
      query: payload.query,
      propertyTypes: payload.propertyTypes,
    },
  });
}

function* getStatisticsFavorites() {
  try {
    const response = yield request(api.getStatisticsFavorites, {});
    yield put({
      type: actions.setStatistics.type,
      payload: {
        isReady: true,
        favorites: response.data.favorites_count,
        hidden: response.data.hidden_count,
        recent: response.data.recent_count,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield takeLatest(actions.getFavorites.type, fetchFavorites);
  yield takeLatest(actions.filterChange.type, filterSelect);
  yield takeLatest(actions.getStatisticsFavorites.type, getStatisticsFavorites);
}
