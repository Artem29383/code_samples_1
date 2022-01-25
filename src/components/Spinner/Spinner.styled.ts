import styled, { keyframes } from 'styled-components';
import { position, layout, PositionProps } from 'styled-system';
import { size } from 'polished';

import { Colors } from '@types';

import { translateProps } from 'styles/helpers';

const spinAnimaton = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Root = styled.div<PositionProps>`
  ${size(28)};
  display: inline-block;
  position: relative;
  pointer-events: none;
  vertical-align: middle;
  border-style: solid;
  border-color: ${Colors.malibu};
  border-bottom-color: transparent;
  border-radius: 50%;
  border-width: 3px;
  animation: ${spinAnimaton} 1s linear infinite;

  ${layout}
  ${position}
  ${translateProps}
`;
