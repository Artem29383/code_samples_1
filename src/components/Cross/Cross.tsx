import React from 'react';
import { PositionProps, LayoutProps } from 'styled-system';

import { ColorsStrings } from '@types';

import * as Styled from './Cross.styled';

type Props = {
  onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  /* TODO Fix this color prop type */
  color?: ColorsStrings | string;
  size?: number;
  thickness?: number;
} & PositionProps &
  LayoutProps;

export const Cross = React.forwardRef(
  ({ color = 'mischka', thickness = 4, size = 18, ...rest }: Props, ref) => {
    return (
      <Styled.Root
        ref={ref as React.MutableRefObject<HTMLDivElement>}
        diagonal={Math.floor(Math.sqrt(2 * size * size))}
        size={size}
        color={color}
        thickness={thickness}
        {...rest}
      />
    );
  }
);

export default Cross;
