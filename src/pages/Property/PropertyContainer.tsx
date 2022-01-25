import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import uniqueId from 'lodash/uniqueId';

import { actions as propertiesActions, actions } from 'models/properties';
import { historySelector } from 'models/app/selectors';
import { actions as actionsPush } from 'models/pushes';
import { itemSelector, fetchingSelector } from 'models/properties/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { useParametricSelector, useSelector } from 'hooks/useSelector';

import Property from 'pages/Property/Property';
import NotFound from 'pages/NotFound';

import useWindowResize from 'hooks/useWindowResize';
import useToggle from 'hooks/useToggle';
import useClickAway from 'hooks/useClickAway';

const PropertyContainer = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { width: windowWidth, height: windowHeight } = useWindowResize();
  const $showings = useRef<HTMLDivElement>(null);
  const addPush = useActionWithPayload(actionsPush.addPush);
  const [seeDetail, setSeeDetail] = useToggle(false);
  const { active, ref, toggle } = useClickAway(false);

  const history = useSelector(historySelector);

  const fetchItem = useActionWithPayload(actions.fetchItem);
  const toggleToFavorites = useActionWithPayload(
    propertiesActions.toggleToFavorites
  );
  const toggleToHiddens = useActionWithPayload(
    propertiesActions.toggleToHiddens
  );

  const { fetchingItem } = useSelector(fetchingSelector);
  const item = useParametricSelector(itemSelector, id);

  useEffect(() => {
    fetchItem(id);
  }, [fetchItem, id, history]);

  const handleScrollToShowings = useCallback(() => {
    if ($showings.current) {
      $showings.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleCopy = useCallback(() => {
    const location = `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.search}`;
    navigator.clipboard.writeText(location);
    addPush({
      id: uniqueId('info'),
      type: 'info',
      title: 'Success',
      message: 'Url address has been saved in your buffer',
    });
  }, [addPush]);

  if (process.env.APP_ENV !== 'development' && !item && history.length === 1) {
    return <NotFound />;
  }

  return (
    <Property
      idProp={id}
      isShare={active}
      setShare={toggle}
      referenceDrop={ref}
      fetching={fetchingItem}
      item={item}
      onToggleToFavorites={toggleToFavorites}
      onToggleToHiddens={toggleToHiddens}
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      reference={$showings}
      onScroll={handleScrollToShowings}
      onToggleDetail={setSeeDetail}
      onCopy={handleCopy}
      isSeeDetail={seeDetail}
    />
  );
};

export default PropertyContainer;
