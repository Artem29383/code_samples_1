import React, { memo } from 'react';

import Button from 'components/Button';

import * as S from 'pages/Sell/Sell.styled';
import Spinner from 'pages/Sell/Spinner';
import { Colors } from '@types';
import useWindowResize from 'hooks/useWindowResize';

type Props = {
  onClickNext?: () => void;
  onClickPrev?: () => void;
  step: number;
  notValid: boolean;
  load?: boolean;
  isNext?: boolean;
};

const Switcher = ({
  notValid = true,
  onClickNext,
  onClickPrev,
  step,
  load,
  isNext = true,
}: Props) => {
  const { width: windowWidth } = useWindowResize();
  return (
    <S.Buttons isCenter={step > 1}>
      {step > 1 && (
        <Button
          marginRight={13}
          height={60}
          width={windowWidth >= 1024 ? 185 : 123}
          onClick={onClickPrev}
        >
          Back
        </Button>
      )}
      <Button
        disabled={load || notValid}
        onClick={onClickNext}
        height={60}
        width={windowWidth >= 1024 ? 185 : 123}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {load ? <Spinner color={Colors.white} /> : isNext ? 'Next' : 'Complete'}
      </Button>
    </S.Buttons>
  );
};

export default memo(Switcher);
