import React, { useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';

import { CommonProps } from './types';
import { View } from 'models/properties/types';

import { actions as propertiesActions } from 'models/properties';
import { actions as actionsPush } from 'models/pushes';
import { authorizedSelector } from 'models/user/selectors';
import {
  listSelector,
  fetchingSelector,
  totalSelector,
  sortingsSelector,
  mapPointsSetSelector,
  mapSettingsSelector,
  pinItemSelector,
  viewSelector,
  mapBubbledPropertySelector,
} from 'models/properties/selectors';
import { mapLoadedSelector, modalOpenSelector } from 'models/app/selectors';
import { useActionWithPayload, useAction } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';

import Properties from './Properties';

const PropertiesContainer = (props: CommonProps) => {
  const fetchByBoundings = useActionWithPayload(
    propertiesActions.fetchByBoundings
  );
  const toggleToFavorites = useActionWithPayload(
    propertiesActions.toggleToFavorites
  );
  const toggleSorting = useActionWithPayload(propertiesActions.toggleSorting);
  const fetchMoreItems = useActionWithPayload(propertiesActions.fetchMoreItems);
  const filterMapPoints = useAction(propertiesActions.filterMapPoints);
  const fetchMapPoints = useActionWithPayload(propertiesActions.fetchMapPoints);
  const fetchPinItem = useActionWithPayload(propertiesActions.fetchPinItem);
  const setMapSettings = useActionWithPayload(propertiesActions.setMapSettings);
  const resetPropertiesList = useAction(propertiesActions.resetPropertiesList);
  const reset = useAction(propertiesActions.reset);
  const current = useSelector(authorizedSelector);
  const setView = useActionWithPayload(propertiesActions.setView);
  const setMapBubbledProperty = useActionWithPayload(
    propertiesActions.setMapBubbledProperty
  );

  const list = useSelector(listSelector);
  const modalOpen = useSelector(modalOpenSelector);
  const fetching = useSelector(fetchingSelector);
  const total = useSelector(totalSelector);
  const sortings = useSelector(sortingsSelector);
  const mapPointsSet = useSelector(mapPointsSetSelector);
  const mapLoaded = useSelector(mapLoadedSelector);
  const mapSettings = useSelector(mapSettingsSelector);
  const pinItem = useSelector(pinItemSelector);
  const view = useSelector(viewSelector);
  const mapBubbledProperty = useSelector(mapBubbledPropertySelector);
  const addPush = useActionWithPayload(actionsPush.addPush);

  const onSetView = (viewString: View) => {
    if (current === null) {
      addPush({
        id: uniqueId('info'),
        type: 'error',
        title: 'Fail',
        message: `You need to login`,
      });
      return;
    }
    setView(viewString);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Properties
      list={list}
      pinItem={pinItem}
      sortings={sortings}
      total={total}
      modalOpen={modalOpen}
      onFetchByBoundings={fetchByBoundings}
      onFetchPinItem={fetchPinItem}
      onResetPropertiesList={resetPropertiesList}
      onFilterMapPoints={filterMapPoints}
      onFetchMoreItems={fetchMoreItems}
      onFetchMapPoints={fetchMapPoints}
      onToggleSorting={toggleSorting}
      onToggleToFavorites={toggleToFavorites}
      onSetMapSettings={setMapSettings}
      onSetMapBubbledProperty={setMapBubbledProperty}
      onSetView={onSetView}
      mapPointsSet={mapPointsSet}
      mapLoaded={mapLoaded}
      mapSettings={mapSettings}
      mapBubbledProperty={mapBubbledProperty}
      view={view}
      {...props}
      {...fetching}
    />
  );
};

export default PropertiesContainer;
