import { Methods, request } from './request';

import { AddImageToBoardParams, ApiBoards } from 'models/boards/types';

export const fetchBoards = () =>
  request<ApiBoards>(Methods.GET, {
    url: `/users/current/favorites/categories`,
  });

export const fetchBoardAdditionals = () =>
  request<ApiBoards>(Methods.GET, {
    url: `/users/current/favorites/photos/boards`,
  });

export const addImageToBoard = ({
  imageId,
  boardId,
  boardTitle,
  note,
}: AddImageToBoardParams) =>
  request<ApiBoards>(Methods.POST, {
    url: `/users/current/favorites/photos`,
    data: {
      photo_id: imageId,
      category_id: boardId,
      new_category_title: boardTitle,
      note,
    },
  });

export const fetchBoardById = (data: string) =>
  request(Methods.GET, {
    url: `/users/current/favorites/categories/${data}`,
  });
