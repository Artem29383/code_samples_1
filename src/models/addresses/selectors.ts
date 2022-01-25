import { createSelector } from 'reselect';

import { denormalize } from './schema';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.addresses
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);

export const listSelector = createSelector(rootSelector, state =>
  denormalize(state.collection, state.ids)
);

export const activeAddressSelector = createSelector(
  listSelector,
  list => list.find(item => item.active) || null
);
