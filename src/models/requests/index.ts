/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialStateTypes } from 'models/requests/types';

const initialState: InitialStateTypes = {
  groupTours: {},
  tours: {
    collection: {},
    ids: [],
  },
  requests: {
    collection: {},
    ids: [],
  },
  isLoad: true,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    getGroupTours(_, __) {},
    setGroupTours(state, { payload }) {
      state.groupTours = payload;
    },
    getToursCurrentDate(_, __) {},
    setToursCurrentDate(state, { payload }) {
      state.requests = payload;
    },
    updateNotesTour(
      _,
      __: PayloadAction<{
        note: string | null;
        id: string;
      }>
    ) {},
    setUpdateTour(state, { payload }) {
      state.requests.collection[payload.id] = payload.tour;
    },
    setLoad(state, { payload }) {
      state.isLoad = payload;
    },
  },
});

export const { actions } = requestsSlice;

export default requestsSlice.reducer;
