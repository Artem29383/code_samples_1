import React, { useEffect, useState } from 'react';

import { useAction } from 'hooks/useAction';
import { actions } from 'models/boards';
import { useSelector } from 'hooks/useSelector';
import {
  fetchingCollectionSelector,
  listSelector,
} from 'models/boards/selectors';

import Boards from 'pages/Boards/Boards';

import useWindowResize from 'hooks/useWindowResize';

const BoardsContainer = () => {
  const onFetchBoards = useAction(actions.fetchBoards);
  const list = useSelector(listSelector);
  const loading = useSelector(fetchingCollectionSelector);
  const { width: windowWidth } = useWindowResize();
  const [listReform, setListReform] = useState<{
    [key: number]: Array<{
      default: boolean;
      id: number;
      images: Array<{ id: number; url: string }>;
      title: string;
      totalImages: number;
    }>;
  }>([]);

  useEffect(() => {
    onFetchBoards();
  }, [onFetchBoards]);

  useEffect(() => {
    let group: Array<{
      default: boolean;
      id: number;
      images: Array<{ id: number; url: string }>;
      title: string;
      totalImages: number;
    }> = [];
    const newBoards: {
      [key: number]: Array<{
        default: boolean;
        id: number;
        images: Array<{ id: number; url: string }>;
        title: string;
        totalImages: number;
      }>;
    } = {};
    const isEven = list.length % 2 === 0;
    list.forEach((board, index) => {
      if (isEven) {
        if ((index + 1) % 2 === 0) {
          group.push(board);
          newBoards[board.id] = group;
          group = [];
        } else {
          group.push(board);
        }
      } else if ((index + 1) % 2 !== 0) {
        group.push(board);
        newBoards[board.id] = group;
        group = [];
      } else {
        group.push(board);
      }
    });
    setListReform(newBoards);
  }, [list]);

  return (
    <Boards windowWidth={windowWidth} list={listReform} loading={loading} />
  );
};

export default BoardsContainer;
