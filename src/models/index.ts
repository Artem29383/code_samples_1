import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import pushesReducer from './pushes';
import appReducer from './app';
import propertiesReducer from './properties';
import boardsReducer from './boards';
import imagesReducer from './images';
import requestReducer from './requests';
import addressesReducer from './addresses';
import searchesReducer from './searches';
import favoritesReducer from './favorites';
import stepsReducer from './steps';

import history from '../utils/history';

export const rootReducer = combineReducers({
  app: appReducer,
  router: connectRouter(history),
  user: userReducer,
  pushes: pushesReducer,
  properties: propertiesReducer,
  boards: boardsReducer,
  images: imagesReducer,
  requests: requestReducer,
  addresses: addressesReducer,
  searches: searchesReducer,
  favorites: favoritesReducer,
  steps: stepsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
