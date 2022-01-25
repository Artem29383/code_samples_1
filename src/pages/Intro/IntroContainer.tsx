import React from 'react';

import Intro from './Intro';

import { useAction, useActionWithPayload } from 'hooks/useAction';
import { actions as propertiesActions } from 'models/properties';
import { actions as searchActions } from 'models/searches';
import { filtersSelector } from 'models/properties/selectors';
import { mapLoadedSelector } from 'models/app/selectors';
import { useSelector } from 'hooks/useSelector';

const IntroContainer = () => {
  const setTypeFilters = useActionWithPayload(propertiesActions.setTypeFilters);
  const setRuleFilters = useActionWithPayload(propertiesActions.setRuleFilters);
  const saveSearch = useAction(searchActions.saveIntroSearch);

  const filters = useSelector(filtersSelector);
  const mapLoaded = useSelector(mapLoadedSelector);

  return (
    <Intro
      filters={filters}
      mapLoaded={mapLoaded}
      onSave={saveSearch}
      onSetTypeFilters={setTypeFilters}
      onSetRuleFilters={setRuleFilters}
    />
  );
};

export default IntroContainer;
