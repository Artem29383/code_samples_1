import { Methods, request } from './request';

export const getFavorites = (data: { query: string; propertyTypes: string }) =>
  request(Methods.GET, {
    url: `/users/current/favorites/properties?page=1&per_page=100${
      data.query ? `&property_type=${data.query}` : ''
    }`,
  });

export const getFavoritesHidden = (data: {
  query: string;
  propertyTypes: string;
}) =>
  request(Methods.GET, {
    url: `/users/current/hidden_properties?page=1&per_page=100${
      data.query ? `&property_type=${data.query}` : ''
    }`,
  });

export const getRecentFavorites = (data: {
  query: string;
  propertyTypes: string;
}) =>
  request(Methods.GET, {
    url: `/users/current/property_view_histories?page=1&per_page=30${
      data.query ? `&property_type=${data.query}` : ''
    }`,
  });

export const getStatisticsFavorites = () =>
  request(Methods.GET, {
    url: `/users/current/favorites_counts`,
  });
