import { createSelector } from 'reselect';
import { RootState } from '@models';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.requests
);

export const groupToursSelector = createSelector(
  rootSelector,
  state => state.groupTours
);

export const toursCurrentDateSelector = createSelector(
  rootSelector,
  state => state.requests
);

export const loadSelector = createSelector(rootSelector, state => state.isLoad);
