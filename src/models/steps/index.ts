/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from 'models/steps/types';

const initialValues = {
  load: false,
  requestId: null,
  step: 1,
  data: {
    address: '',
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unregistered_user_identy_token: '',
  },
};

// @ts-ignore
const initialState: InitialState = initialValues;

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    createForm(
      state,
      {
        payload,
      }: PayloadAction<{
        data: {
          address: string;
          email: string;
          firstName: string;
          lastName: string;
          phone: string;
        };
      }>
    ) {},
    setCreateForm(state, { payload }: PayloadAction<InitialState>) {
      state.data = { ...state.data, ...payload };
      if (payload.requestId) {
        state.requestId = payload.requestId;
      }
      if (payload.user) {
        state.user = payload.user;
      }
      localStorage.setItem('sell-form', JSON.stringify(state));
    },
    updateForm(state, { payload }: PayloadAction<InitialState>) {},
    initialize(_, __) {},
    setInitialize(state, { payload }: PayloadAction<InitialState>) {
      state.data = payload.data;
      state.user = payload.user;
      state.step = payload.step;
      state.requestId = payload.requestId;
      state.load = false;
    },
    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload;
      localStorage.setItem('sell-form', JSON.stringify(state));
    },
    resetForm(_, __) {
      localStorage.removeItem('sell-form');
      return initialValues;
    },
    requestFormData(_, __) {},
    sendInvitation(
      _,
      __: PayloadAction<{
        email: string;
        full_name: string;
        phone: string;
        id: string;
      }>
    ) {},
    setLoad(state, { payload }: PayloadAction<boolean>) {
      state.load = payload;
    },
  },
});

export const { actions } = stepsSlice;

export default stepsSlice.reducer;
