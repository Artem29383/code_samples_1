import { createSelector } from 'reselect';
import { RootState } from '@models';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.steps
);

export const dataSelector = createSelector(rootSelector, state => state.data);

export const addressSelector = createSelector(
  rootSelector,
  state => state.data.address
);

export const stepSelector = createSelector(rootSelector, state => state.step);

export const userSelector = createSelector(rootSelector, state => state.user);

export const loadSelector = createSelector(rootSelector, state => state.load);

export const requestSelector = createSelector(
  rootSelector,
  state => state.requestId
);
