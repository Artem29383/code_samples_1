import { request, Methods } from './request';
import { SaveSearchParams } from 'models/searches/types';

import { getQuery } from 'utils/filters';

export const fetchSearchesList = () =>
  request(Methods.GET, {
    url: '/users/current/saved_searches',
  });

export const fetchSearchItem = (id: number) =>
  request(Methods.GET, {
    url: `/users/current/saved_searches/${id}`,
  });

export const saveSearch = (params: SaveSearchParams) =>
  request(Methods.POST, {
    url: `/users/current/saved_searches`,
    data: {
      title: params.title,
      query: getQuery(params.query),
      addresses: params.address
        ? [
            {
              full_address: params.address.title,
              latitude: params.address.location[0],
              longitude: params.address.location[1],
            },
          ]
        : [],
    },
  });

export const deleteSearch = (id: number) =>
  request(Methods.DELETE, {
    url: `/users/current/saved_searches/${id}`,
  });
