import React from 'react';

import * as Styled from './Text.styled';

import {
  FlexboxProps,
  MarginProps,
  PaddingProps,
  LayoutProps,
  PositionProps,
  FontSizeProps,
  LineHeightProps,
} from 'styled-system';

import { TextProps, TranslateProps } from '@types';

type Props = {
  children: React.ReactNode;
  cursor?: 'pointer' | 'default';
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
} & FlexboxProps &
  PositionProps &
  MarginProps &
  PaddingProps &
  LayoutProps &
  Omit<TextProps, 'fontSize' | 'lineHeight'> &
  FontSizeProps &
  LineHeightProps &
  TranslateProps;

const Text = ({ children, as = 'div', cursor = 'default', ...rest }: Props) => (
  // @ts-ignore
  <Styled.Root cursor={cursor} as={as} {...rest}>
    {children}
  </Styled.Root>
);

export default Text;
