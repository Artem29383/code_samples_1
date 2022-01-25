import React from 'react';

import { CommonProps } from './types';

import App from './App';

import useMapLoaded from 'hooks/useMapLoaded';
import useAuthorized from 'hooks/useAuthorized';

const AppContainer = (props: CommonProps) => {
  useMapLoaded();
  const authorized = useAuthorized();

  return <App {...props} authorized={authorized} />;
};

export default AppContainer;
