import React, { memo } from 'react';

import * as S from './Switcher.styled';
import Switch from 'components/Switch';

type Props = {
  label: string;
  onChange: (p: boolean) => void;
  value: boolean;
};

const Switcher = ({ value, label, onChange }: Props) => {
  return (
    <S.Root>
      <S.Text>{label}</S.Text>
      <Switch value={value} onChange={onChange} />
    </S.Root>
  );
};

export default memo(Switcher);
