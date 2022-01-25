/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImagesState } from './types';

import {
  FetchByBoundingsSuccessPayload,
  FetchItemSuccessPayload,
  FetchMoreItemsSuccessPayload,
  SetMapPropertyPointsPayload,
} from '../properties/types';
import { NormalizedBoards } from 'models/boards/schema';
import { actions as propertiesActions } from '../properties';
import { actions as boardsActions } from '../boards';

import concatUniq from 'utils/concatUniq';

const initialState: ImagesState = {
  collection: {},
  ids: [],
};

const images = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: {
    [propertiesActions.fetchByBoundingsSuccess.type]: (
      state,
      { payload }: PayloadAction<FetchByBoundingsSuccessPayload>
    ) => {
      state.ids = payload.ids.images;
      state.collection = payload.collections.images;
    },
    [propertiesActions.fetchMoreItemsSuccess.type]: (
      state,
      { payload }: PayloadAction<FetchMoreItemsSuccessPayload>
    ) => {
      state.ids = concatUniq(state.ids, payload.ids.images);
      state.collection = {
        ...state.collection,
        ...payload.collections.images,
      };
    },
    [propertiesActions.fetchItemSuccess.type]: (
      state,
      { payload }: PayloadAction<FetchItemSuccessPayload>
    ) => {
      state.ids = concatUniq(state.ids, payload.ids.images);
      state.collection = {
        ...state.collection,
        ...payload.collections.images,
      };
    },
    [propertiesActions.fetchPinItemSuccess.type]: (
      state,
      { payload }: PayloadAction<FetchItemSuccessPayload>
    ) => {
      state.ids = concatUniq(state.ids, payload.ids.images);
      state.collection = {
        ...state.collection,
        ...payload.collections.images,
      };
    },
    [propertiesActions.setMapPropertyPoints.type]: (
      state,
      { payload }: PayloadAction<SetMapPropertyPointsPayload>
    ) => {
      state.ids = concatUniq(state.ids, payload.ids.images);
      state.collection = {
        ...state.collection,
        ...payload.collections.images,
      };
    },
    [boardsActions.fetchBoardsSuccess.type]: (
      state,
      { payload }: PayloadAction<NormalizedBoards>
    ) => {
      state.ids = concatUniq(state.ids, payload.ids.images);
      state.collection = {
        ...state.collection,
        ...payload.collections.images,
      };
    },
  },
});

export const { actions } = images;

export default images.reducer;
