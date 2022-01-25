import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { actions } from 'models/boards';
import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import {
  boardSelector,
  fetchingCollectionSelector,
} from 'models/boards/selectors';

import Board from 'pages/Board/Board';

import useWindowResize from 'hooks/useWindowResize';

const BoardContainer = () => {
  const fetchBoardById = useActionWithPayload(actions.fetchBoardById);
  const { boardId } = useParams();
  const board = useSelector(boardSelector);
  const { width: windowWidth } = useWindowResize();
  const resetBoard = useActionWithPayload(actions.setBoard);
  const [listReform, setListReform] = useState<{
    [key: number]: Array<{
      id: number;
      note: null;
      photo: {
        id: number;
        image_url: string;
      };
    }>;
  }>([]);
  const loading = useSelector(fetchingCollectionSelector);

  useEffect(() => {
    if (board.photos) {
      let group: Array<{
        id: number;
        note: null;
        photo: {
          id: number;
          image_url: string;
        };
      }> = [];
      const newBoards: {
        [key: number]: Array<{
          id: number;
          note: null;
          photo: {
            id: number;
            image_url: string;
          };
        }>;
      } = {};
      const isEven = board.photos.length % 2 === 0;
      board.photos.forEach((photo, index) => {
        if (isEven) {
          if ((index + 1) % 2 === 0) {
            group.push(photo);
            newBoards[photo.id] = group;
            group = [];
          } else {
            group.push(photo);
          }
        } else if ((index + 1) % 2 !== 0) {
          group.push(photo);
          newBoards[photo.id] = group;
          group = [];
        } else {
          group.push(photo);
        }
      });
      setListReform(newBoards);
    }
  }, [board]);

  useEffect(() => {
    fetchBoardById(boardId as string);
    return () => {
      resetBoard({});
    };
  }, [fetchBoardById, boardId, resetBoard]);

  return (
    <Board
      list={listReform}
      board={board}
      loading={loading}
      windowWidth={windowWidth}
    />
  );
};

export default BoardContainer;
