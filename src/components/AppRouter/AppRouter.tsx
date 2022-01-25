import React from 'react';
import { Switch, Route } from 'react-router-dom';
import _flatten from 'lodash/flatten';

import { Route as RouteType } from '@types';

import AppRoute from './Route';
import Layout from 'components/Layout';
import AuthLayout from 'components/AuthLayout';
import UserPageLayout from 'components/UserPageLayout';
import SettingsLayout from 'components/SettingsLayout';
import CommonLayout from 'components/CommonLayout';
import NotFound from 'pages/NotFound';
import SellLayout from 'components/SellLayout';

type RouterProps = { routes: RouteType[] };

const AppRouter = ({ routes }: RouterProps) => {
  const mainAppRoutes = routes.filter(({ layout }) => layout === 'default');
  const authRoutes = routes.filter(({ layout }) => layout === 'auth');
  const userRoutes = routes.filter(({ layout }) => layout === 'user');
  const settingsRoutes = routes.filter(({ layout }) => layout === 'settings');
  const commonRoutes = routes.filter(({ layout }) => layout === 'common');
  const sellRoutes = routes.filter(({ layout }) => layout === 'sell');

  return (
    <Switch>
      <Route exact path={_flatten(mainAppRoutes.map(({ path }) => path))}>
        <Layout>
          <Switch>
            {mainAppRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </Layout>
      </Route>
      <Route exact path={_flatten(authRoutes.map(({ path }) => path))}>
        <AuthLayout>
          <Switch>
            {authRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </AuthLayout>
      </Route>
      <Route exact path={_flatten(userRoutes.map(({ path }) => path))}>
        <UserPageLayout>
          <Switch>
            {userRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </UserPageLayout>
      </Route>
      <Route exact path={_flatten(settingsRoutes.map(({ path }) => path))}>
        <SettingsLayout>
          <Switch>
            {settingsRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </SettingsLayout>
      </Route>
      <Route exact path={_flatten(commonRoutes.map(({ path }) => path))}>
        <CommonLayout>
          <Switch>
            {commonRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </CommonLayout>
      </Route>
      <Route exact path={_flatten(sellRoutes.map(({ path }) => path))}>
        <SellLayout>
          <Switch>
            {sellRoutes.map(({ path, ...rest }) => (
              <AppRoute key={path.toString()} path={path} {...rest} />
            ))}
          </Switch>
        </SellLayout>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRouter;
