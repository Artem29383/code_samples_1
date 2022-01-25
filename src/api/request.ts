import axios, { AxiosRequestConfig } from 'axios';
import config from '@config';

import { Delays } from '@types';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Stub<T> = {
  data: T;
  delay: number;
};

export const request = <T>(method: Methods, opts: AxiosRequestConfig) => {
  const commonHeaders = { 'X-Api-Version': config.apiVersion };

  if (RUNTIME_ENV === 'client') {
    return axios.request<T>({
      ...opts,
      method,
      baseURL: `${config.remoteApiUrl}/api`,
      headers:
        process.env.RUN_ENV === 'local'
          ? {
              ...commonHeaders,
              ...opts.headers,
              'X-Auth-Token': localStorage.getItem('auth-token'),
            }
          : {
              ...commonHeaders,
              ...opts.headers,
            },
    });
  }

  return axios.request<T>({
    ...opts,
    headers: {
      ...commonHeaders,
      ...opts.headers,
    },
    baseURL: `${config.remoteApiUrl}/api`,
    method,
  });
};

export const stubRequest = <T>(stub: Stub<T>) => {
  const { data, delay = Delays.stubRequestDelay } = stub;

  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const externalRequest = <T>(
  externalUrl: string,
  opts: AxiosRequestConfig
) => axios.request<T>({ url: externalUrl, ...opts });
