/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionType, FavoritesTypes } from 'models/favorites/types';

const initialState: FavoritesTypes = {
  fetchingCollection: true,
  collection: {},
  ids: [],
  query: '',
  statistics: {
    isReady: false,
    favorites: 0,
    hidden: 0,
    recent: 0,
  },
};

const favorites = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getFavorites(state, _) {
      state.fetchingCollection = true;
    },
    setFavorites(
      state,
      {
        payload,
      }: PayloadAction<{
        collection: CollectionType;
        ids: number[];
      }>
    ) {
      state.collection = payload.collection;
      state.ids = payload.ids;
      state.fetchingCollection = false;
    },
    setFilter(state, { payload }) {
      state.query = payload;
    },
    filterChange(
      _,
      __: PayloadAction<{
        query: string;
        propertyTypes: string;
      }>
    ) {},
    getStatisticsFavorites() {},
    setStatistics(state, { payload }) {
      state.statistics = payload;
    },
  },
});

export const { actions } = favorites;

export default favorites.reducer;
