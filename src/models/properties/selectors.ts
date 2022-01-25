import { createSelector } from 'reselect';
import _pick from 'lodash/pick';
import _sortBy from 'lodash/sortBy';

import {
  SortingField,
  Property,
  PropertyType,
  Fee,
  Rule,
  RuleValue,
  RuleValuesPair,
  minMaxRuleValues,
  RuleFilters,
} from './types';
import {
  collectionSelector as imagesCollectionSelector,
  ImagesCollection,
} from '../images/selectors';
import { RootState } from '../index';

import convertFeeToMonthlyFrequency from 'utils/convertFeeToMonthlyFrequency';
import { commonValueFormat } from 'utils/format';

const getConvertedToMonthlyFrequencyFee = (item: Fee | null) =>
  item ? convertFeeToMonthlyFrequency(item.value || 0, item.frequency) : 0;

const getFormattedSquarePerFeetPrice = (item: Property) => {
  if (item.propertyType === 'lot') {
    return item.lotSizeSquareFeet
      ? commonValueFormat(item.listPrice / item.lotSizeSquareFeet, Math.round)
      : '-';
  }

  return item.livingSquareFeet
    ? commonValueFormat(item.listPrice / item.livingSquareFeet, Math.round)
    : '-';
};

export const getPropertyItem = (
  item: Property,
  imagesCollection: ImagesCollection
) => {
  const monthlyFee =
    getConvertedToMonthlyFrequencyFee(item.masterPlanFee) +
    getConvertedToMonthlyFrequencyFee(item.hoaFee) +
    getConvertedToMonthlyFrequencyFee(item.hoaFee2);

  return {
    ...item,
    // @ts-ignore
    propertyType: item.propertyType as PropertyType,
    address: item.address.replace(/,/g, ', '),
    fullAddress: item.fullAddress,
    homePerks: item.homePerks,
    communityPerks: item.communityPerks,
    listPrice: commonValueFormat(item.listPrice),
    monthlyFee,
    formattedMonthlyFee: commonValueFormat(monthlyFee),
    formattedLotSizeSquareFeet: item.lotSizeSquareFeet
      ? commonValueFormat(item.lotSizeSquareFeet)
      : null,
    formattedLivingSquareFeet: item.livingSquareFeet
      ? commonValueFormat(item.livingSquareFeet)
      : null,
    formattedSquarePerFeetPrice: getFormattedSquarePerFeetPrice(item),
    images: _sortBy(
      Object.values(_pick(imagesCollection, item.images) as ImagesCollection),
      'position'
    ),
  };
};

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.properties
);

export const mapSettingsSelector = createSelector(
  rootSelector,
  state => state.mapSettings
);

export const viewSelector = createSelector(rootSelector, state => state.view);

export const listSelector = createSelector(
  rootSelector,
  imagesCollectionSelector,
  (state, images) =>
    state.ids.map(id => {
      if (typeof id !== 'number') {
        return 'mock';
      }

      return getPropertyItem(state.collection[id], images);
    })
);

export const countItemsSelector = createSelector(
  rootSelector,
  state => state.ids.length
);

export const itemSelector = createSelector(
  rootSelector,
  imagesCollectionSelector,
  // @ts-ignore
  (_, id: number) => id,
  (state, images, id) => {
    if (state.collection[id]) {
      return getPropertyItem(state.collection[id], images);
    }

    return null;
  }
);

export const pinItemSelector = createSelector(
  rootSelector,
  imagesCollectionSelector,
  (state, images) =>
    state.pinItem ? getPropertyItem(state.pinItem, images) : null
);

export const mapBubbledPropertySelector = createSelector(
  rootSelector,
  imagesCollectionSelector,
  (state, images) =>
    state.mapBubbledProperty
      ? getPropertyItem(state.collection[state.mapBubbledProperty], images)
      : null
);

export const pageSelector = createSelector(rootSelector, state => state.page);

export const perPageSelector = createSelector(
  rootSelector,
  state => state.perPage
);

export const boundingsSelector = createSelector(
  rootSelector,
  state => state.boundings
);

export const areasSelector = createSelector(rootSelector, state => state.areas);

