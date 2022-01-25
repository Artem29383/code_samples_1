import React, { memo, useCallback } from 'react';

import * as Styled from 'pages/Favorites/ToolBar/ToolBar.styled';

type Props = {
  count: number;
  label: string;
  onChangePropertyTypes: (p: string) => void;
  isActive: boolean;
};

const ItemBar = ({ count, label, onChangePropertyTypes, isActive }: Props) => {
  const handleChangePropertyTypes = useCallback(() => {
    onChangePropertyTypes(label);
  }, [onChangePropertyTypes, label]);

  return (
    <Styled.ItemBar onClick={handleChangePropertyTypes}>
      <Styled.ItemCount isActive={isActive}>{count}</Styled.ItemCount>
      <Styled.ItemLabel isActive={isActive}>{label}</Styled.ItemLabel>
    </Styled.ItemBar>
  );
};

export default memo(ItemBar);
