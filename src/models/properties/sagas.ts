/* eslint-disable no-underscore-dangle */

import { put, takeLatest, select, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  ApiCluster,
  ApiGeoPoints,
  ApiProperties,
  ApiPropertiesShorthands,
  ApiProperty,
  Boundings,
  DistanceFrom,
  FetchByBoundingsPayload,
  FetchByBoundingsSuccessPayload,
  FetchItemSuccessPayload,
  FetchMoreItemsSuccessPayload,
  FetchPropertiesParams,
  FetchPropertiesShorthandsParams,
  Property,
  SetMapPropertyPointsPayload,
  ShowingPost,
  SortingField,
  AreasType,
} from './types';
import { Event } from '@types';

import { normalize, pickCluster } from './schema';

import Emitter from 'utils/eventEmitter';
import { delayRequest, request } from 'utils/call';
import history from 'utils/history';

import {
  ActiveSorting,
  PropertiesList,
  activeSortingSelector,
  boundingsSelector,
  distanceFromSelector,
  processedFiltersSelector,
  itemSelector,
  pageSelector,
  perPageSelector,
  fetchedTotalSelector,
  listSelector,
  pinItemSelector,
  getPropertyItem,
  areasSelector,
} from './selectors';

import { actions } from './index';

import * as api from 'api/properties';
import { pushNotification } from 'utils/pushNotification';
import { pushError } from 'utils/pushErrors';
import { toCamelCaseFavorites } from 'models/requests/schema';

function* fetchProperties(page: number, requestId = '') {
  const boundings: Boundings = yield select(boundingsSelector);
  const distanceFrom: DistanceFrom = yield select(distanceFromSelector);
  const sorting: ActiveSorting = yield select(activeSortingSelector);
  const perPage: number = yield select(perPageSelector);
  const areas: AreasType = yield select(areasSelector);
  const fetchedTotal: number | null = yield select(fetchedTotalSelector);
  const list: PropertiesList = yield select(listSelector);
  const query: ReturnType<typeof processedFiltersSelector> = yield select(
    processedFiltersSelector
  );

  return yield delayRequest<FetchPropertiesParams>(api.fetchProperties, {
    ...boundings,
    distanceFrom,
    page,
    requestId,
    query,
    sorting,
    areas,
    perPage: list.length === 0 ? fetchedTotal || perPage : perPage,
  });
}

function* fetchPropertiesShorthands() {
  // const boundings: Boundings = yield select(boundingsSelector);
  const distanceFrom: DistanceFrom = yield select(distanceFromSelector);
  const query: ReturnType<typeof processedFiltersSelector> = yield select(
    processedFiltersSelector
  );

  return yield request<FetchPropertiesShorthandsParams>(
    api.fetchPropertiesShorthands,
    {
      // ...boundings,
      distanceFrom,
      query,
    }
  );
}

function* fetchMapPoints() {
  try {
    const response: [
      AxiosResponse<ApiGeoPoints>,
      AxiosResponse<ApiPropertiesShorthands>
    ] = yield all([
      request(api.fetchGeoPoints, {}),
      fetchPropertiesShorthands(),
    ]);

    window.__MAP_POINTS__ = response[0].data.features.map(item => {
      const property = response[1].data.properties_ids.find(
        ({ id }) => item.properties.property_id === id
      );

      return {
        coordinates: [
          Number(item.geometry.coordinates[1]),
          Number(item.geometry.coordinates[0]),
        ],
        propertyId: item.properties.property_id,
        propertyType: item.properties.property_type,
        favorite: property !== undefined && property.my_favorite_property,
        active: true,
      };
    });

    yield put({
      type: actions.setMapPoints.type,
    });

    Emitter.emit(Event.mapPointsSet);
  } catch (err) {
    console.error('error', err);
  }
}

function* filterMapPoints() {
  try {
    const response: AxiosResponse<ApiPropertiesShorthands> = yield fetchPropertiesShorthands();

    if (window.__MAP_POINTS__) {
      window.__MAP_POINTS__ = window.__MAP_POINTS__.map(item => {
        const property = response.data.properties_ids.find(
          ({ id }) => item.propertyId === id
        );

        return {
          ...item,
          favorite: property !== undefined && property.my_favorite_property,
          active: property !== undefined,
        };
      });

      yield put({
        type: actions.setMapPoints.type,
      });

      Emitter.emit(Event.mapPointsSet);
    }
  } catch (err) {
    console.error('error', err);
  }
}

function* fetchByBoundings() {
  try {
    const response: AxiosResponse<ApiProperties> = yield fetchProperties(1);

    yield put<PayloadAction<FetchByBoundingsSuccessPayload>>({
      type: actions.fetchByBoundingsSuccess.type,
      payload: {
        ...normalize(response.data.properties),
        page: 1,
        total: response.data.meta.total_count,
      },
    });
  } catch (err) {
    console.error('error', err);
  }
}

