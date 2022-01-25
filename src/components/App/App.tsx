import React from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from 'react-modal';

import { CommonProps } from './types';
import { Authorized } from 'models/user/selectors';

import useVh from 'hooks/useVh';

import AppRouter from 'components/AppRouter';
import PushNotification from 'components/PushNotifications';

import Normalize from 'styles/normalize';
import Fonts from 'styles/fonts';
import Global from 'styles/global';
import theme from 'styles/theme';

import { Root } from './App.styled';

type Props = { authorized: Authorized } & CommonProps;

Modal.setAppElement('#react-view');

const App = ({ authorized, ...rest }: Props) => {
  useVh();

  return (
    <ThemeProvider theme={theme}>
      <Fonts />
      <Normalize />
      <Global />
      <Root>{authorized !== undefined ? <AppRouter {...rest} /> : null}</Root>
      <PushNotification />
    </ThemeProvider>
  );
};

export default App;
