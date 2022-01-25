import styled from 'styled-components';
import { motion } from 'framer-motion';
import { size, rgba } from 'polished';
import { position, space, layout } from 'styled-system';

import { textMixin, center } from 'styles/helpers';

import { Colors, ColorsStrings } from '@types';

export const sizes = {
  horPadding: {
    small: 20,
    default: 40,
  },
  itemsHorMargin: {
    small: 20,
    default: 70,
  },
  arrowSize: {
    small: 2,
    default: 3,
  },
  arrowHorMargin: {
    small: 10,
    default: 13,
  },
  fontSize: {
    small: 16,
    default: 18,
  },
};

export const Root = styled(motion.div)<{
  opened: boolean;
  mode: 'small' | 'default';
}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 459px!important;
  border-radius: 25px;
  background-color: ${Colors.white};
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
  cursor: pointer;
  padding: 0 42px 0 31px;
  
  ${layout}
  ${position}
  ${space}
`;

export const Arrows = styled.div`
  ${center()};
`;

export const Arrow = styled.span`
  position: relative;
  display: inline-block;
  background-color: ${Colors.bombay};

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:last-child {
    transform: rotate(180deg);
  }

  &::after {
    content: '';
    display: inline-block;
    padding: 3px;
    border: solid ${Colors.bombay};
    border-width: 3px 3px 0 0;
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: -3px;
    transform: rotate(-45deg);
  }

  ${size(20, 3)}
`;

export const Items = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Item = styled.div<{
  color?: ColorsStrings;
  mode: 'small' | 'default';
}>`
  display: flex;
  align-items: center;

  ${p =>
    textMixin({
      fontType: 'liberGrotesqueExtraBold',
      color: p.color,
      fontSize: sizes.fontSize[p.mode],
    })}

  color: ${p => (p.color ? Colors[p.color] : Colors.dodgerBlue)};

  &:not(:last-child) {
    margin-right: 0;
  }

  & > span:first-child {
    display: inline-block;
    padding: ${p => sizes.arrowSize[p.mode]}px;
    border: solid ${p => (p.color ? Colors[p.color] : Colors.dodgerBlue)};
    border-width: ${p => sizes.arrowSize[p.mode]}px ${p =>
  sizes.arrowSize[p.mode]}px 0 0;
    margin-right: ${p => sizes.arrowHorMargin[p.mode]}px;
  }
`;
