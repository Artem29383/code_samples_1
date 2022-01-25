import styled from 'styled-components';
import { Colors } from '@types';
import { textMixin } from 'styles/helpers';
import { Triangle } from 'pages/Showings/ToolTip/ToolTip.styled';
import { media } from 'styles/media';

const nestedTernary = (
  disabled: boolean,
  active: boolean,
  timeRange: string | boolean
) => {
  if (disabled) return 'mischka';
  if (active || timeRange) return 'white';
  return 'mineShaft';
};

export const DayCell = styled.div<{
  disabled: boolean;
  active: boolean;
  timeRange: string | boolean;
  selected: boolean;
}>`
  position: relative;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
  min-width: 38px;
  z-index: ${({ selected }) => (selected ? 100 : 1)};

  &:not(:last-child) {
    //margin-right: 5px;
  }
  
  ${p =>
    p.timeRange === 'upcoming'
      ? `
        & ${Triangle} {
          border-color: transparent transparent ${Colors.malibu} transparent;
      }
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: ${Colors.malibu};
      z-index: -1;
    }
  `
      : ''}
  
  ${p =>
    p.timeRange === 'past'
      ? `
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: ${Colors.mischka};
      z-index: -1;
    }
  `
      : ''}

  ${p =>
    p.active
      ? `
      & ${Triangle} {
          border-color: transparent transparent #c192ff transparent;
      }
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #c192ff;
      z-index: -1;
    }
  `
      : ''}

  ${p =>
    textMixin({
      fontType: 'liberGrotesqueBlack',
      fontSize: 14,
      align: 'center',
      color: nestedTernary(p.disabled, p.active, p.timeRange),
    })}
  
  ${media.desktop`
    ${media.height(800)`
    padding: 10px 0;
    min-width: 30px;
    height: 30px;
    
    ${p =>
      // @ts-ignore
      p.active
        ? `
    &::before {
      width: 30px;
      height: 30px;
    }
  `
        : ''}
        
    ${p =>
      // @ts-ignore
      p.timeRange === 'upcoming'
        ? `
    &::before {
      width: 30px;
      height: 30px;
    }
  `
        : ''}
  
  ${p =>
    // @ts-ignore
    p.timeRange === 'past'
      ? `
    &::before {
      width: 30px;
      height: 30px;
    }
  `
      : ''}
  `};
  `}
`;

export const ToolTipWrapper = styled.div`
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;

  ${media.desktop`
    ${media.height(800)`
        width: 30px;
        height: 30px;
    `}
  `}
`;
