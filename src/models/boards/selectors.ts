import { createSelector } from 'reselect';
import _sortBy from 'lodash/sortBy';

import { denormalize } from './schema';
import { RootState } from '../index';
import { collectionSelector as imagesCollectionSelector } from 'models/images/selectors';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.boards
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);

export const boardSelector = createSelector(rootSelector, state => state.board);

export const listSelector = createSelector(
  rootSelector,
  imagesCollectionSelector,
  (state, imagesCollection) =>
    _sortBy(
      denormalize(state.collection, imagesCollection, state.ids),
      item => !item.default
    )
);

export const itemSelector = createSelector(
  collectionSelector,
  imagesCollectionSelector,
  // @ts-ignore
  (_, id: number) => id,
  (boardsCollection, imagesCollection, id) =>
    denormalize(boardsCollection, imagesCollection, [id])[0]
);

export const fetchingCollectionSelector = createSelector(
  rootSelector,
  state => state.fetchingCollection
);

export type BoardsList = ReturnType<typeof listSelector>;
export type BoardItem = ReturnType<typeof itemSelector>;
