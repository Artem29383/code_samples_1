/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  UsersState,
  SignUpPayload,
  SendInvitationPayload,
  SignInPayload,
  PasswordConfirmPayload,
  AddUserAddressPayload,
  ResetPasswordPayload,
} from './types';

import { NormalizedUser } from './schema';

export const initialState: UsersState = {
  signinigIn: false,
  signingUp: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sendInvitation(_, __: PayloadAction<SendInvitationPayload>) {},
    setUnauthorized(state) {
      state.current = null;
      state.signinigIn = false;
    },
    signUpUser(state, _: PayloadAction<SignUpPayload>) {
      state.signingUp = true;
    },
    signInUser(state, _: PayloadAction<SignInPayload>) {
      state.signinigIn = true;
    },
    signInUserSuccess(state, { payload }: PayloadAction<NormalizedUser>) {
      state.current = payload.collections.users[payload.ids.users[0]];
      state.signinigIn = false;
    },
    signInUserError(state) {
      state.signinigIn = false;
    },
    signUpUserError(state) {
      state.signingUp = true;
    },
    signOutUser() {},
    addUserAddress(_, __: PayloadAction<AddUserAddressPayload>) {},
    deleteUserAddress(_, __: PayloadAction<number>) {},
    toggleUserAddressActive(_, __: PayloadAction<number>) {},
    updateUserPassedIntro(state, { payload }: PayloadAction<boolean>) {
      state.current!.passedIntro = true;
    },
    fetchCurrentUser() {},
    updateUserAvatar: (
      state,
      { payload }: PayloadAction<{ image: string | File }>
    ) => state,
    removeUserAvatar() {},
    setUserAvatar(state, { payload }: { payload: string }) {
      state.current!.avatarUrl = payload;
    },
    emitUpdateUserInfo(
      _,
      __: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      }>
    ) {},
    setUserInformation(state, { payload }: PayloadAction<NormalizedUser>) {
      state.current = payload.collections.users[payload.ids.users[0]];
    },
    recoverPassword(_, __: PayloadAction<string>) {},
    resetPassword(_, __: PayloadAction<ResetPasswordPayload>) {},
    updateUserPassword: (
      state,
      { payload }: PayloadAction<PasswordConfirmPayload>
    ) => state,
    uploadPrequalitor: (state, { payload }: { payload: File }) => state,
    removePrequalitor() {},
    setUserPrequalitor(state, { payload }: { payload: string }) {
      state.current!.prequalitorUrl = payload;
    },
    uploadProofOfFunds: (state, { payload }: { payload: File }) => state,
    removeProofOfFunds() {},
    setUserProofOfFunds(state, { payload }: { payload: string }) {
      state.current!.proofOfFundsUrl = payload;
    },
    switchNotification(
      _,
      __: PayloadAction<{
        email: {
          favorite_sold: boolean;
          favorite_price_reduce: boolean;
        };
        push: {
          favorite_sold: boolean;
          favorite_price_reduce: boolean;
        };
      }>
    ) {},
    setNotificationUpdate(state, { payload }) {
      state.current!.notificationsSettings = payload;
    },
    setTokenApi(_, __: PayloadAction<string>) {},
  },
});

export const { actions } = usersSlice;

const action = actions.fetchCurrentUser();

export default usersSlice.reducer;