export const distanceFromSelector = createSelector(
  rootSelector,
  state => state.distanceFrom
);

export const totalSelector = createSelector(rootSelector, state => state.total);

export const fetchingSelector = createSelector(
  rootSelector,
  ({ fetchedMoreItems, fetchingItem, newItemsFetched, newItemsFetching }) => ({
    fetchedMoreItems,
    newItemsFetching,
    newItemsFetched,
    fetchingItem,
  })
);

export const mapPointsSetSelector = createSelector(
  rootSelector,
  ({ mapPointsSet }) => mapPointsSet
);

export const filtersSelector = createSelector(
  rootSelector,
  ({ filters }) => filters
);

export const processedFiltersSelector = createSelector(
  filtersSelector,
  filters => ({
    ...filters,
    rules: (Object.keys(filters.rules) as Rule[]).reduce((acc, key) => {
      const valueItem = filters.rules[key];
      if (Array.isArray(valueItem)) {
        if (
          valueItem[0].value === minMaxRuleValues[key][0] &&
          valueItem[1].value === minMaxRuleValues[key][1]
        ) {
          return {
            ...acc,
            [key]: { rule: 'gteq', value: 0 } as RuleValue,
          };
        }

        if (valueItem[0].value === minMaxRuleValues[key][0]) {
          return {
            ...acc,
            [key]: [
              { rule: 'gteq', value: 0 },
              { rule: valueItem[1].rule, value: valueItem[1].value },
            ] as RuleValuesPair,
          };
        }

        if (valueItem[1].value === minMaxRuleValues[key][1]) {
          return {
            ...acc,
            [key]: { rule: 'gteq', value: valueItem[0].value } as RuleValue,
          };
        }
      }

      if (
        key === 'daysOnMarket' &&
        !Array.isArray(valueItem) &&
        valueItem.value === minMaxRuleValues.daysOnMarket[1]
      ) {
        return {
          ...acc,
          [key]: { rule: 'gteq', value: 0 } as RuleValue,
        };
      }

      return {
        ...acc,
        [key]: filters.rules[key],
      };
    }, {}) as RuleFilters,
  })
);

export const sortingsSelector = createSelector(rootSelector, ({ sortings }) =>
  (Object.keys(sortings) as SortingField[]).map(key => ({
    field: key,
    direction: sortings[key].direction,
    active: sortings[key].active,
  }))
);

export const activeSortingSelector = createSelector(
  sortingsSelector,
  items => items.find(({ active }) => active)!
);

export const paginationPropertySelector = createSelector(
  rootSelector,
  (_: any, id: string) => id,
  (state, id) => {
    const ids = state.paginationProperty.ids.properties.filter(
      pId => pId !== Number(id)
    );

    return {
      ...state.paginationProperty,
      ids: {
        ...state.paginationProperty.ids,
        properties: [...ids],
      },
    };
  }
);

export const similarPropertySelector = createSelector(
  rootSelector,
  (_: any, id: string) => id,
  (state, id) => {
    const ids = state.paginationPropertySimilar.ids.properties.filter(
      pId => pId !== Number(id)
    );

    return {
      ...state.paginationPropertySimilar,
      ids: {
        ...state.paginationPropertySimilar.ids,
        properties: [...ids],
      },
    };
  }
);

export const userFavoritesSelector = createSelector(
  rootSelector,
  state => state.userFavorites
);

export const favLoadSelector = createSelector(
  rootSelector,
  state => state.isLoadFav
);

export const fetchedTotalSelector = createSelector(
  rootSelector,
  state => state.fetchedTotal
);

export const clustersSelector = createSelector(
  rootSelector,
  state => state.clusters
);

export const disabledFieldsSelector = createSelector(
  rootSelector,
  state => state.disabledPeriodFields
);

export type ActiveSorting = ReturnType<typeof activeSortingSelector>;

export type PropertyItem = ReturnType<typeof itemSelector>;

export type PinItem = ReturnType<typeof pinItemSelector>;

export type Sortings = ReturnType<typeof sortingsSelector>;

export type PropertiesList = ReturnType<typeof listSelector>;
