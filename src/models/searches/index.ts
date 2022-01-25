/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchesState, SaveSearchPayload } from './types';

import { NormalizedSearches } from './schema';

const initialState: SearchesState = {
  fetchingList: true,
  fetchingItem: false,
  collection: {},
  ids: [],
};

const searchesSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    fetchSearchesList(state) {
      state.fetchingList = true;
    },
    fetchSearchesListSuccess(
      state,
      { payload }: PayloadAction<NormalizedSearches>
    ) {
      state.fetchingList = false;
      state.collection = payload.collections.searches;
      state.ids = payload.ids.searches;
    },
    saveUserSearch(_, { payload }: PayloadAction<SaveSearchPayload>) {},
    saveIntroSearch() {},
    deleteSearch(state, { payload }: PayloadAction<number>) {
      state.ids = state.ids.filter(id => id !== payload);
      delete state.collection[payload];
    },
  },
});

export const { actions } = searchesSlice;

export default searchesSlice.reducer;
