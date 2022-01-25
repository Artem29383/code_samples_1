import { Response } from 'express';

import { Route, Routes } from '@types';

import { RootState } from '@models';
import { itemSelector } from 'models/properties/selectors';
import { fetchItem } from 'models/properties/sagas';

import config from '@config';

import Property from 'pages/Property';

const imagePlaceholder = require('images/placeholder.jpg');

const route: Route<RootState> = {
  path: Routes.property,
  exact: true,
  component: Property,
  cache: false,
  auth: false,
  layout: 'default',
  sagasToRun: [[fetchItem, ({ id }) => ({ payload: id })]],
  handleResponse: (
    res: Response,
    state: RootState,
    params: PartialRecord<string, string>
  ) => {
    const item = itemSelector(state, Number(params.id))!;

    if (!item) {
      res.status(404);
    }
  },
  config: (state: RootState, params: PartialRecord<string, string>) => {
    const item = itemSelector(state, Number(params.id));

    if (item) {
      const { address, description, images } = item;

      return {
        title: address,
        ogMeta: [
          {
            property: 'og:url',
            content: `${config.remoteApiUrl}${Routes.properties}/${params.id}`,
          },
          { property: 'og:title', content: address },
          { property: 'og:description', content: description },
          {
            property: 'og:image',
            content:
              images.length > 0
                ? images[0].url
                : `${config.remoteApiUrl}/${imagePlaceholder}`,
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image',
          },
          { property: 'twitter:site', content: 'Offers-simply' },
          { property: 'twitter:creator', content: 'Offers-simply' },
          {
            property: 'twitter:url',
            content: `${config.remoteApiUrl}${Routes.properties}/${params.id}`,
          },
          { property: 'twitter:title', content: address },
          { property: 'twitter:description', content: description },
          {
            property: 'twitter:image:src',
            content:
              images.length > 0
                ? images[0].url
                : `${config.remoteApiUrl}/${imagePlaceholder}`,
          },
        ],
        meta: [
          {
            name: 'description',
            content: description,
          },
        ],
      };
    }

    return {
      title: 'Not found',
    };
  },
};

export default route;
