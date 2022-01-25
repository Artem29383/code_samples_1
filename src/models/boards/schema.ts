import * as normalizr from 'normalizr';
import _keyBy from 'lodash/keyBy';
import _merge from 'lodash/merge';

import { ApiBoard, ApiBoardAdditional, Board } from './types';
import { Image } from 'models/images/types';

import { schema as imagesSchema } from 'models/images/schema';

type BoardsEntities = {
  boards: Record<number, Board>;
  images: Record<number, Image>;
};

export const mergeToSingleEntity = (
  boards: ApiBoard[],
  boardAdditionals: ApiBoardAdditional[]
) =>
  Object.values(_merge(_keyBy(boards, 'id'), _keyBy(boardAdditionals, 'id')));

type MergedApiBoards = ReturnType<typeof mergeToSingleEntity>;

type PickedBoard = Omit<Board, 'images'> & { images: Image[] };

export const processStrategy = (
  item: ApiBoard & ApiBoardAdditional
): PickedBoard => ({
  id: item.id,
  title: item.title,
  default: item.general,
  totalImages: item.photos_count,
  images: item.last_photo
    ? [{ id: item.last_photo.id, url: item.last_photo.image_url }]
    : [],
});

export const schema = [
  new normalizr.schema.Entity<PickedBoard>(
    'boards',
    { images: imagesSchema },
    {
      processStrategy,
    }
  ),
];

export const normalize = (input: MergedApiBoards) => {
  const normalized = normalizr.normalize<
    MergedApiBoards,
    BoardsEntities,
    number[]
  >(input, schema);

  return {
    ids: {
      boards: normalized.result,
      images: Object.keys(normalized.entities.boards).map(key => Number(key)),
    },
    collections: {
      boards: normalized.entities.boards,
      images: normalized.entities.images,
    },
  };
};

export const denormalize = (
  boardsCollection: Record<string, Board>,
  imagesCollection: Record<string, Image>,
  boardsIds: (number | string)[]
): (Omit<Board, 'images'> & { images: Image[] })[] =>
  normalizr.denormalize(boardsIds, schema, {
    boards: boardsCollection,
    images: imagesCollection,
  });

export type NormalizedBoards = ReturnType<typeof normalize>;
