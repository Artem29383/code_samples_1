/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddImageToBoardParams,
  BoardsState,
  AddImageToBoardSuccessPayload,
  CreateBoardAndAddImagePayload,
} from './types';

import { NormalizedBoards } from './schema';

const initialState: BoardsState = {
  fetchingCollection: true,
  collection: {},
  ids: [],
  board: {
    general: false,
    id: null,
    title: '',
    photos: [],
  },
};

const boards = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    fetchBoards(state) {
      state.fetchingCollection = true;
    },
    fetchBoardsSuccess(state, { payload }: PayloadAction<NormalizedBoards>) {
      state.collection = payload.collections.boards;
      state.ids = payload.ids.boards;
      state.fetchingCollection = false;
    },
    addImageToBoard(
      state,
      { payload }: PayloadAction<AddImageToBoardParams>
    ) {},
    addImageToBoardSuccess(
      state,
      {
        payload: { boardId, imageId },
      }: PayloadAction<AddImageToBoardSuccessPayload>
    ) {
      state.collection[boardId].images.push(imageId);
    },
    createBoardAndAddImage(
      state,
      {
        payload: { boardId, boardTitle, imageId },
      }: PayloadAction<CreateBoardAndAddImagePayload>
    ) {
      state.ids.push(boardId);
      state.collection[boardId] = {
        id: boardId,
        title: boardTitle,
        images: [imageId],
        default: false,
        totalImages: 1,
      };
    },
    fetchBoardById(state, __: PayloadAction<string>) {
      state.fetchingCollection = true;
    },
    setBoard(state, { payload }) {
      state.board = payload;
      state.fetchingCollection = false;
    },
  },
});

export const { actions } = boards;

export default boards.reducer;
