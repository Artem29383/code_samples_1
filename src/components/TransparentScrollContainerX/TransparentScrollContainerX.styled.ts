import styled from 'styled-components';
import { PaddingProps, margin, padding } from 'styled-system';

import { media } from 'styles/media';

export const Root = styled.div`
  position: relative;

  ${margin}
`;

export const Content = styled.div<PaddingProps>`
  ::-webkit-scrollbar {
    width: 0;
    display: none;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${padding}

  ${media.desktop`
    overflow-x: auto;
  `}
`;

export const ShadowLeft = styled.div`
  height: 100%;
  left: -2px;
  display: none;
  opacity: 0;
  top: 0;
  z-index: 1;
  background: linear-gradient(to right, #ffffff 6%, rgba(216, 216, 216, 0));
  position: absolute;
  width: 100px;
  pointer-events: none;

  ${media.desktop`
    display: block;
  `}
`;

export const ShadowRight = styled.div`
  height: 100%;
  right: -2px;
  background: linear-gradient(to left, #ffffff 6%, rgba(216, 216, 216, 0));
  top: 0;
  z-index: 1;
  display: none;
  position: absolute;
  width: 100px;
  opacity: 1;
  pointer-events: none;

  ${media.desktop`
    display: block;
  `}
`;
