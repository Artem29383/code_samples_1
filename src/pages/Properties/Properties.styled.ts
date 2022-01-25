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
import { FONTS } from 'styles/fonts';

export const saveFiltersButtonHeight = 44;
export const saveFiltersButtonMarginBottom = 30;

export const filtersWrapperMinWidth = 617;

export const Root = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-end;
  min-height: 'inherit';
  position: relative;
  overflow: hidden;
  filter: ${p => (p.disabled ? 'blur(5px)' : 'none')};
`;

export const ListWrapper = styled(motion.div)<LayoutProps>`
  position: relative;
  top: 0;
  left: 0;
  z-index: 4;

  ${layout}
`;

export const ButtonWrapper = styled(motion.div)<
  PositionProps & { disabled: boolean }
>`
  ${position}

  position: absolute;
  pointer-events: ${p => (p.disabled ? 'none' : 'all')};
`;

export const LeftSideMap = styled(motion.div)`
  min-height: calc(100vh - 70px);
  height: auto;
  width: 617px;
  position: absolute;
  left: 0;
  z-index: 4;
  top: 0;
  display: flex;
  flex-direction: column;
`;

export const FiltersWrapper = styled(motion.div)`
  width: 100%;
  position: static;
  top: 0;
  left: 0;
  min-height: 701px;
  z-index: 4;
  box-shadow: 20px 0 20px ${rgba(Colors.black, 0.1)};

  //max-height: 701px;
  //transition: transform linear 300ms;

  ${media.height(750)`
  max-height: 600px;
  min-height: initial;
  overflow-y: auto;
  `}

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

export const AnimationViewChanger = styled.button`
  width: 213px;
  height: 50px;
  position: absolute;
  z-index: 3;
  left: 50%;
  transform: translate(-50%, 0);
  top: -24px;
  border: 2px solid ${Colors.malibu};
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(49, 55, 64, 0.1);
  border-radius: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${FONTS.LiberGrotesqueExtraBold};
  color: #768efe;
`;

export const ArrowPoint = styled.div<{ isUp: boolean }>`
  width: 10px;
  height: 10px;
  border-left: 2px solid #638cff;
  border-top: 2px solid #638cff;
  transform: ${({ isUp }) => (isUp ? 'rotate(45deg)' : 'rotate(-135deg)')};
  margin-bottom: ${({ isUp }) => (isUp ? '-6px' : '2px')};
`;

export const TextCriteria = styled.div`
  font-size: inherit;
  color: inherit;
  margin: 0 10px;
`;

export const ButtonWr = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 4px 6px 9px rgba(68, 68, 68, 0.101961);
  border-radius: 45px;
`;
