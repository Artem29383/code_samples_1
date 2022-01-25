import * as normalizr from 'normalizr';

import { Image } from './types';

type ImageEntities = { images: Record<number, Image> };

export const schema = [new normalizr.schema.Entity<Image>('images', {})];

export const normalize = (input: Image[]) => {
  const normalized = normalizr.normalize<Image, ImageEntities, number[]>(
    input,
    schema
  );

  return {
    ids: {
      images: normalized.result,
    },
    collections: {
      images: normalized.entities.images,
    },
  };
};

export const denormalize = (
  collection: Record<string, Image>,
  ids: (number | string)[]
): Image[] =>
  normalizr.denormalize(ids, schema, {
    images: collection,
  });
