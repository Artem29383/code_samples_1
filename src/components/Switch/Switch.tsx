import React, { memo, useState } from 'react';
import * as S from './Switch.styled';

type Props = {
  onChange: (p: boolean) => void;
  value: boolean;
};

const Switch = ({ onChange, value }: Props) => {
  const [val, setValue] = useState(value);

  const handleOk = () => {
    setValue(true);
    onChange(true);
  };

  const handleNo = () => {
    setValue(false);
    onChange(false);
  };

  return (
    <S.Switch>
      <S.BackDrop status={val} />
      <S.Button status={val} onClick={handleOk}>
        Yes
      </S.Button>
      <S.Button status={!val} onClick={handleNo}>
        No
      </S.Button>
    </S.Switch>
  );
};

export default memo(Switch);
