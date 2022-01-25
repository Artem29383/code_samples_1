/* TODO need to be typed properly */

import { call, all } from 'redux-saga/effects';

import { Delays } from '@types';
import { AxiosPromise } from 'axios';

import { pushUnhandledError } from 'utils/pushErrors';

/* eslint-disable consistent-return */
function* common(effect: any) {
  try {
    return yield effect();
  } catch (err) {
    if (err.response && err.response.status === 500) {
      console.error('Unhandled error', err);
      yield pushUnhandledError();
    } else {
      throw err;
    }
  }
}
/* eslint-disable consistent-return */

export function* request<T>(
  req: (params: T) => AxiosPromise<unknown> | Promise<unknown>,
  params: T
) {
  return yield common(() => call(req, params));
}

/* eslint-disable func-names */
export function* delayRequest<T>(
  req: (params: T) => AxiosPromise<unknown> | Promise<unknown>,
  params: T
) {
  return yield common(function*() {
    const response = yield all([
      call(req, params),
      call(
        () =>
          new Promise(resolve => setTimeout(resolve, Delays.commonRequestDelay))
      ),
    ]);

    return response[0];
  });
}
/* eslint-disable func-names */
