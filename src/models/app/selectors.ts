import { createSelector } from 'reselect';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.app
);

export const mapLoadedSelector = createSelector(
  rootSelector,
  ({ mapLoaded }) => mapLoaded
);

export const modalOpenSelector = createSelector(
  rootSelector,
  ({ modalOpen }) => modalOpen
);

export const historySelector = createSelector(
  rootSelector,
  ({ history }) => history
);

export const routerSelector = createSelector(
  (state: RootState) => state,
  ({ router }) => router
);

export const locationSelector = createSelector(
  routerSelector,
  ({ location }) => location
);
