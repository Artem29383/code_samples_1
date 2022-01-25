/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { render, hydrate, unmountComponentAtNode } from 'react-dom';
import history from './utils/history';

import { routes } from './routes';
import { rootSaga } from './models/sagas';
import store, { sagaMiddleware } from './store/client';

sagaMiddleware.run(rootSaga);

const renderDom = process.env.APP_ENV === 'development' ? render : hydrate;
const mountNode = document.getElementById('react-view');

const renderApp = () => {
  unmountComponentAtNode(mountNode as Element);
  const App = require('./components/App').default;

  renderDom(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App routes={routes} />
      </ConnectedRouter>
    </Provider>,
    mountNode
  );
};

if (module.hot) {
  module.hot.accept();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/OneSignalSDKUpdaterWorker.js', { scope: '/' })
      .then(
        () => {
          console.info('Offline service worker successfully installed');
        },
        error => {
          console.error('ServiceWorker registration failed: ', error);
        }
      );
  });
}

renderApp();
