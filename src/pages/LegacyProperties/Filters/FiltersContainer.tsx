import React from 'react';

import { CommonProps } from './types';

import Filters from './Filters';

import { useActionWithPayload } from 'hooks/useAction';
import { actions as propertiesActions } from 'models/properties';
import { actions as searchesActions } from 'models/searches';
import { filtersSelector } from 'models/properties/selectors';
import { useSelector } from 'hooks/useSelector';

const FiltersContainer = (props: CommonProps) => {
  const filters = useSelector(filtersSelector);
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

  return (
    <Filters
      filters={filters}
      onSetPerksFilters={setPerksFilters}
      onSetTypeFilters={setTypeFilters}
      onSetRuleFilters={setRuleFilters}
      onSetStatusesFilters={setStatusesFilters}
      onSetTagsFilters={setTagsFilters}
      onSaveSearch={saveSearch}
      {...props}
    />
  );
};

export default FiltersContainer;
