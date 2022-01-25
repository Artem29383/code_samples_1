import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '@models';

export const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  reducer: rootReducer,
});
