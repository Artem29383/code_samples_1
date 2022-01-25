import { put, select, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import { Address } from 'models/addresses/types';
import { Routes } from '@types';
import { routes } from 'src/routes';

import { listSelector } from 'models/addresses/selectors';
import { locationSelector, historySelector } from 'models/app/selectors';

import { pushNotification } from 'utils/pushNotification';
import matchRoutes from 'utils/matchRoutes';

import history from 'utils/history';

import { pushError, pushUnhandledError } from 'utils/pushErrors';

import { normalize, NormalizedUser } from './schema';

import { delayRequest, request } from 'utils/call';

import { actions } from './index';
import { actions as actionsStep } from 'models/steps';
import {
  SignInPayload,
  SignUpPayload,
  SendInvitationPayload,
  ApiUser,
  ImagePayload,
  PasswordConfirmPayload,
  ResetPasswordPayload,
} from './types';

import * as api from 'api/user';

function* setCurrentUser(response: AxiosResponse<ApiUser>) {
  if (process.env.RUN_ENV === 'local') {
    yield localStorage.setItem('auth-token', response.data.auth_token);
  }

  yield put<PayloadAction<NormalizedUser>>({
    type: actions.signInUserSuccess.type,
    payload: normalize(response.data),
  });
}

function* getUserInfo() {
  try {
    const response: AxiosResponse<ApiUser> = yield request(
      api.fetchCurrentUser,
      {}
    );
    yield setCurrentUser(response);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      yield put({
        type: actions.setUnauthorized.type,
      });
      const location: ReturnType<typeof locationSelector> = yield select(
        locationSelector
      );
      const branch = matchRoutes(location.pathname);
      const route = routes.find(({ path }) => path === branch.route.path);
      if (route && route.auth) {
        yield history.push('/sign-in');
      }
    }
  }
}

function* signUp({ payload }: PayloadAction<SignUpPayload>) {
  try {
    yield request<SignUpPayload>(api.signUp, payload);
    yield history.push('/');
  } catch (err) {
    console.error(err);
    yield pushError(
      'Invalid invitation token. Please check your invitation link'
    );
  }
}

function* signIn({ payload }: PayloadAction<SignInPayload>) {
  try {
    const response: AxiosResponse<ApiUser> = yield request<SignInPayload>(
      api.signIn,
      payload
    );
    if (localStorage.getItem('sell-form')) {
      if (
        response.data.email !==
        JSON.parse(localStorage.getItem('sell-form') || '').data?.user?.email
      ) {
        yield put({
          type: actionsStep.resetForm.type,
          payload: {},
        });
      }
    }

    const routerHistory: ReturnType<typeof historySelector> = yield select(
      historySelector
    );

    yield setCurrentUser(response);

    if (routerHistory[0] !== Routes.signIn) {
      yield history.push(routerHistory[0]);
    } else {
      yield history.push('/');
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      yield pushError('Invalid email or password!');
    }
  }
}

function* signOut() {
  try {
    if (process.env.RUN_ENV === 'local') {
      yield localStorage.removeItem('auth-token');
    } else {
      yield request(api.signOut, {});
    }

    yield history.push('/sign-in');
  } catch (err) {
    console.error(err);
  }
}

function* sendInvitation({ payload }: PayloadAction<SendInvitationPayload>) {
  try {
    yield request<SendInvitationPayload>(api.sendInvitation, payload);
    yield pushNotification(
      'Check your email address fot the next steps',
      'Congratulations!'
    );
  } catch (err) {
    console.error(err);

    if (err.response.status === 422) {
      yield pushError(
        'You were already invited. Check your email address for the next steps',
        'Invitation error'
      );
    } else {
      yield pushUnhandledError();
    }
  }
}

function* addUserAddress({ payload }: PayloadAction<Omit<Address, 'id'>>) {
  try {
    const addresses: Address[] = yield select(listSelector);
    const activeAddress = addresses.find(item => item.active);

    const response: AxiosResponse<ApiUser> = yield request(
      api.addUserAddress,
      payload
    );

    const normalizedUser = normalize(response.data);

    if (activeAddress) {
      normalizedUser.collections.addresses[activeAddress.id].active = false;

      yield request(
        api.updateUserAddresses,
        addresses.map(({ id }) => ({ id, active: false }))
      );
    }

    yield put({
      type: actions.setUserInformation.type,
      payload: normalizedUser,
    });
  } catch (err) {
    console.error('error', err);
  }
}

function* deleteUserAddress({ payload }: PayloadAction<number>) {
  try {
    yield request(api.deleteUserAddress, payload);
  } catch (err) {
    console.error('error', err);
  }
}

function* updateUserPassedIntro({ payload }: PayloadAction<boolean>) {
  try {
    yield request(api.updateUserPassedIntro, payload);
  } catch (err) {
    console.error('error', err);
  }
}

function* toggleUserAddressActive() {
  try {
    const addresses: Address[] = yield select(listSelector);
    yield request(
      api.updateUserAddresses,
      addresses.map(({ id, active }) => ({ id, active }))
    );
  } catch (err) {
    console.error('error', err);
  }
}

function* userAvatarUpdate({ payload }: PayloadAction<ImagePayload>) {
  try {
    const { image } = payload;
    const { data } = yield request<File>(api.uploadUserAvatar, image);
    const avatarUrl = data.avatar_url;
    yield put({
      type: actions.setUserAvatar.type,
      payload: avatarUrl,
    });
    yield pushNotification('User avatar has been updated', 'Success!');
  } catch (err) {
    console.error('error', err);
  }
}

