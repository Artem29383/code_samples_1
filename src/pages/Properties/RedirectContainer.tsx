import React from 'react';
import { Redirect } from 'react-router-dom';

import { Routes } from '@types';

import { filtersSelector } from 'models/properties/selectors';
import { activeAddressSelector } from 'models/addresses/selectors';

import { useSelector } from 'hooks/useSelector';
import { addFiltersToUrlQuery, addLocationToUrlQuery } from 'utils/filters';
import history from 'utils/history';

import Properties from './PropertiesContainer';

const RedirectContainer = () => {
  const query = new URLSearchParams(history.location.search);

  const filters = useSelector(filtersSelector);
  const activeAddress = useSelector(activeAddressSelector);

  if (query.get('q') !== 'set') {
    query.set('q', 'set');
    const queryWithFilters = addFiltersToUrlQuery(query, filters);

    if (query.getAll('center').length === 0) {
      return (
        <Redirect
          to={`${Routes.properties}/?${
            activeAddress
              ? addLocationToUrlQuery(queryWithFilters, activeAddress.location)
              : queryWithFilters
          }`}
        />
      );
    }

    return <Redirect to={`${Routes.properties}/?${queryWithFilters}`} />;
  }

  return <Properties filters={filters} activeAddress={activeAddress} />;
};

export default RedirectContainer;
