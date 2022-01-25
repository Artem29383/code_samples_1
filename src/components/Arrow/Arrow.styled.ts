import styled from 'styled-components';
import { margin, position, PositionProps, MarginProps } from 'styled-system';

import { ColorsStrings, Colors } from '@types';

type Direction = 'right' | 'left' | 'up' | 'down';

type Props = {
  direction: Direction;
  size: number;
  thickness: number;
  color: ColorsStrings;
} & PositionProps &
  MarginProps;

const directionRotate = {
  right: -45,
  left: 135,
  up: -135,
  down: 45,
};

export default styled.div<Props>`
  display: inline-block;
  border: solid ${p => Colors[p.color]};
  border-width: 0 ${p => p.thickness}px ${p => p.thickness}px 0;
  padding: ${p => p.size}px;
  cursor: pointer;
  transform: rotate(${p => directionRotate[p.direction]}deg);

  ${margin}
  ${position}
`;
