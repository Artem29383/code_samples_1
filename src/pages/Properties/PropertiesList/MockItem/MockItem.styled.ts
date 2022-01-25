import styled, { keyframes } from 'styled-components';
import { darken, size } from 'polished';

import { Colors } from '@types';
import { marginProps } from 'styles/helpers';

export const animatedBackground = (position: number) => keyframes`
  0% {
    background-position: -${position}px;
  }

  100% {
    background-position: ${position}px;
  }
`;

export const Root = styled.div<{ radius: number; width: number }>`
  position: relative;
  height: 200px;
  background: ${Colors.mischka};
  overflow: hidden;
  border-radius: ${p => `${p.radius}px`};

  ${marginProps}

  & > div {
    ${size('100%')};
    background-repeat: no-repeat;
    background: linear-gradient(
      to right,
      ${Colors.mischka} 10%,
      ${darken(0.05, Colors.mischka)} 38%,
      ${Colors.mischka} 53%
    );

    animation: ${p => animatedBackground(p.width)} 2s linear infinite;
    animation-fill-mode: forwards;
  }
`;
