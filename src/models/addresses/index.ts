/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddressesState } from './types';
import { NormalizedUser } from 'models/user/schema';

import { actions as userActions } from '../user';

const initialState: AddressesState = {
  collection: {},
  ids: [],
};

const addresses = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: {
    [userActions.signInUserSuccess.type]: (
      state,
      { payload }: PayloadAction<NormalizedUser>
    ) => {
      state.ids = payload.ids.addresses;
      state.collection = payload.collections.addresses;
    },
    [userActions.setUserInformation.type]: (
      state,
      { payload }: PayloadAction<NormalizedUser>
    ) => {
      state.ids = payload.ids.addresses;
      state.collection = payload.collections.addresses;
    },
    [userActions.deleteUserAddress.type]: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      const filteredIds = state.ids.filter(id => id !== payload);
      state.ids = filteredIds;
      state.collection = filteredIds.reduce(
        (acc, id) => ({
          ...acc,
          [id]: state.collection[id],
        }),
        {}
      );
    },
    [userActions.toggleUserAddressActive.type]: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      state.ids.forEach(id => {
        if (id === payload) {
          state.collection[id].active = !state.collection[id].active;
        } else {
          state.collection[id].active = false;
        }
      });
    },
  },
});

export const { actions } = addresses;

export default addresses.reducer;
