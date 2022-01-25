import { Transition } from 'framer-motion';
import { ItemSize } from './PropertiesList/Item/Item';
import { Filters, View } from 'models/properties/types';
import { activeAddressSelector } from 'models/addresses/selectors';

export type CommonProps = {
  filters: Filters;
  activeAddress: ReturnType<typeof activeAddressSelector>;
};

export type ViewsVariants = PartialRecord<View | 'default', string>;
export type ViewsTransitions = PartialRecord<View, Transition>;

export const commonTransitionSettings = { ease: 'easeOut', duration: 0.5 };
export const buttonsTransitionSettings = { ease: 'linear', duration: 0.3 };
export const halfListWidth = 788;

export const visibilityVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const listViewsVariants: ViewsVariants = {
  'to-map-list': 'open',
  'map-list': 'open',
  'to-list-filters': 'half',
  'list-filters': 'half',
  'to-list': 'full',
  list: 'full',
  'map-cycle': 'open-cycle',
  default: 'closed',
};

export const listViewsTransitions: ViewsTransitions = {
  map: { ease: 'easeIn', duration: 0.6 },
  'map-list-to-map': { ...commonTransitionSettings, delay: 0.2 },
  'to-list': { ...commonTransitionSettings, duration: 0.4 },
  'map-cycle': { duration: 0 },
  'to-list-filters': {
    ...commonTransitionSettings,
    delay: commonTransitionSettings.duration,
  },
};

export const mapViewsTransitions: ViewsTransitions = {
  'to-map-list': {
    ...commonTransitionSettings,
    delay: commonTransitionSettings.duration,
  },
  'to-list-filters': {
    ...commonTransitionSettings,
    duration: 0,
    delay: commonTransitionSettings.duration * 2,
  },
};

export const filtersViewsTransitions: ViewsTransitions = {
  'to-list': {
    ...commonTransitionSettings,
    delay: commonTransitionSettings.duration + 0.2,
  },
};

export const mapViewsVariants: ViewsVariants = {
  'map-list': 'half',
  'to-map-list': 'half',
  default: 'full',
};

export const buttonsViewVariants: ViewsVariants = {
  map: 'visible',
  'map-cycle': 'visible',
  'map-list-to-map': 'visible',
  default: 'hidden',
};

export const filtersViewVariants: ViewsVariants = {
  'map-filters': 'open',
  'list-filters': 'open',
  'to-list-filters': 'open',
  default: 'closed',
};

export const viewListItemsSize: PartialRecord<View, ItemSize> = {
  'map-list': 'default',
  'map-list-to-map': 'default',
  'to-list-filters': 'default',
  'list-filters': 'big',
  'to-list': 'big',
  /* TODO Change to large */
  list: 'big',
  map: 'big',
};
