import styled, { keyframes } from 'styled-components';
import { size } from 'polished';

import { PositionProps } from '@types';

import { position } from 'styled-system';

const spinAnimaton = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Root = styled.div<{ PositionProps: PositionProps; color: string }>`
  ${size(28)};
  display: inline-block;
  position: relative;
  pointer-events: none;
  vertical-align: middle;
  border-style: solid;
  border-color: ${({ color }) => color};
  border-bottom-color: transparent;
  border-radius: 50%;
  border-width: 3px;
  animation: ${spinAnimaton} 1s linear infinite;

  ${position}
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  height: 100%;
  flex-grow: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
