import React, { memo } from 'react';
import * as S from './Spinner.styled';
import Spinner from 'components/Spinner/Spinner';
import { Colors } from '@types';

const SpinnerWrapper = ({ color = Colors.malibu }: { color?: string }) => {
  return (
    <S.SpinnerWrapper>
      <Spinner color={color} />
    </S.SpinnerWrapper>
  );
};

export default memo(SpinnerWrapper);
