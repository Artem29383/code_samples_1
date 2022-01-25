import React from 'react';
import { BorderProps, PaddingProps, ShadowProps } from 'styled-system';

import { ColorsStrings } from '@types';
import { CommonProps } from './types';

import * as Styled from './Button.styled';

type Props = {
  type?: 'button' | 'reset' | 'submit';
  color?: ColorsStrings | 'default';
  customColor?: string;
  textColor?: ColorsStrings;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
} & CommonProps &
  BorderProps &
  PaddingProps &
  ShadowProps;

const Button = ({
  children,
  className,
  type = 'button',
  color = 'default',
  textColor = 'white',
  customColor = 'd',
  ...rest
}: Props) => {
  return (
    <Styled.Root
      {...rest}
      color={color}
      textColor={textColor}
      className={className}
      customColor={customColor}
      type={type}
    >
      {children}
    </Styled.Root>
  );
};

export default Button;
