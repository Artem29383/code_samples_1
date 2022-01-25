/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _takeWhile from 'lodash/takeWhile';
import _takeRightWhile from 'lodash/takeRightWhile';
import _mapValues from 'lodash/mapValues';

import history from 'utils/history';

import concatUniq from 'utils/concatUniq';

import {
  Rule,
  Filters,
  Boundings,
  RuleFilters,
  PropertiesState,
  SetMapSettingsPayload,
  FetchByBoundingsPayload,
  FetchItemSuccessPayload,
  FetchByBoundingsSuccessPayload,
  FetchMoreItemsSuccessPayload,
  SortingField,
  ShowingPost,
  PerksFilters,
  PropertyTypeFilters,
  RuleOption,
  RuleValue,
  RuleValuesPair,
  StatusesFilters,
  TagsFilters,
  View,
  Cluster,
  FetchClustersPayload,
  FetchInBoundingsPayload,
  SetMapPropertyPointsPayload,
} from './types';

import { defaultFilters } from './filters';

export const defaultDistanceFrom: [number, number] = [36.17215, -115.14144];
export const defaultZoomLevel = 9;

export const defaultNorthEastCorner: [number, number] = [
  37.0338897,
  -116.3506356,
];

export const defaultSouthWestCorner: [number, number] = [
  37.0338897,
  -116.3506356,
];

const initialPerPage = 8;

const initialQuery = new URLSearchParams(history.location.search);

const sortingColumn = initialQuery.get('sorting-column');

const propertyTypeFilters = initialQuery.getAll('pt');
const perksFilters = initialQuery.getAll('pk');
const statusesFilters = initialQuery.getAll('s');
const tagsFilters = initialQuery.getAll('t');
const mapZoomQueryValue = initialQuery.get('z');
const mapCenterQueryValue = initialQuery.getAll('center');
const viewQueryValue = initialQuery.get('v');

const getRuleValue = (
  query: URLSearchParams,
  rule: Rule
): RuleValuesPair | RuleValue | null => {
  const ruleValues: Record<RuleOption, number | null> = {
    gt: query.get(`${rule}-gt`) ? Number(query.get(`${rule}-gt`)) : null,
    gteq: query.get(`${rule}-gteq`) ? Number(query.get(`${rule}-gteq`)) : null,
    lt: query.get(`${rule}-lt`) ? Number(query.get(`${rule}-lt`)) : null,
    lteq: query.get(`${rule}-lteq`) ? Number(query.get(`${rule}-lteq`)) : null,
    eq: query.get(`${rule}-eq`) ? Number(query.get(`${rule}-eq`)) : null,
  };

  const noRuleValueIsSet = Object.keys(ruleValues).every(
    key => ruleValues[key as RuleOption] === null
  );

  if (noRuleValueIsSet) {
    return null;
  }

  const isRuleValuesPair =
    (ruleValues.lt !== null || ruleValues.lteq !== null) &&
    (ruleValues.gt !== null || ruleValues.gteq !== null);

  if (isRuleValuesPair) {
    return [
      {
        rule: ruleValues.gt !== null ? 'gt' : 'gteq',
        value: ruleValues.gt !== null ? ruleValues.gt : ruleValues.gteq!,
      },
      {
        rule: ruleValues.lt !== null ? 'lt' : 'lteq',
        value: ruleValues.lt !== null ? ruleValues.lt : ruleValues.lteq!,
      },
    ];
  }

  const notNullRuleOption = Object.keys(ruleValues).find(
    key => ruleValues[key as RuleOption] !== null
  ) as RuleOption;

  return { rule: notNullRuleOption, value: ruleValues[notNullRuleOption]! };
};

