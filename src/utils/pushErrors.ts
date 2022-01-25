import { put } from 'redux-saga/effects';
import uniqueId from 'lodash/uniqueId';

import { actions } from 'models/pushes';

export function* pushError(message: string, title = 'Error') {
  yield put({
    type: actions.addPush.type,
    payload: {
      id: uniqueId('error'),
      title,
      message,
      type: 'error',
    },
  });
}

export function* pushUnhandledError() {
  yield pushError('Internal server error. Please contact an administrator');
}
