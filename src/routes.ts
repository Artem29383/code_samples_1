import { Route, Routes } from './types';

import { RootState } from '@models';

import UI from 'pages/UI';
import Properties from 'pages/Properties';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import CreateUser from 'pages/CreateUser';
import EditProfile from 'pages/EditProfile';
import Intro from 'pages/Intro';
import Dashboard from 'pages/Dashboard';
import RecoverPassword from 'pages/RecoverPassword';
import ResetPassword from 'pages/ResetPassword';

import Security from 'pages/Security';
import Showings from 'pages/Showings';
import ShowingsInside from 'pages/ShowingsInside';
import Boards from 'pages/Boards';
import Board from 'pages/Board';
import SavedSearches from 'pages/SavedSearches';
import Notifications from 'pages/Notifications';
import Favorites from 'pages/Favorites';
import Sell from 'pages/Sell';

import property from 'routes/property';
import MapDrawing from 'pages/MapDrawing';
import Test from 'pages/Test';

export const routes: Route<RootState>[] = [
  {
    path: Routes.ui,
    exact: true,
    component: UI,
    cache: false,
    auth: true,
    layout: 'default',
    title: 'UI',
    sagasToRun: [],
    config: {},
  },
  {
    path: [Routes.properties, Routes.home],
    exact: true,
    component: Properties,
    cache: false,
    auth: false,
    layout: 'default',
    title: 'Buy',
    sagasToRun: [],
    config: {},
  },
  {
    ...property,
  },
  {
    path: Routes.signUp,
    exact: true,
    component: SignUp,
    cache: false,
    auth: false,
    layout: 'auth',
    title: 'Sign Up',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.createUser,
    exact: true,
    component: CreateUser,
    cache: false,
    auth: false,
    layout: 'auth',
    title: 'Sign Up',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.signIn,
    exact: true,
    component: SignIn,
    cache: false,
    auth: false,
    layout: 'auth',
    title: 'Sign In',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.dashboard,
    component: Dashboard,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    layoutMobile: 'default',
    title: 'Dashboard',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.showings,
    component: Showings,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Showings',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.boards,
    component: Boards,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Boards',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.favorites,
    component: Favorites,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Favorites',
    sagasToRun: [],
    config: {},
  },
  {
    path: `${Routes.boards}/:boardId`,
    component: Board,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Boards',
    sagasToRun: [],
    config: {},
  },
  {
    path: `${Routes.showings}/date/:time`,
    component: ShowingsInside,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Showings',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.editProfile,
    component: EditProfile,
    exact: true,
    cache: false,
    auth: true,
    layout: 'settings',
    title: 'Edit profile',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.security,
    component: Security,
    exact: true,
    cache: false,
    auth: true,
    layout: 'settings',
    title: 'Security',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.notifications,
    component: Notifications,
    exact: true,
    cache: false,
    auth: true,
    layout: 'settings',
    title: 'Notifications',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.intro,
    component: Intro,
    exact: true,
    cache: false,
    auth: true,
    layout: 'default',
    title: 'Welcome to Offers Simply!',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.savedSearches,
    component: SavedSearches,
    exact: true,
    cache: false,
    auth: true,
    layout: 'common',
    title: 'Saved searches',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.recoverPassword,
    component: RecoverPassword,
    exact: true,
    cache: false,
    auth: false,
    layout: 'auth',
    title: 'Recover password',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.resetPassword,
    component: ResetPassword,
    exact: true,
    cache: false,
    auth: false,
    layout: 'auth',
    title: 'Reset password',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.sell,
    component: Sell,
    exact: true,
    cache: false,
    auth: false,
    layout: 'sell',
    title: 'Sell',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.drawing,
    component: MapDrawing,
    exact: true,
    cache: false,
    auth: true,
    layout: 'sell',
    title: 'Drawing',
    sagasToRun: [],
    config: {},
  },
  {
    path: Routes.test,
    component: Test,
    exact: true,
    cache: false,
    auth: true,
    layout: 'sell',
    title: 'test',
    sagasToRun: [],
    config: {},
  },
];
