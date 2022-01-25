import { put } from 'redux-saga/effects';
import uniqueId from 'lodash/uniqueId';

import { PayloadAction } from '@reduxjs/toolkit';

import { actions, Push } from 'models/pushes';

export function* pushNotification(message: string, title = 'Notification') {
  yield put<PayloadAction<Push>>({
    type: actions.addPush.type,
    payload: {
      id: uniqueId('info'),
      title,
      message,
      type: 'info',
    },
  });
}
