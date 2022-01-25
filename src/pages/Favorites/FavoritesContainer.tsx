/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Routes } from '@types';
import { PropertyQueryTypes, ToolBar } from 'models/favorites/types';

import { actions } from 'models/favorites';
import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import {
  collectionSelector,
  fetchingSelector,
  idsSelector,
} from 'models/favorites/selectors';

import Favorites from 'pages/Favorites/Favorites';

import useWindowResize from 'hooks/useWindowResize';

import { parseQuery } from 'utils/parseQuery';

const FavoritesContainer = () => {
  const history = useHistory();
  const [propertyTypes, setPropertyTypes] = useState<ToolBar | string | null>(
    null
  );
  const handleFilterChange = useActionWithPayload(actions.filterChange);
  const { width: windowWidth } = useWindowResize();
  const collection = useSelector(collectionSelector);
  const ids = useSelector(idsSelector);
  const isLoad = useSelector(fetchingSelector);

  const isExistType = useCallback(
    (types: any, type: string, defaultValue: string): string => {
      const SET = new Set(Object.keys(types));
      const isExist = type && SET.has(type.toLowerCase());
      return isExist ? type : defaultValue;
    },
    []
  );

  useEffect(() => {
    const { q, propertyType } = parseQuery(history.location.search);
    if (propertyTypes === null) {
      handleFilterChange({
        query: isExistType(PropertyQueryTypes, propertyType, ''),
        propertyTypes: isExistType(ToolBar, q, ToolBar.favorites),
      });
      setPropertyTypes(isExistType(ToolBar, q, ToolBar.favorites));
    } else {
      handleFilterChange({
        query: isExistType(PropertyQueryTypes, propertyType, ''),
        propertyTypes,
      });
    }
  }, [propertyTypes, handleFilterChange, isExistType]);

  const handleChangePropertyTypes = useCallback(
    type => {
      setPropertyTypes(type);
    },
    [setPropertyTypes]
  );

  const handleRedirectIntoFav = useCallback(
    id => {
      history.push(`${Routes.properties}/${id}`);
    },
    [history]
  );

  return (
    <Favorites
      isLoad={isLoad}
      collection={collection}
      ids={ids}
      propertyTypes={propertyTypes as string}
      windowWidth={windowWidth}
      onChangePropertyTypes={handleChangePropertyTypes}
      onRedirect={handleRedirectIntoFav}
    />
  );
};

export default FavoritesContainer;
