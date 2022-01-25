import React from 'react';
import { useHistory } from 'react-router-dom';

import { CommonProps } from './types';
import { Routes } from '@types';

import Filters from './Filters';

import { useAction, useActionWithPayload } from 'hooks/useAction';
import { actions as propertiesActions } from 'models/properties';
import { actions as searchesActions } from 'models/searches';
import { filtersSelector } from 'models/properties/selectors';
import { useSelector } from 'hooks/useSelector';

const FiltersContainer = (props: CommonProps) => {
  const filters = useSelector(filtersSelector);
  const history = useHistory();
  const setTypeFilters = useActionWithPayload(propertiesActions.setTypeFilters);
  const setTagsFilters = useActionWithPayload(propertiesActions.setTagsFilters);
  const setStatusesFilters = useActionWithPayload(
    propertiesActions.setStatusesFilters
  );
  const setPerksFilters = useActionWithPayload(
    propertiesActions.setPerksFilters
  );
  const setRuleFilters = useActionWithPayload(propertiesActions.setRuleFilters);
  const saveSearch = useActionWithPayload(searchesActions.saveUserSearch);
  const resetFilters = useAction(propertiesActions.resetFilters);

  const handleReset = () => {
    history.push(Routes.properties);
    resetFilters();
  };

  return (
    <Filters
      filters={filters}
      onSetPerksFilters={setPerksFilters}
      onSetTypeFilters={setTypeFilters}
      onSetRuleFilters={setRuleFilters}
      onSetStatusesFilters={setStatusesFilters}
      onSetTagsFilters={setTagsFilters}
      onSaveSearch={saveSearch}
      onResetFilters={handleReset}
      {...props}
    />
  );
};

export default FiltersContainer;
