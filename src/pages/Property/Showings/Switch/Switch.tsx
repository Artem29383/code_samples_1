import React, { memo, useState } from 'react';

import * as S from './Switch.styled';

type Props = {
  onChange: (p: boolean) => void;
  value: boolean | null;
  leftString: string;
  rightString: string;
};

const Switch = ({ onChange, value, leftString, rightString }: Props) => {
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
      {value !== null && <S.BackDrop status={val} />}
      <S.Button status={val} onClick={handleOk}>
        {leftString}
      </S.Button>
      <S.ButtonRight status={val === null ? null : !val} onClick={handleNo}>
        {rightString}
      </S.ButtonRight>
    </S.Switch>
  );
};

export default memo(Switch);