function* fetchMoreItems({ payload }: PayloadAction<string>) {
  try {
    const page: number = yield select(pageSelector);

    const response: AxiosResponse<ApiProperties> = yield fetchProperties(
      page + 1,
      payload
    );

    yield put<PayloadAction<FetchMoreItemsSuccessPayload>>({
      type: actions.fetchMoreItemsSuccess.type,
      payload: {
        ...normalize(response.data.properties),
        page: page + 1,
        total: response.data.meta.total_count,
        requestId: response.headers['x-request-id'],
      },
    });
  } catch (err) {
    console.error('error', err);
  }
}

export function* fetchItem({ payload }: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ApiProperty> = yield delayRequest<number>(
      api.fetchItem,
      payload
    );

    yield put<PayloadAction<FetchItemSuccessPayload>>({
      type: actions.fetchItemSuccess.type,
      payload: normalize([response.data]),
    });
  } catch (err) {
    console.error(err);
  }
}

function* fetchPinItem({ payload }: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ApiProperty> = yield delayRequest<number>(
      api.fetchItem,
      payload
    );

    yield put<PayloadAction<FetchItemSuccessPayload>>({
      type: actions.fetchPinItemSuccess.type,
      payload: normalize([response.data]),
    });

    Emitter.emit(Event.drawPinItem, payload);
  } catch (err) {
    console.error('error', err);
  }
}

function* togglePropertyToFavorites({ payload }: PayloadAction<number>) {
  try {
    const property: Property = yield select(itemSelector, payload);
    /* Find a way to type event and it's handler */
    if (property.favorite) {
      Emitter.emit(Event.addMarkerToFavorites, payload);
      yield request<number>(api.addPropertyToFavorites, payload);
    } else {
      Emitter.emit(Event.removeMarkerFromFavorites, payload);
      yield request<number>(api.removePropertyFromFavorites, payload);
    }
  } catch (err) {
    console.error('error', err);
  }
}

function* togglePropertyToHiddens({ payload }: PayloadAction<number>) {
  try {
    const property: Property = yield select(itemSelector, payload);
    if (property.hidden) {
      yield request<number>(api.addPropertyToHiddens, payload);
    } else {
      yield request<number>(api.removePropertyFromHiddens, payload);
    }
  } catch (err) {
    console.error('error', err);
  }
}

function* togglePinItemToFavorites({ payload }: PayloadAction<number>) {
  try {
    const property: Property = yield select(pinItemSelector);
    /* Find a way to type event and it's handler */
    if (property.favorite) {
      Emitter.emit(Event.addMarkerToFavorites, payload);
      yield request<number>(api.addPropertyToFavorites, payload);
    } else {
      Emitter.emit(Event.removeMarkerFromFavorites, payload);
      yield request<number>(api.removePropertyFromFavorites, payload);
    }
  } catch (err) {
    console.error('error', err);
  }
}

function* toggleSorting({ payload }: PayloadAction<SortingField>) {
  try {
    const perPage: number = yield select(perPageSelector);
    const query = new URLSearchParams(history.location.search);

    query.set('sorting-column', payload);
    history.replace(`${history.location.pathname}?${query}`);

    yield put<PayloadAction<FetchByBoundingsPayload>>({
      type: actions.fetchByBoundings.type,
      payload: { boundings: undefined, perPage },
    });
  } catch (err) {
    console.error('error', err);
  }
}

function* showingRequest({ payload }: PayloadAction<ShowingPost>) {
  try {
    yield request(api.addRequestShowing, payload);
    yield pushNotification('Showing request has been created', 'Success!');
  } catch (err) {
    if (err.response.status === 422) {
      yield pushError(
        'Unable to create a request for a past date',
        'Showing request error'
      );
    }
    if (err.response.status === 400) {
      yield pushError('This date is already occupied', 'Showing request error');
    }
  }
}

function* getPropertiesMiles({
  payload,
}: PayloadAction<{
  radius: number;
  latitude: string;
  longitude: string;
  bedGt: number;
  bedLt: number;
  priceGt: string;
  priceLt: string;
}>) {
  try {
    const response = yield delayRequest(api.fetchPropertiesMiles, payload);
    yield put<PayloadAction<FetchByBoundingsSuccessPayload>>({
      type: actions.getPropertiesMilesSuccess.type,
      payload: {
        ...normalize(response.data.properties),
        page: 1,
        total: response.data.meta.total_count,
      },
    });
    yield put({
      type: actions.setLoadFav.type,
      payload: false,
    });
  } catch (err) {
    console.error(err);
  }
}

