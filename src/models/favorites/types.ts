import { Property } from 'models/properties/types';

export interface FavoritesTypes {
  collection: CollectionType;
  ids: number[];
  fetchingCollection: boolean;
  query: string;
  statistics: {
    isReady: boolean;
    favorites: number;
    hidden: number;
    recent: number;
  };
}

export interface CollectionType {
  [key: number]: {
    property: Property;
  };
}

export enum ToolBar {
  favorites = 'Favorites',
  hidden = 'Hidden',
  recent = 'Recent',
}

export enum PropertyQueryTypes {
  house = 'house',
  condo = 'condo',
  townhome = 'townhome',
  lot = 'lot',
}
