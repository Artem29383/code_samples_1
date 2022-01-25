import React, { memo } from 'react';

import * as Styled from './CheckBox.styled';

type Props = {
  onChange: () => void;
  isActive: boolean;
};

const CheckBox = ({ onChange, isActive }: Props) => {
  return (
    <Styled.Root onClick={onChange} isActive={isActive}>
      <Styled.Circle isActive={isActive} />
    </Styled.Root>
  );
};

export default memo(CheckBox);
