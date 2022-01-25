import styled from 'styled-components';
import {
  position,
  display,
  layout,
  PositionProps,
  LayoutProps,
  DisplayProps,
} from 'styled-system';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

import { Colors } from '@types';

import { media } from 'styles/media';

export const saveFiltersButtonHeight = 44;
export const saveFiltersButtonMarginBottom = 30;

export const filtersWrapperMinWidth = 450;

export const Root = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-end;
  min-height: 'inherit';
  position: relative;
  filter: ${p => (p.disabled ? 'blur(5px)' : 'none')};
`;

export const ListWrapper = styled(motion.div)<LayoutProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  ${layout}
`;

export const ButtonWrapper = styled(motion.div)<
  PositionProps & { disabled: boolean }
>`
  ${position}

  position: absolute;
  pointer-events: ${p => (p.disabled ? 'none' : 'all')};
`;

export const FiltersWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  box-shadow: 20px 0 20px ${rgba(Colors.black, 0.1)};

  ${media.desktop`
    width: ${filtersWrapperMinWidth}px;
    height: 100%;
  `}
`;

export const SearchWrapper = styled(motion.div)<DisplayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;

  ${display};
`;
