/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice } from '@reduxjs/toolkit';
import { LocationChangeAction } from 'connected-react-router';

export interface App {
  modalOpen: boolean;
  mapLoaded: boolean;
  history: string[];
}

const initialState: App = {
  mapLoaded: false,
  modalOpen: false,
  history: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModalOpen: state => {
      state.modalOpen = !state.modalOpen;
    },
    mapLoaded: state => {
      state.mapLoaded = true;
    },
  },
  extraReducers: {
    '@@router/LOCATION_CHANGE': (state, { payload }: LocationChangeAction) => {
      state.history.push(payload.location.pathname);
    },
  },
});

export const { actions } = appSlice;

export default appSlice.reducer;
