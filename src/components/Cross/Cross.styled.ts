import styled from 'styled-components';
import { position } from 'styled-system';

import { ColorsStrings, Colors } from '@types';

export const Root = styled.div<{
  size: number;
  diagonal: number;
  thickness: number;
  color: ColorsStrings | string;
}>`
  cursor: pointer;
  position: relative;

  &::before,
  &::after {
    position: absolute;
    content: '';
    display: inline-block;
    top: ${p => -(p.diagonal - p.size) / 2}px;
    left: ${p => p.size / 2 - p.thickness / 2}px;
    height: ${p => p.diagonal}px;
    width: ${p => `${p.thickness}px`};
    background-color: ${p =>
      p.color in Colors ? Colors[p.color as ColorsStrings] : p.color};
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }

  width: ${p => `${p.size}px`};
  height: ${p => `${p.size}px`};

  ${position};
`;
