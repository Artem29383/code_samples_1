import { createSelector } from 'reselect';

import { denormalize } from './schema';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.images
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);

export const listSelector = createSelector(rootSelector, state =>
  denormalize(state.collection, state.ids)
);

export type ImagesList = ReturnType<typeof listSelector>;
export type ImagesCollection = ReturnType<typeof collectionSelector>;
