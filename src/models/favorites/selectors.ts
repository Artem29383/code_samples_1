import { createSelector } from 'reselect';
import { RootState } from '@models';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.favorites
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);

export const querySelector = createSelector(rootSelector, state => state.query);

export const idsSelector = createSelector(rootSelector, state => state.ids);

export const fetchingSelector = createSelector(
  rootSelector,
  state => state.fetchingCollection
);

export const statisticsSelector = createSelector(
  rootSelector,
  state => state.statistics
);
