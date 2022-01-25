import React, { memo, useEffect } from 'react';

import { ToolBar as ToolBarTypes } from 'models/favorites/types';

import { useAction } from 'hooks/useAction';
import { actions } from 'models/favorites';
import { useSelector } from 'hooks/useSelector';
import { statisticsSelector } from 'models/favorites/selectors';

import ItemBar from 'pages/Favorites/ToolBar/ItemBar';

import * as Styled from './ToolBar.styled';

type Props = {
  onChangePropertyTypes: (p: string) => void;
  typeProperty: string;
};

const ToolBar = ({ onChangePropertyTypes, typeProperty }: Props) => {
  const getStatisticsFavorites = useAction(actions.getStatisticsFavorites);
  const { favorites, hidden, recent, isReady } = useSelector(
    statisticsSelector
  );

  useEffect(() => {
    getStatisticsFavorites();
  }, [getStatisticsFavorites]);

  return isReady ? (
    <Styled.ToolBar>
      <ItemBar
        isActive={typeProperty === ToolBarTypes.favorites}
        count={favorites}
        label={ToolBarTypes.favorites}
        onChangePropertyTypes={onChangePropertyTypes}
      />
      <ItemBar
        isActive={typeProperty === ToolBarTypes.hidden}
        count={hidden}
        label={ToolBarTypes.hidden}
        onChangePropertyTypes={onChangePropertyTypes}
      />
      <ItemBar
        isActive={typeProperty === ToolBarTypes.recent}
        count={Number(recent) > 30 ? 30 : recent}
        label={ToolBarTypes.recent}
        onChangePropertyTypes={onChangePropertyTypes}
      />
    </Styled.ToolBar>
  ) : (
    <div style={{ height: '73px' }} />
  );
};

export default memo(ToolBar);
