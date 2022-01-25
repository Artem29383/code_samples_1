import React, { useEffect } from 'react';

import Boards from './Boards';

import { useAction } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import { actions } from 'models/boards';
import {
  fetchingCollectionSelector,
  listSelector,
} from 'models/boards/selectors';
import useWindowResize from 'hooks/useWindowResize';

const BoardsContainer = () => {
  const onFetchBoards = useAction(actions.fetchBoards);
  const list = useSelector(listSelector);
  const loading = useSelector(fetchingCollectionSelector);
  const { width: windowWidth } = useWindowResize();

  useEffect(() => {
    onFetchBoards();
  }, [onFetchBoards]);

  return <Boards loading={loading} list={list} windowWidth={windowWidth} />;
};

export default BoardsContainer;
