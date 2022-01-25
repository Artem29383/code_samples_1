import React, { useCallback, useEffect } from 'react';

import { Search } from 'models/searches/types';

import { actions as searchesActions } from 'models/searches';
import { actions as propertiesActions } from 'models/properties';
import { actions as userActions } from 'models/user';
import { listSelector as addressesListSelector } from 'models/addresses/selectors';
import {
  listSelector as searchesListSelector,
  fetchingListSelector as fetchingSearchesListSelector,
} from 'models/searches/selectors';

import { useAction, useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';

import SavedSearches from './SavedSearches';

const SavedSearchesContainer = () => {
  const fetchSearhcesList = useAction(searchesActions.fetchSearchesList);
  const toggleUserAddressActive = useActionWithPayload(
    userActions.toggleUserAddressActive
  );
  const deleteSearch = useActionWithPayload(searchesActions.deleteSearch);
  const setTypeFilters = useActionWithPayload(propertiesActions.setTypeFilters);
  const setRuleFilters = useActionWithPayload(propertiesActions.setRuleFilters);
  const setPerksFilters = useActionWithPayload(
    propertiesActions.setPerksFilters
  );

  const fetchingSearchesList = useSelector(fetchingSearchesListSelector);
  const searchesList = useSelector(searchesListSelector);
  const addressesList = useSelector(addressesListSelector);

  useEffect(() => {
    fetchSearhcesList();
  }, [fetchSearhcesList]);

  const handleLaunchSearch = useCallback(
    (search: Search) => {
      setTypeFilters(search.query.boolean.types);
      setPerksFilters(search.query.boolean.perks);
      setRuleFilters(search.query.rules);

      if (search.address) {
        const address = addressesList.find(
          item =>
            item.location[0] === search.address!.location[0] &&
            item.location[1] === search.address!.location[1]
        );

        if (address && !address.active) {
          toggleUserAddressActive(address.id);
        }
      }
    },
    [
      setTypeFilters,
      setPerksFilters,
      setRuleFilters,
      addressesList,
      toggleUserAddressActive,
    ]
  );

  return (
    <SavedSearches
      list={searchesList}
      fetching={fetchingSearchesList}
      onDelete={deleteSearch}
      onLaunchSearch={handleLaunchSearch}
    />
  );
};

export default SavedSearchesContainer;
