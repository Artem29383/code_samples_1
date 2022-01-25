import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';

import { Routes, Route as RouteProps } from '@types';
import { RootState } from '@models';

import useAuthorized from 'hooks/useAuthorized';

type Props = { auth: boolean } & RouteProps<RootState>;

const AppRoute = ({
  auth,
  path,
  title,
  component: Component,
  ...rest
}: Props) => {
  const authorized = useAuthorized();
  if (authorized === null && auth) {
    return <Redirect to={Routes.signIn} />;
  }

  if (path !== Routes.intro && authorized && !authorized.passedIntro) {
    return <Redirect to={Routes.intro} />;
  }

  return (
    <Route path={path} exact {...rest}>
      <Helmet title={title} />
      <Component />
    </Route>
  );
};

export default AppRoute;
