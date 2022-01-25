/* eslint-disable no-underscore-dangle */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Event } from '@types';

import { actions } from 'models/app';
import { useSelector } from 'hooks/useSelector';
import { mapLoadedSelector } from 'models/app/selectors';

import EventEmitter from 'utils/eventEmitter';

export default () => {
  const dispatch = useDispatch();
  const mapLoaded = useSelector(mapLoadedSelector);

  useEffect(() => {
    if (!mapLoaded) {
      const interval = setInterval(() => {
        if (window.__MAP_LOADED__) {
          clearInterval(interval);
          dispatch(actions.mapLoaded());
          EventEmitter.emit(Event.mapLoaded);
        }
      }, 100);
    }
  }, [dispatch, mapLoaded]);
};
