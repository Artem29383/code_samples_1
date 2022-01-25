import { createSelector } from 'reselect';

import { denormalize } from './schema';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.searches
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);

export const listSelector = createSelector(rootSelector, state =>
  denormalize(state.collection, state.ids)
);

export const fetchingListSelector = createSelector(
  rootSelector,
  state => state.fetchingList
);