function* userAvatarRemove() {
  try {
    const { data } = yield request(api.removeUserAvatar, {});
    yield put({
      type: actions.setUserAvatar.type,
      payload: data.avatar_url,
    });
    yield pushNotification('User avatar has been removed', 'Success!');
  } catch (err) {
    console.error('error', err);
  }
}

function* userUpdate({
  payload,
}: PayloadAction<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}>) {
  try {
    const response = yield delayRequest(api.updateUserData, payload);
    yield put({
      type: actions.setUserInformation.type,
      payload: normalize(response.data),
    });
    yield pushNotification('Information has been updated', 'Success!');
  } catch (err) {
    yield pushError(err.message, 'Error');
  }
}

function* updatePassword({ payload }: PayloadAction<PasswordConfirmPayload>) {
  try {
    yield request(api.updateUserPassword, payload);
    yield pushNotification('Your password has been updated', 'Success!');
  } catch (err) {
    yield pushError(err.message, 'Error');
  }
}

function* recoverPassword({ payload }: PayloadAction<string>) {
  try {
    yield request(api.recoverUserPassword, payload);
    yield pushNotification(
      "You've recovered your password. Check your email for the next steps",
      'Success!'
    );
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('error', err);
      yield pushError(
        'Such email address is not registered in system',
        'Error'
      );
    }
  }
}

function* resetPassword({ payload }: PayloadAction<ResetPasswordPayload>) {
  try {
    yield request(api.resetUserPassword, payload);
    yield history.push(Routes.signIn);
    yield pushNotification(
      "You've successfully reset your password. Check your email for the next steps",
      'Success!'
    );
  } catch (err) {
    console.error('err', err);
    if (
      (err.response && err.response.status === 404) ||
      err.response.status === 404
    ) {
      yield pushError(
        'Check your reset password email or try to recover your password one more time',
        'Error'
      );
    }
  }
}

function* userPrequalitorUpload({ payload }: PayloadAction<File>) {
  try {
    const { data } = yield request<File>(api.uploadUserPrequalitor, payload);
    yield put({
      type: actions.setUserPrequalitor.type,
      payload: data.prequalitor_url,
    });
    yield pushNotification('User prequalitor has been uploaded', 'Success!');
  } catch (err) {
    console.error('err');
  }
}

function* userPrequalitorRemove() {
  try {
    const { data } = yield request(api.userPrequalitorRemove, {});
    yield put({
      type: actions.setUserPrequalitor.type,
      payload: data.prequalitor_url,
    });
    yield pushNotification('User prequalitor has been removed', 'Success!');
  } catch (err) {
    console.error('error', err);
  }
}

function* userProofOfFundUpload({ payload }: PayloadAction<File>) {
  try {
    const { data } = yield request<File>(api.uploadUserProofOfFund, payload);
    yield put({
      type: actions.setUserProofOfFunds.type,
      payload: data.proof_of_funds_url,
    });
    yield pushNotification('User fund has been uploaded', 'Success!');
  } catch (err) {
    console.error('error', err);
  }
}

function* userProofOfFundRemove() {
  try {
    const { data } = yield request(api.userProofOfFundRemove, {});
    yield put({
      type: actions.setUserProofOfFunds.type,
      payload: data.proof_of_funds_url,
    });
    yield pushNotification('User fund has been removed', 'Success!');
  } catch (err) {
    console.error('error', err);
  }
}

function* notificationSwitch({
  payload,
}: PayloadAction<{
  email: {
    favorite_sold: boolean;
    favorite_price_reduce: boolean;
  };
  push: {
    favorite_sold: boolean;
    favorite_price_reduce: boolean;
  };
}>) {
  try {
    const response = yield request(api.notificationSwitch, payload);
    yield put({
      type: actions.setNotificationUpdate.type,
      payload: response.data.notifications_settings,
    });
  } catch (err) {
    console.error(err);
  }
}

function* setTokenApi({ payload }: PayloadAction<string>) {
  try {
    yield request(api.setTokenApi, payload);
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield getUserInfo();
  yield takeLatest(actions.setTokenApi.type, setTokenApi);
  yield takeLatest(actions.switchNotification.type, notificationSwitch);
  yield takeLatest(actions.sendInvitation.type, sendInvitation);
  yield takeLatest(actions.signInUser.type, signIn);
  yield takeLatest(actions.signUpUser.type, signUp);
  yield takeLatest(actions.signOutUser.type, signOut);
  yield takeLatest(
    actions.toggleUserAddressActive.type,
    toggleUserAddressActive
  );
  yield takeLatest(actions.deleteUserAddress.type, deleteUserAddress);
  yield takeLatest(actions.updateUserPassedIntro.type, updateUserPassedIntro);
  yield takeLatest(actions.addUserAddress.type, addUserAddress);
  yield takeLatest(actions.updateUserAvatar.type, userAvatarUpdate);
  yield takeLatest(actions.removeUserAvatar.type, userAvatarRemove);
  yield takeLatest(actions.emitUpdateUserInfo.type, userUpdate);
  yield takeLatest(actions.updateUserPassword.type, updatePassword);
  yield takeLatest(actions.recoverPassword.type, recoverPassword);
  yield takeLatest(actions.resetPassword.type, resetPassword);
  yield takeLatest(actions.uploadPrequalitor.type, userPrequalitorUpload);
  yield takeLatest(actions.removePrequalitor.type, userPrequalitorRemove);
  yield takeLatest(actions.uploadProofOfFunds.type, userProofOfFundUpload);
  yield takeLatest(actions.removeProofOfFunds.type, userProofOfFundRemove);
}
