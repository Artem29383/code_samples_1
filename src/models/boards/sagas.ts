/* eslint-disable no-underscore-dangle */

import { put, takeLatest, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  AddImageToBoardParams,
  AddImageToBoardSuccessPayload,
  CreateBoardAndAddImagePayload,
  ApiBoard,
  ApiBoards,
  ApiBoardAdditionals,
} from './types';
import { actions } from './index';
import { normalize, mergeToSingleEntity, NormalizedBoards } from './schema';

import { request } from 'utils/call';
import { pushNotification } from 'utils/pushNotification';
import { pushError } from 'utils/pushErrors';

import * as api from 'api/boards';

function* fetchBoards() {
  try {
    const [boardsResponse, boardAdditionalsResponse]: [
      AxiosResponse<ApiBoards>,
      AxiosResponse<ApiBoardAdditionals>
    ] = yield all([
      request(api.fetchBoards, {}),
      request(api.fetchBoardAdditionals, {}),
    ]);

    yield put<PayloadAction<NormalizedBoards>>({
      type: actions.fetchBoardsSuccess.type,
      payload: {
        ...normalize(
          mergeToSingleEntity(
            boardsResponse.data.categories,
            boardAdditionalsResponse.data.boards
          )
        ),
      },
    });
  } catch (err) {
    console.error('error', err);
  }
}

function* addImageToBoard({ payload }: PayloadAction<AddImageToBoardParams>) {
  try {
    const response: AxiosResponse<{ category: ApiBoard }> = yield request(
      api.addImageToBoard,
      payload
    );

    if (payload.boardId) {
      yield put<PayloadAction<AddImageToBoardSuccessPayload>>({
        type: actions.addImageToBoardSuccess.type,
        payload: {
          ...payload,
          boardId: payload.boardId,
        },
      });
    } else if (payload.boardTitle) {
      yield put<PayloadAction<CreateBoardAndAddImagePayload>>({
        type: actions.createBoardAndAddImage.type,
        payload: {
          ...payload,
          boardId: response.data.category.id,
          boardTitle: payload.boardTitle,
        },
      });
    }

    yield pushNotification(
      'The image was successfully pinned to an inspiration board',
      'Success!'
    );
  } catch (err) {
    console.error('err', err);
    if (err.response && err.response.status === 422) {
      yield pushError('The image is already pinned to board', 'Error');
    }
  }
}

function* fetchBoardById({ payload }: PayloadAction<string>) {
  try {
    const response = yield request(api.fetchBoardById, payload);
    yield put({
      type: actions.setBoard.type,
      payload: response.data,
    });
  } catch (e) {
    console.error(e);
  }
}

export default function*() {
  yield takeLatest(actions.fetchBoardById.type, fetchBoardById);
  yield takeLatest(actions.fetchBoards.type, fetchBoards);
  yield takeLatest(actions.addImageToBoard.type, addImageToBoard);
}
