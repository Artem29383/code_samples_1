import styled from 'styled-components';
import { layout, margin, LayoutProps } from 'styled-system';
import { rgba } from 'polished';

import { Colors } from '@types';

const directionGradient = {
  down: `radial-gradient(
    farthest-side at 50% 0,
    ${rgba(Colors.black, 0.4)},
    ${rgba(Colors.black, 0)}
  )`,
  up: `radial-gradient(
    farthest-side at 50% 100%,
    ${rgba(Colors.black, 0.4)},
    ${rgba(Colors.black, 0)})
    0 100%`,
};

export const Root = styled.div`
  position: relative;

  ${margin}
  ${layout}
`;

export const Content = styled.div<LayoutProps>`
  width: 100%;
  max-height: ${p => p.maxHeight}px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Shadow = styled.div`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 20px;
  z-index: 1;
  transition: opacity 100ms;
`;

export const BottomShadow = styled(Shadow)`
  bottom: 0;
  background: ${directionGradient.up};
`;

export const TopShadow = styled(Shadow)`
  top: 0;
  background: ${directionGradient.down};
`;
