import styled from 'styled-components';
import { Colors } from '@types';
import { center } from 'styles/helpers';
import { media } from 'styles/media';

export const Gallery = styled.div`
  display: flex;
`;

export const RootMobile = styled.div<{ cutMr: boolean }>`
  width: 100%;
  margin-top: 48px;
  position: relative;
  min-height: 200px;
  margin-bottom: ${({ cutMr }) => cutMr && '-81px'};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 47px;
  letter-spacing: 2px;

  svg {
    fill: ${Colors.white};
    stroke-width: 3px;
    width: 16px;
    height: 15px;
    stroke: ${Colors.bombay};
  }

  &::before,
  &::after {
    content: '';
    display: block;
    background-color: ${Colors.bombay};
    height: 1px;
    width: 35%;

    ${center(false, true)}
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 17px;

    ${media.desktop`
      right: 0;
    `}
  }

  ${media.desktop`
     margin-bottom: 22px;
  `}
`;

export const Text = styled.div`
  position: absolute;
  left: 50%;
  padding-right: 17px;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${Colors.bombay};
  font-family: LiberGrotesqueExtraBold, sans-serif;
`;
