import { takeLatest, put, select } from 'redux-saga/effects';
import { actions } from 'models/steps';
import { request } from 'utils/call';
import * as api from 'api/sellForm';
import {
  dataSelector,
  requestSelector,
  userSelector,
} from 'models/steps/selectors';
import { authorizedSelector } from 'models/user/selectors';
import { pushNotification } from 'utils/pushNotification';
import history from 'utils/history';
import { Routes } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from 'models/steps/types';

function* initialize() {
  const isLocal = localStorage.getItem('sell-form');
  if (isLocal) {
    yield put({
      type: actions.setInitialize.type,
      payload: JSON.parse(isLocal),
    });
  }
}

function* sellCreate({
  payload,
}: PayloadAction<{
  data: {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  step: number;
}>) {
  try {
    const data = yield select(dataSelector);
    const user = payload.data;
    const response = yield request(api.sellRequestCreate, {
      property_form: data,
      unregistered_user: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
      },
    });
    user.unregistered_user_identy_token = response.data.sender.identy_token;
    yield put({
      type: actions.setCreateForm.type,
      payload: {
        ...response.data.property_form,
        requestId: response.data.id,
        user,
      },
    });
    yield put({
      type: actions.setLoad.type,
      payload: false,
    });
    yield put({
      type: actions.setStep.type,
      payload: payload.step,
    });
  } catch (e) {
    console.info(e);
  }
}

function* sellUpdate({
  payload,
}: PayloadAction<{
  unregistered: boolean;
  data: InitialState;
}>) {
  try {
    let user;
    if (payload.unregistered) {
      user = payload.data;
    } else {
      user = yield select(authorizedSelector);
      if (!user) {
        user = yield select(userSelector);
      }
    }
    const data = yield select(dataSelector);
    const requestId = yield select(requestSelector);
    const response = yield request(api.sellRequestUpdate, {
      property_form: payload.data.unregistered
        ? data
        : { ...data, ...payload.data },
      requestId,
      unregistered_user: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
      },
      unregistered_user_identy_token: user.unregistered_user_identy_token,
    });
    yield put({
      type: actions.setCreateForm.type,
      payload: {
        ...response.data.property_form,
        requestId: response.data.id,
        user,
      },
    });

    if (response.data.property_form.finished) {
      yield pushNotification('We done it!', 'Congratulations!');
      yield put({
        type: actions.resetForm.type,
        payload: {},
      });
      yield history.push(Routes.properties);
    }

    yield put({
      type: actions.setStep.type,
      payload: payload.step,
    });

    yield put({
      type: actions.setLoad.type,
      payload: false,
    });
  } catch (e) {
    if (e.response.data.error.message === 'Property form is already finished') {
      yield put({
        type: actions.resetForm.type,
        payload: {},
      });
    }
  }
}

function* requestFormData({ payload }: PayloadAction<FormData>) {
  try {
    const requestId = yield select(requestSelector);
    const response = yield request(api.sellRequestFormData, {
      payload,
      requestId,
    });

    yield put({
      type: actions.setCreateForm.type,
      payload: {
        ...response.data.property_form,
        requestId: response.data.id,
      },
    });
  } catch (e) {
    console.info(e);
  }
}

function* sendInvitation({
  payload,
}: PayloadAction<{
  finished: boolean;
  data: {
    email: string;
    full_name: string;
    phone: string;
    id: string;
  };
}>) {
  try {
    yield request(api.sendInvitation, payload.data);
    yield put({
      type: actions.updateForm.type,
      payload: { data: { finished: payload.finished }, step: 1 },
    });
  } catch (e) {
    console.info(e);
  }
}

export default function*() {
  yield takeLatest(actions.initialize.type, initialize);
  yield takeLatest(actions.createForm.type, sellCreate);
  yield takeLatest(actions.updateForm.type, sellUpdate);
  yield takeLatest(actions.requestFormData.type, requestFormData);
  yield takeLatest(actions.sendInvitation.type, sendInvitation);
}
