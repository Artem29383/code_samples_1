import { Response } from 'express';
import { RouteConfig } from 'react-router-config';
import { AppConfig } from 'config/types';
import { PayloadAction } from '@reduxjs/toolkit';

export type SagasToRun = Array<
  [
    SagaWorker,
    (params: Record<string, string>) => Pick<PayloadAction<unknown>, 'payload'>
  ]
>;

export interface Route<S = {}> extends RouteConfig {
  cache: boolean;
  auth: boolean;
  path: string | string[];
  sagasToRun: SagasToRun;
  /* TODO type more properly */
  layout: 'default' | 'auth' | 'user' | 'settings' | 'common' | 'sell';
  title?: string;
  handleResponse?: (
    res: Response,
    state: S,
    params: PartialRecord<string, string>
  ) => void;
  config:
    | ((state: S, params: PartialRecord<string, string>) => Partial<AppConfig>)
    | Partial<AppConfig>;
}

export const Routes = {
  drawing: '/draw',
  ui: '/ui',
  home: '/',
  sell: '/sell',
  properties: '/properties',
  property: '/properties/:id',
  signUp: '/sign-up',
  createUser: '/sign-up/:token',
  signIn: '/sign-in',
  dashboard: '/dashboard',
  editProfile: '/edit-profile',
  contacts: '/contacts',
  termsConditions: '/terms-conditions',
  security: '/security',
  savedAddresses: '/saved-addresses',
  notifications: '/notifications',
  showings: '/showings',
  boards: '/boards',
  intro: '/intro',
  savedSearches: '/saved-searches',
  recoverPassword: '/recover-password',
  resetPassword: '/reset-password/:token',
  favorites: '/favorites',
  test: '/test',
} as const;

export enum Colors {
  lightBlack = '#1c1c23',
  disableColor = '#c0c4cc',
  gallery = '#ededed',
  burningOrange = '#ff7043',
  mineShaft = '#333333',
  white = '#ffffff',
  bordero = '#f0f2f6',
  dodgerBlue = '#3d9dff',
  grenly = '#68BF79',
  moonRaker = '#c6d7f4',
  malibu = '#6a8dff',
  bombay = '#acafb5',
  cornFlowerBlue = '#638cff',
  melrose = '#9392ff',
  alabaster = '#f8f8f8',
  dovGray = '#707070',
  shark = '#2c3033',
  mischka = '#d1d4db',
  catsKillWhite = '#e7ebf3',
  terracotta = '#e37364',
  argent = '#888888',
  emperor = '#555555',
  pickledBluewood = '#2c3e50',
  silverSand = '#c3c7cc',
  lightGray = '#eae6e6',
  mauve = '#c192ff',
  black = '#000000',
  tundora = '#444444',
  merlin = '#434240',
}

export enum Event {
  resetMarkersMap = 'resetMarkersMap',
  resetBubble = 'resetBubble',
  addMarkerToFavorites = 'addMarkerToFavorites',
  mapPointsSet = 'mapPointsSet',
  removeMarkerFromFavorites = 'removeMarkerFromFavorites',
  centerMap = 'centerMap',
  zoomMap = 'zoomMap',
  refreshPropertiesList = 'refreshPropertiesList',
  drawPinItem = 'drawPinItem',
  drawBubble = 'drawBubble',
  drawDistanceFrom = 'drawDistanceFrom',
  mapIdle = 'mapIdle',
  testEvent = 'testEvent',
  mapLoaded = 'mapLoaded',
  clustersFetched = 'clustersFetched',
  drawMarkers = 'drawMarkers',
  mapPointsFetched = 'mapPointsFetched',
  drawEditDone = 'drawEditDone',
  target = 'target',
}

export type ColorsStrings = keyof typeof Colors;

export enum PushTimings {
  showTimeout = 100,
  showDuration = 4000,
  slideInDuration = 500,
  fadeOutDuration = 500,
}

export enum Delays {
  commonRequestDelay = 1000,
  stubRequestDelay = 1000,
}

export enum FontTypes {
  affogatoBold = 'AffogatoBold',
  affogatoMedium = 'AffogatoMedium',
  bwGradualBold = 'BwGradualBold',
  bwGradualExtraBold = 'BwGradualExtraBold',
  liberGrotesqueBlack = 'LiberGrotesqueBlack',
  liberGrotesqueBold = 'LiberGrotesqueBold',
  liberGrotesqueExtraBold = 'LiberGrotesqueExtraBold',
  liberGrotesqueSemiBold = 'LiberGrotesqueSemiBold',
  liberGrotesqueRegular = 'LiberGrotesqueRegular',
  liberGrotesqueLight = 'LiberGrotesqueLight',
  liberGrotesqueNews = 'LiberGrotesqueNews',
}

export enum LayoutSizes {
  headerHeight = 70,
  footerHeight = 64,
  searchInputHeight = 50,
  searchInputTopOffset = 25,
  searchInputMarginBottom = 10,
}

export type FontTypesStrings = keyof typeof FontTypes;

export enum Icons {
  house = 'icon-house',
  townhome = 'icon-townhome',
  condo = 'icon-condo',
  lot = 'icon-lot',
  heartActive = 'icon-heart-active',
}

export type IconsStrings = keyof typeof Icons;

export type StyledComponentProps = {
  as?: string;
};

export type TextProps = {
  fontType?: FontTypesStrings;
  fontSize?: number | string;
  color?: ColorsStrings;
  lineHeight?: number | string;
  align?: 'left' | 'center' | 'right' | 'inherit';
  whiteSpace?: 'none' | 'nowrap';
  textTransform?: 'none' | 'lowercase' | 'uppercase';
  textDecoration?: string;
};

export type TranslateProps = {
  hor?: string;
  vert?: string;
};

export type PositionProps = {
  position?: 'relative' | 'absolute' | 'static' | 'fixed';
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
  center?: boolean;
  centerHor?: boolean;
  centerVert?: boolean;
  applyTransform?: boolean;
  zIndex?: number;
};

export type SizeProps = {
  width?: string | number;
  height?: string | number;
};

export type MarginProps = {
  marginTop?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  margin?:
    | [string | number, string | number, string | number, string | number]
    | [string | number, string | number, string | number]
    | [string | number, string | number];
};

export const animationMenu = {
  animationBackGround: 200,
  animationDashBoardMenu: 350,
  animationTimeout: 300,
};