const initialFilters: Filters = {
  boolean: {
    types:
      propertyTypeFilters.length === 0
        ? {
            condo: true,
            house: true,
            lot: true,
            townhome: true,
          }
        : {
            condo: propertyTypeFilters.includes('condo'),
            house: propertyTypeFilters.includes('house'),
            lot: propertyTypeFilters.includes('lot'),
            townhome: propertyTypeFilters.includes('townhome'),
          },
    perks: {
      pool: perksFilters.includes('pool'),
      communityPool: perksFilters.includes('communityPool'),
      guestHouse: perksFilters.includes('guestHouse'),
      gate: perksFilters.includes('gate'),
      golfCourse: perksFilters.includes('golfCourse'),
      loft: perksFilters.includes('loft'),
      guard: perksFilters.includes('guard'),
    },
    tags: {
      shortSales: tagsFilters.includes('shortSales'),
    },
    statuses:
      statusesFilters.length === 0
        ? {
            ShortSales: defaultFilters.boolean.statuses.ShortSales,
            Active: defaultFilters.boolean.statuses.Active,
            ActiveUnderContract:
              defaultFilters.boolean.statuses.ActiveUnderContract,
          }
        : {
            ShortSales: statusesFilters.includes('ShortSales'),
            Active: statusesFilters.includes('Active'),
            ActiveUnderContract: statusesFilters.includes(
              'ActiveUnderContract'
            ),
          },
  },
  rules: {
    bedrooms:
      getRuleValue(initialQuery, 'bedrooms') || defaultFilters.rules.bedrooms,
    bathrooms:
      getRuleValue(initialQuery, 'bathrooms') || defaultFilters.rules.bathrooms,
    budget: getRuleValue(initialQuery, 'budget') || defaultFilters.rules.budget,
    squareFeet:
      getRuleValue(initialQuery, 'squareFeet') ||
      defaultFilters.rules.squareFeet,
    lotSize:
      getRuleValue(initialQuery, 'lotSize') || defaultFilters.rules.lotSize,
    stories:
      getRuleValue(initialQuery, 'stories') || defaultFilters.rules.stories,
    garage: getRuleValue(initialQuery, 'garage') || defaultFilters.rules.garage,
    daysOnMarket:
      getRuleValue(initialQuery, 'daysOnMarket') ||
      defaultFilters.rules.daysOnMarket,
    yearBuilt:
      getRuleValue(initialQuery, 'yearBuilt') || defaultFilters.rules.yearBuilt,
    monthlyHOAFees:
      getRuleValue(initialQuery, 'monthlyHOAFees') ||
      defaultFilters.rules.monthlyHOAFees,
    pricePerSquareFeet:
      getRuleValue(initialQuery, 'pricePerSquareFeet') ||
      defaultFilters.rules.pricePerSquareFeet,
  },
};

const resetCollection = (state: PropertiesState) =>
  state.mapBubbledProperty
    ? {
        [state.mapBubbledProperty]: state.collection[state.mapBubbledProperty],
      }
    : {};