function* getPropertiesSimilar({
  payload,
}: PayloadAction<{
  bedGt: number;
  bedLt: number;
  priceGt: string;
  priceLt: string;
}>) {
  try {
    const response = yield request(api.fetchPropertiesSimilar, payload);
    yield put<PayloadAction<FetchByBoundingsSuccessPayload>>({
      type: actions.getPropertiesSimilarSuccess.type,
      payload: {
        ...normalize(response.data.properties),
        page: 1,
        total: response.data.meta.total_count,
      },
    });
    yield put({
      type: actions.setLoadSimilar.type,
      payload: false,
    });
  } catch (e) {
    console.info(e);
  }
}

function* favoritesFetch({
  payload,
}: PayloadAction<{
  page: number;
  perPage: number;
}>) {
  try {
    const response = yield request(api.favoritesFetch, payload);
    yield put({
      type: actions.setFavoritesProperties.type,
      payload: toCamelCaseFavorites(response),
    });
    yield put({
      type: actions.setLoadFav.type,
      payload: false,
    });
  } catch (e) {
    console.error(e);
  }
}

function* fetchShorthandsInBoundings() {
  const boundings: Boundings = yield select(boundingsSelector);
  const distanceFrom: DistanceFrom = yield select(distanceFromSelector);
  const areas: AreasType = yield select(areasSelector);
  const query: ReturnType<typeof processedFiltersSelector> = yield select(
    processedFiltersSelector
  );

  const response: AxiosResponse<{ properties: ApiProperty[] }> = yield request(
    api.fetchPropertiesInBoundings,
    {
      areas,
      boundings,
      distanceFrom,
      query,
    }
  );

  const normalized = normalize(response.data.properties);

  yield put<PayloadAction<SetMapPropertyPointsPayload>>({
    type: actions.setMapPropertyPoints.type,
    payload: {
      ...normalized,
    },
  });

  Emitter.emit(
    Event.mapPointsFetched,
    normalized.ids.properties.map(id =>
      getPropertyItem(
        normalized.collections.properties[id],
        normalized.collections.images
      )
    )
  );
}

function* fetchClusters() {
  const boundings: Boundings = yield select(boundingsSelector);
  const areas: AreasType = yield select(areasSelector);
  const query: ReturnType<typeof processedFiltersSelector> = yield select(
    processedFiltersSelector
  );

  const response: AxiosResponse<{ properties: ApiCluster[] }> = yield request(
    api.fetchClusters,
    {
      boundings,
      areas,
      query,
    }
  );

  const itemsCount = response.data.properties.reduce(
    (acc, item) => item.ids.length + acc,
    0
  );
  if (itemsCount > 50) {
    Emitter.emit(
      Event.clustersFetched,
      response.data.properties.map(item => pickCluster(item))
    );
  } else if (itemsCount >= 1) {
    yield fetchShorthandsInBoundings();
  } else {
    Emitter.emit(
      Event.clustersFetched,
      response.data.properties.map(item => pickCluster(item))
    );
  }
}

function* getFieldsDisabled({ payload }: PayloadAction<string>) {
  try {
    const response = yield request(api.fetchDisabledTourFields, payload);
    yield put({
      type: actions.setFieldsDisabled.type,
      payload: response.data.disabled_fields,
    });
  } catch (e) {
    console.info(e);
  }
}

export default function*() {
  yield takeLatest(actions.getFavoritesProperties.type, favoritesFetch);
  yield takeLatest(
    actions.togglePinItemToFavorites.type,
    togglePinItemToFavorites
  );
  yield takeLatest(actions.getPropertiesMiles.type, getPropertiesMiles);
  yield takeLatest(actions.getSimilarProperties.type, getPropertiesSimilar);
  yield takeLatest(actions.postShowingRequest.type, showingRequest);
  yield takeLatest(actions.fetchMapPoints.type, fetchMapPoints);
  yield takeLatest(actions.filterMapPoints.type, filterMapPoints);
  yield takeLatest(actions.fetchByBoundings.type, fetchByBoundings);
  yield takeLatest(actions.toggleSorting.type, toggleSorting);
  yield takeLatest(actions.fetchMoreItems.type, fetchMoreItems);
  yield takeLatest(actions.fetchItem.type, fetchItem);
  yield takeLatest(actions.fetchPinItem.type, fetchPinItem);
  yield takeLatest(actions.toggleToFavorites.type, togglePropertyToFavorites);
  yield takeLatest(actions.toggleToHiddens.type, togglePropertyToHiddens);
  yield takeLatest(actions.fetchClusters.type, fetchClusters);
  yield takeLatest(actions.getFieldsDisabled.type, getFieldsDisabled);
  yield takeLatest(
    actions.fetchShorthandsInBoundings.type,
    fetchShorthandsInBoundings
  );
}
