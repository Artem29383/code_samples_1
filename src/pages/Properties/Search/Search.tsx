import React, { useState, MutableRefObject, useMemo } from 'react';
import { LayoutProps, PositionProps } from 'styled-system';

import { TranslateProps } from '@types';

import Cross from 'components/Cross';

import * as S from './Search.styled';

type Props = PositionProps &
  LayoutProps &
  TranslateProps & {
    open: boolean;
    disabled: boolean;
    placeholder?: string;
    width: number | string;
    maxWidth: number | string;
    onClick: () => void;
  };

const inputTransitionSettings = { ease: 'easeIn', duration: 0.3 };
const crossTransitionSettings = { ease: 'linear', duration: 0.2, delay: 0.1 };

const crossVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const Search = React.forwardRef(
  (
    {
      onClick,
      width,
      maxWidth,
      open,
      placeholder = 'Search for a location...',
      ...rest
    }: Props,
    ref
  ) => {
    const [opened, setOpened] = useState(open);

    const inputVariants = useMemo(
      () => ({
        closed: { width },
        open: { width: maxWidth },
      }),
      [maxWidth, width]
    );

    return (
      <S.Root
        variants={inputVariants}
        initial={false}
        animate={open ? 'open' : 'closed'}
        onAnimationComplete={() => setOpened(open)}
        transition={inputTransitionSettings}
        onClick={opened ? () => {} : onClick}
        {...rest}
      >
        <S.Input
          opened={opened}
          placeholder={placeholder}
          ref={ref as MutableRefObject<HTMLInputElement>}
        />
        <S.SearchIcon onClick={opened ? onClick : () => {}} />
        <S.CrossWrapper
          variants={crossVariants}
          transition={
            opened
              ? { ...crossTransitionSettings, delay: 0 }
              : crossTransitionSettings
          }
        >
          <Cross
            thickness={3}
            color="bombay"
            size={12}
            onClick={opened ? onClick : () => {}}
          />
        </S.CrossWrapper>
      </S.Root>
    );
  }
);

export default Search;
