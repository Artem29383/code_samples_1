import styled from 'styled-components';
import { margin } from 'styled-system';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';

const linearBg = `linear-gradient(
  180deg,
  ${Colors.melrose},
  ${Colors.malibu},
  ${Colors.dodgerBlue}
)`;

export const Root = styled.div<{ pickerWidth: number; pickerHeight: number }>`
  display: flex;
  align-items: center;
  width: ${p => `calc(100% - ${p.pickerWidth}px)`};
  height: ${p => p.pickerHeight}px;

  ${margin}

  & > .range-slider {
    width: 100%;
    border: none;
    border-radius: unset;
    box-shadow: none;
    background: ${Colors.silverSand};
    height: 3px;

    ${textMixin({
      color: 'white',
      fontType: 'liberGrotesqueBlack',
      fontSize: 16,
    })}

    .upper-extend-line,
    .lower-extend-line {
      content: '';
      display: block;
      height: 3px;
      background: red;
      position: absolute;
      top: 0;
      background: ${Colors.silverSand};
    }

    .upper-extend-line {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .lower-extend-line {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .noUi-connects {
      overflow: visible;
    }

    .noUi-connect {
      background: ${linearBg};

      &.noUi-draggable {
        position: relative;
        top: ${p => -(p.pickerHeight / 2 - 2)}px;
        height: ${p => p.pickerHeight}px;
        cursor: grab;
      }
    }

    .noUi-handle {
      width: ${p => p.pickerWidth}px;
      height: ${p => p.pickerHeight}px;
      top: ${p => -(p.pickerHeight / 2 - 2)}px;
      border: none;
      box-shadow: none;
      border-radius: 0;
      cursor: ew-resize;
      background: ${linearBg};

      &::after,
      &::before {
        display: none;
      }
    }

    .noUi-handle-upper {
      right: 0;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;

      &::before {
        content: '';
        display: none;
        width: 5px;
        height: ${p => -(p.pickerHeight / 2 - 2)}px;
        left: -4px;
        top: 0;
        position: absolute;
        background: ${linearBg};
      }
    }

    .noUi-handle-lower {
      right: -1px;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    .noUi-touch-area {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .noUi-tooltip {
      display: none;
    }
  }
`;