export const initialState: PropertiesState = {
  page: 0,
  total: 0,
  ids: [],
  collection: {},
  view: (viewQueryValue as View) || 'map',
  mapSettings: {
    zoom: mapZoomQueryValue ? Number(mapZoomQueryValue) : defaultZoomLevel,
    center:
      mapCenterQueryValue.length > 1
        ? [Number(mapCenterQueryValue[0]), Number(mapCenterQueryValue[1])]
        : defaultDistanceFrom,
  },
  pinItem: null,
  fetchedTotal: null,
  perPage: initialPerPage,
  /* Default distance from */
  distanceFrom: defaultDistanceFrom,
  fetchingItem: true,
  fetchingPinItem: false,
  newItemsFetched: false,
  newItemsFetching: true,
  fetchedMoreItems: false,
  mapPointsSet: false,
  mapBubbledProperty: null,
  mapPropertyPoints: [],
  clusters: [],
  sortings: {
    distance: { direction: 'ASC', active: sortingColumn === null },
    listPrice: {
      direction: sortingColumn === 'listPrice' ? 'DESC' : 'ASC',
      active: sortingColumn === 'listPrice',
    },
    daysOnMarket: {
      direction: sortingColumn === 'daysOnMarket' ? 'DESC' : 'ASC',
      active: sortingColumn === 'daysOnMarket',
    },
    propertyType: {
      direction: sortingColumn === 'propertyType' ? 'DESC' : 'ASC',
      active: sortingColumn === 'propertyType',
    },
  },
  filters: initialFilters,
  boundings: {
    /* Default corners */
    northEastCorner: defaultNorthEastCorner,
    southWestCorner: defaultSouthWestCorner,
    /* TODO Add actual corners */
    northWestCorner: [0, 0],
    southEastCorner: [0, 0],
  },
  areas: null,
  paginationProperty: {
    collections: {
      properties: {},
    },
    ids: {
      properties: [],
    },
    page: 0,
    total: 0,
  },
  paginationPropertySimilar: {
    collections: {
      properties: {},
    },
    ids: {
      properties: [],
    },
    page: 0,
    total: 0,
  },
  userFavorites: [],
  isLoadFav: true,
  isLoadSimilar: true,
  disabledPeriodFields: [],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    resetFilters(state, { payload }) {
      state.filters = initialFilters;
    },
    fetchByBoundings(
      state,
      { payload }: PayloadAction<FetchByBoundingsPayload>
    ) {
      if (payload.boundings) {
        state.boundings = payload.boundings;
      }

      if (payload.perPage) {
        state.perPage = payload.perPage;
      }

      state.collection = resetCollection(state);
      state.ids = [];
      state.newItemsFetching = true;
      state.newItemsFetched = false;
    },
    fetchShorthandsInBoundings(
      state,
      { payload }: PayloadAction<FetchInBoundingsPayload>
    ) {
      state.boundings = payload.boundings;
    },
    fetchClusters(state, { payload }: PayloadAction<FetchClustersPayload>) {
      state.boundings = payload.boundings!;
      if (payload.areas) {
        state.areas = payload.areas;
      }
      if (payload.areas === null) {
        state.areas = null;
      }
    },
    resetAreas(state, { payload }) {
      state.areas = null;
    },
    fetchClustersSuccess(state, { payload }: PayloadAction<Cluster[]>) {
      state.clusters = payload;
    },
    fetchRestItems(state, { payload }: PayloadAction<string>) {
      state.newItemsFetched = false;
      state.fetchedMoreItems = false;
      const leftItemsCount = state.total - state.ids.length;

      state.ids.push(
        ...[...Array(leftItemsCount)].map(() => ({ requestId: payload }))
      );
    },
    fetchMoreItems(state, { payload }: PayloadAction<string>) {
      state.newItemsFetched = false;
      state.fetchedMoreItems = false;
      const leftItemsCount = state.total - state.ids.length;

      state.ids.push(
        ...[
          ...Array(
            leftItemsCount > state.perPage ? state.perPage : leftItemsCount
          ),
        ].map(() => ({ requestId: payload }))
      );
    },
    fetchMoreItemsSuccess(
      state,
      { payload }: PayloadAction<FetchMoreItemsSuccessPayload>
    ) {
      state.page = payload.page;
      state.total = payload.total;
      state.fetchedMoreItems = true;

      state.ids = [
        ..._takeWhile(
          state.ids,
          item =>
            typeof item === 'number' || item.requestId !== payload.requestId
        ),
        ...payload.ids.properties,
        ..._takeRightWhile(
          state.ids,
          item =>
            typeof item === 'number' || item.requestId !== payload.requestId
        ),
      ];

      state.fetchedTotal = state.ids.length;

      state.collection = {
        ...state.collection,
        ...payload.collections.properties,
      };
    },
    fetchByBoundingsSuccess(
      state,
      { payload }: PayloadAction<FetchByBoundingsSuccessPayload>
    ) {
      state.page = state.fetchedTotal ? state.page : payload.page;
      state.total = payload.total;
      state.newItemsFetching = false;
      state.newItemsFetched = true;
      state.ids = payload.ids.properties;
      state.collection = {
        ...state.collection,
        ...payload.collections.properties,
      };
    },
    setMapPropertyPoints: (
      state,
      { payload }: PayloadAction<SetMapPropertyPointsPayload>
    ) => {
      state.mapPropertyPoints = payload.ids.properties;
      state.collection = {
        ...state.collection,
        ...payload.collections.properties,
      };
    },
    setMapBubbledProperty: (
      state,
      { payload }: PayloadAction<number | null>
    ) => {
      state.mapBubbledProperty = payload;
    },
    setMapPoints: state => {
      state.mapPointsSet = true;
    },
    setMapSettings: (
      state,
      { payload }: PayloadAction<SetMapSettingsPayload>
    ) => {
      state.mapSettings.center = payload.center || state.mapSettings.center;
      state.mapSettings.zoom = payload.zoom || state.mapSettings.zoom;
    },
    setView: (state, { payload }: PayloadAction<View>) => {
      state.view = payload;
    },
    fetchItem(state, _: PayloadAction<number>) {
      state.fetchingItem = true;
    },
    fetchPinItem(state, _: PayloadAction<number>) {
      state.fetchingPinItem = true;
    },
    fetchItemSuccess(
      state,
      { payload }: PayloadAction<FetchItemSuccessPayload>
    ) {
      state.fetchingItem = false;
      state.fetchingPinItem = false;
      state.ids = concatUniq(state.ids, payload.ids.properties);
      state.collection = {
        ...state.collection,
        ...payload.collections.properties,
      };
    },
    fetchPinItemSuccess(
      state,
      { payload }: PayloadAction<FetchItemSuccessPayload>
    ) {
      state.pinItem = payload.collections.properties[payload.ids.properties[0]];
    },
    /* TODO Find a way to create one generic action for all type of setFilter actions */
    setTypeFilters(state, { payload }: PayloadAction<PropertyTypeFilters>) {
      state.newItemsFetched = false;
      state.filters.boolean.types = payload;
    },
    setStatusesFilters(state, { payload }: PayloadAction<StatusesFilters>) {
      state.newItemsFetched = false;
      state.filters.boolean.statuses = payload;
    },
    setTagsFilters(state, { payload }: PayloadAction<TagsFilters>) {
      state.newItemsFetched = false;
      state.filters.boolean.tags = payload;
    },
    setPerksFilters(state, { payload }: PayloadAction<PerksFilters>) {
      state.newItemsFetched = false;
      state.filters.boolean.perks = payload;
    },
    setRuleFilters(state, { payload }: PayloadAction<RuleFilters>) {
      state.newItemsFetched = false;
      state.filters.rules = {
        ...state.filters.rules,
        ...payload,
      };
    },
    toggleSorting(state, { payload }: PayloadAction<SortingField>) {
      state.sortings = {
        ..._mapValues(initialState.sortings, () => ({
          active: false,
          direction: 'ASC' as 'ASC' | 'DESC',
        })),
        [payload]: {
          active: true,
          direction:
            state.sortings[payload].direction === 'ASC' ? 'DESC' : 'ASC',
        },
      };
    },
    toggleToFavorites(state, { payload: id }: PayloadAction<number>) {
      if (!state.collection[id].favorite && state.collection[id].hidden) {
        state.collection[id].hidden = false;
      }

      state.collection[id].favorite = !state.collection[id].favorite;

      // if (state.paginationProperty.collections.properties[id]) {
      //   if (
      //     !state.paginationProperty.collections.properties[id].favorite &&
      //     state.paginationProperty.collections.properties[id].hidden
      //   ) {
      //     state.collection[id].hidden = false;
      //   }
      //
      //   state.paginationProperty.collections.properties[id].favorite = !state
      //     .paginationProperty.collections.properties[id].favorite;
      // }
    },
    /* TODO Temporary solution (consolidate all properties in one collection and link them by id ) */
    togglePinItemToFavorites(state, { payload: id }: PayloadAction<number>) {
      if (state.pinItem && state.pinItem.id === id) {
        state.pinItem.favorite = !state.pinItem.favorite;
      }

      if (state.collection[id]) {
        state.collection[id].favorite = !state.collection[id].favorite;
      }
    },
    toggleToHiddens(state, { payload: id }: PayloadAction<number>) {
      if (!state.collection[id].hidden && state.collection[id].favorite) {
        state.collection[id].favorite = false;
      }

      state.collection[id].hidden = !state.collection[id].hidden;

      // if (state.paginationProperty.collections.properties[id]) {
      //   if (
      //     !state.paginationProperty.collections.properties[id].hidden &&
      //     state.paginationProperty.collections.properties[id].favorite
      //   ) {
      //     state.collection[id].favorite = false;
      //   }
      //
      //   state.paginationProperty.collections.properties[id].favorite = !state
      //     .paginationProperty.collections.properties[id].hidden;
      // }
    },
    fetchMapPoints(state, { payload }: PayloadAction<Boundings>) {
      state.boundings = payload;
    },
    filterMapPoints(state) {
      state.mapPointsSet = false;
    },
    resetPinItem: state => {
      state.pinItem = null;
    },
    reset: state => ({
      ...initialState,
      page: state.page,
      pinItem: state.pinItem,
      filters: state.filters,
      fetchedTotal: state.fetchedTotal,
      mapBubbledProperty: state.mapBubbledProperty,
      mapSettings: state.mapSettings,
      view: state.view,
      collection: resetCollection(state),
    }),
    resetPropertiesList: state => {
      state.page = 0;
      state.ids = [];
      state.newItemsFetched = false;
      state.newItemsFetching = true;
      state.fetchedMoreItems = false;
      state.collection = resetCollection(state);
    },
    postShowingRequest(_, __: PayloadAction<ShowingPost>) {},
    getPropertiesMiles(
      _,
      __: PayloadAction<{
        radius: number;
        latitude: string;
        longitude: string;
        bedGt: number;
        bedLt: number;
        priceGt: string;
        priceLt: string;
      }>
    ) {},
    getPropertiesMilesSuccess(state, { payload }) {
      state.paginationProperty = payload;
    },
    getFavoritesProperties(
      _,
      __: PayloadAction<{
        page: number;
        perPage: number;
      }>
    ) {},
    setFavoritesProperties(state, { payload }) {
      state.userFavorites = payload;
    },
    setLoadFav(state, { payload }) {
      state.isLoadFav = payload;
    },
    setLoadSimilar(state, { payload }) {
      state.isLoadSimilar = payload;
    },
    getSimilarProperties(_, __) {},
    getPropertiesSimilarSuccess(state, { payload }) {
      state.paginationPropertySimilar = payload;
    },
    getFieldsDisabled(_, __: PayloadAction<string>) {},
    setFieldsDisabled(state, { payload }) {
      state.disabledPeriodFields = payload;
    },
  },
});

export const { actions } = propertiesSlice;

export default propertiesSlice.reducer;
