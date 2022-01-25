import { createSelector } from 'reselect';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.pushes
);

export const pushesSelector = createSelector(
  rootSelector,
  ({ collection, ids }) => ids.map(id => collection[id])
);
