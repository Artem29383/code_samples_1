import React, { memo } from 'react';

import * as Styled from './CheckBox.styled';

type Props = {
  onChange: (p: string) => void;
  isActive: boolean;
  title: string;
};

const CheckBox = ({ onChange, isActive, title }: Props) => {
  const handleChange = () => {
    onChange(title);
  };
  return (
    <Styled.Root onClick={handleChange} isActive={isActive}>
      <Styled.Circle isActive={isActive} />
    </Styled.Root>
  );
};

export default memo(CheckBox);
