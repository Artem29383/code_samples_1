import { takeEvery, all, put, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { PushTimings } from '@types';

import { Push, actions } from './index';

export function* postponePushShow({ payload }: PayloadAction<Push>) {
  yield delay(PushTimings.showTimeout);
  yield put<PayloadAction<Push>>({ type: actions.showPush.type, payload });
  yield delay(PushTimings.showDuration);
  yield put<PayloadAction<string>>({
    type: actions.vanishPush.type,
    payload: payload.id,
  });
}

export function* postponePushRemove({ payload }: PayloadAction<string>) {
  yield delay(PushTimings.fadeOutDuration);
  yield put<PayloadAction<string>>({ type: actions.removePush.type, payload });
}

export default function*() {
  yield all([
    takeEvery(actions.addPush.type, postponePushShow),
    takeEvery(actions.vanishPush.type, postponePushRemove),
  ]);
}
