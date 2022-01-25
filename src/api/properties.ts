import { Methods, request } from './request';

import {
  ApiGeoPoints,
  ApiProperties,
  ApiPropertiesShorthands,
  ApiProperty,
  FetchClustersParams,
  FetchPropertiesParams,
  FetchPropertiesShorthandsParams,
  ShowingPost,
  SortingField,
  FetchInBoundingsParams,
} from 'models/properties/types';

import { getQuery } from 'utils/filters';

const sortingApiFields: Record<SortingField, keyof ApiProperty> = {
  listPrice: 'list_price',
  distance: 'distance',
  propertyType: 'property_type',
  daysOnMarket: 'days_on_market',
};

const getRequestData = (params: FetchPropertiesShorthandsParams) => {
  const query = getQuery(params.query);
  return {
    areas: params.areas,
    boundings:
      params.northEastCorner && params.southWestCorner
        ? {
            ne_corner: {
              latitude: params.northEastCorner[0],
              longitude: params.northEastCorner[1],
            },
            sw_corner: {
              latitude: params.southWestCorner[0],
              longitude: params.southWestCorner[1],
            },
          }
        : null,
    distance_from_point: {
      latitude: params.distanceFrom[0],
      longitude: params.distanceFrom[1],
    },
    standard_statuses: Object.keys(params.query.boolean.statuses).filter(
      key => params.query.boolean.statuses[key]
    ),
    only_short_sale: params.query.boolean.tags.shortSales,
    query,
  };
};

export const fetchProperties = (params: FetchPropertiesParams) => {
  return request<ApiProperties>(Methods.POST, {
    data: getRequestData(params),
    url: `/properties?page=${params.page}&per_page=${
      params.perPage
    }&sorting_column=${
      sortingApiFields[params.sorting.field]
    }&sorting_direction=${params.sorting.direction}`,
    headers: params.requestId
      ? {
          'X-Request-ID': params.requestId,
        }
      : {},
  });
};

export const fetchItem = (id: number) =>
  request<ApiProperty>(Methods.GET, {
    url: `/properties/${id}`,
  });

export const fetchPropertiesShorthands = (
  params: FetchPropertiesShorthandsParams
) =>
  request<ApiPropertiesShorthands>(Methods.POST, {
    data: getRequestData(params),
    url: `/properties/ids`,
  });

export const fetchGeoPoints = () =>
  request<ApiGeoPoints>(Methods.GET, {
    url: '/properties/geo',
  });

export const addPropertyToFavorites = (id: number) =>
  request(Methods.POST, {
    url: `users/current/favorites/properties`,
    data: {
      property_id: id,
    },
  });

export const removePropertyFromFavorites = (id: number) =>
  request(Methods.DELETE, {
    url: `users/current/favorites/properties/${id}`,
  });

export const addPropertyToHiddens = (id: number) =>
  request(Methods.POST, {
    url: `users/current/hidden_properties`,
    data: {
      property_id: id,
      duration: 'until_price_change',
    },
  });

export const removePropertyFromHiddens = (id: number) =>
  request(Methods.DELETE, {
    url: `users/current/hidden_properties/${id}`,
  });

export const addRequestShowing = (data: ShowingPost) =>
  request(Methods.POST, {
    url: 'requests/tours',
    data,
  });

export const fetchPropertiesMiles = (data: {
  radius: number;
  latitude: string;
  longitude: string;
  bedGt: number;
  bedLt: number;
  priceGt: string;
  priceLt: string;
}) =>
  request(Methods.POST, {
    url: '/properties',
    data: {
      distance_from_point_radius: data.radius,
      distance_from_point: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      query: {
        list_price_gt: data.priceGt,
        list_price_lt: data.priceLt,
        bedrooms_total_lt: data.bedLt,
        bedrooms_total_gt: data.bedGt,
      },
    },
  });

export const fetchPropertiesSimilar = (data: {
  bedGt: number;
  bedLt: number;
  priceGt: string;
  priceLt: string;
}) =>
  request(Methods.POST, {
    url: '/properties',
    data: {
      query: {
        list_price_gt: data.priceGt,
        list_price_lt: data.priceLt,
        bedrooms_total_lt: data.bedLt,
        bedrooms_total_gt: data.bedGt,
      },
    },
  });

export const favoritesFetch = (data: { page: number; perPage: number }) =>
  request(Methods.GET, {
    url: `/users/current/favorites/properties?page=${data.page}&per_page=${data.perPage}`,
  });

export const fetchClusters = ({
  boundings,
  query,
  areas,
}: FetchClustersParams) =>
  request<ApiGeoPoints>(Methods.POST, {
    url: '/properties/cluster',
    data: {
      areas,
      boundings: {
        nw_corner: {
          latitude: boundings.northWestCorner[0],
          longitude: boundings.northWestCorner[1],
        },
        se_corner: {
          latitude: boundings.southEastCorner[0],
          longitude: boundings.southEastCorner[1],
        },
      },
      query: getQuery(query),
      standard_statuses: Object.keys(query.boolean.statuses).filter(
        key => query.boolean.statuses[key]
      ),
      only_short_sale: query.boolean.tags.shortSales,
    },
  });

export const fetchPropertiesInBoundings = ({
  boundings,
  distanceFrom,
  query,
  areas,
  ...rest
}: FetchInBoundingsParams) =>
  request<ApiGeoPoints>(Methods.POST, {
    url: '/properties/in_boundings',
    data: {
      ...rest,
      areas,
      boundings: {
        ne_corner: {
          latitude: boundings.northEastCorner[0],
          longitude: boundings.northEastCorner[1],
        },
        sw_corner: {
          latitude: boundings.southWestCorner[0],
          longitude: boundings.southWestCorner[1],
        },
      },
      distance_from_point: {
        latitude: distanceFrom[0],
        longitude: distanceFrom[1],
      },
      standard_statuses: Object.keys(query.boolean.statuses).filter(
        key => query.boolean.statuses[key]
      ),
      only_short_sale: query.boolean.tags.shortSales,
      query: getQuery(query),
    },
  });

export const fetchDisabledTourFields = (date: string) =>
  request<ApiProperty>(Methods.GET, {
    url: `/requests/tours/disabled_timeslots?tour_date=${date}`,
  });
