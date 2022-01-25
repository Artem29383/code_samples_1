import { rootBoxShadowSize } from './PropertiesList/PropertiesList.styled';
import { filterButtonSize } from './FilterButton/FilterButton.styled';

import {
  ViewsVariants,
  ViewsTransitions,
  commonTransitionSettings,
  viewListItemsSize,
  halfListWidth,
} from './types';
import { View } from 'models/properties/types';

import history from 'utils/history';

import { Viewport } from 'styles/media';

export const setViewQuery = (view: View) => {
  const query = new URLSearchParams(history.location.search);
  query.delete('v');
  query.set('v', view);

  history.replace(`${history.location.pathname}?${query}`);
};

export const getViewVariant = (view: View, viewsVariants: ViewsVariants) =>
  viewsVariants[view] || viewsVariants.default;

export const getViewTransition = (
  view: View,
  viewsTransitions: ViewsTransitions
) => viewsTransitions[view] || commonTransitionSettings;

export const getItemSize = (view: View) => viewListItemsSize[view] || 'small';

export const getListClosedVariant = (
  view: View,
  windowWidth: number,
  windowHeight: number,
  prevView?: View
) => {
  if (prevView === 'list-filters' && view === 'map') {
    return { x: windowWidth };
  }

  if (prevView === 'list' && view === 'map') {
    return { y: windowHeight };
  }

  return { x: -(halfListWidth + rootBoxShadowSize) };
};

export const filtersVariants = {
  open: { x: 0 },
  closed: { x: `calc(-100% - ${filterButtonSize / 2}px)` },
  swipeUp: {
    x: 0,
    y: '-40%',
  },
  swipeDown: {
    x: 0,
    y: '0',
  },
};

export const getFiltersVariants = (windowWidth: number) => {
  if (windowWidth <= Viewport.tablet) {
    return {
      open: { x: 0 },
      closed: { x: `calc(-100% - ${filterButtonSize / 2}px)` },
    };
  }

  return {
    open: { x: 0 },
    closed: { x: `calc(-100% - ${filterButtonSize / 2}px)` },
  };
};

export const isView = (view: View, ...views: View[]) =>
  views.some(v => v === view);
