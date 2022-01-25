import React, { useEffect } from 'react';

import { CommonProps } from './types';

import { actions } from 'models/boards';
import { listSelector } from 'models/boards/selectors';

import { useSelector } from 'hooks/useSelector';
import { useAction, useActionWithPayload } from 'hooks/useAction';

import BoardsModal from './BoardsModal';

const BoardsModalContainer = (props: CommonProps) => {
  const fetchBoards = useAction(actions.fetchBoards);
  const addImageToBoard = useActionWithPayload(actions.addImageToBoard);

  const boards = useSelector(listSelector);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <BoardsModal
      {...props}
      boards={boards}
      onAddImageToBoard={addImageToBoard}
    />
  );
};

export default BoardsModalContainer;
