import { MutableRefObject } from 'react';
import { LayoutProps } from 'styled-system';

import { actions } from 'models/properties';
import {
  mapBubbledPropertySelector,
  mapSettingsSelector,
  getPropertyItem,
} from 'models/properties/selectors';

export type PropertyPoint = Omit<
  ReturnType<typeof getPropertyItem>,
  'position'
> & {
  position: [number, number];
};

export type Props = {
  onToggleToFavorites: (payload: number) => void;
  onSetMapSettings: ActionType<typeof actions.setMapSettings>;
  onPointClick: (payload: number) => void;
  mapLoaded: boolean;
  bubbledProperty: ReturnType<typeof mapBubbledPropertySelector>;
  onSetMapBubbledProperty: ActionType<typeof actions.setMapBubbledProperty>;
  mapSettings: ReturnType<typeof mapSettingsSelector>;
  mapRef: MutableRefObject<google.maps.Map | null>;
  loadingBar: { show: boolean; offset: number };
} & LayoutProps;
