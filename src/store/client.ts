/* eslint-disable no-underscore-dangle */

import _omit from 'lodash/omit';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from 'models/index';
import { initialState as propertiesInitialState } from 'models/properties';

export const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
  reducer: rootReducer,
  preloadedState: {
    ..._omit(window.__INITIAL_STATE__, 'router'),
    properties:
      process.env.APP_ENV !== 'development'
        ? {
            ...propertiesInitialState,
            collection: window.__INITIAL_STATE__.properties.collection,
            ids: window.__INITIAL_STATE__.properties.ids,
          }
        : propertiesInitialState,
    app: {
      ...window.__INITIAL_STATE__.app,
      mapLoaded: window.__MAP_LOADED__ || false,
      history: [],
    },
  },
});
