/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import { size, rgba } from 'polished';
import { position, margin, layout } from 'styled-system';

import { Colors } from '@types';

import { textMixin, center } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  display: block;
  padding: 20px;
  color: ${Colors.mineShaft};
  background-color: ${Colors.white};
  border-radius: 20px;
  height: 100%;
  box-shadow: 0px 10px 30px ${rgba(Colors.black, 0.1)};

  ${layout}
  ${position}
  ${margin}
  
  ${media.desktop`
    ${media.height(800)`
        padding: 10px 20px;
    `}
  `}
  
  & div {
   a {
    text-decoration: underline;
   }
  } 
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 22px;

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
    right: 0;
  }

  ${media.desktop`
    ${media.height(800)`
        margin-bottom: 10px;
    `}
  `}
`;

export const MonthPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 55px;
  margin-bottom: 25px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 18,
  })}
`;

export const Month = styled.div``;

export const Arrow = styled.span<{ dir: 'left' | 'right' }>`
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  cursor: pointer;

  ${p => `border-${p.dir}: 5px solid ${Colors.mineShaft}`};
  ${size(0, 0)}
`;

export const Week = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 17px;
  justify-content: space-between;

  & > span {
    width: 38px;
    display: block;
    text-align: center;

    ${media.desktop`
      ${media.height(800)`
          width: 30px;
      `}
  `}
  }

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    color: 'bombay',
  })}
`;

export const Days = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  height: 260px;

  ${media.desktop`
    ${media.height(800)`
       height: 200px;
    `}
  `}
`;

export const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;

  ${media.desktop`
    ${media.height(800)`
        height: 30px;
    `}
  `}
`;

export const Modes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 194px;
  width: 100%;
`;

export const Text = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 14px;
  font-family: LiberGrotesqueExtraBold, sans-serif;
  letter-spacing: 0.35px;
  cursor: pointer;
  color: ${({ active }) => (active ? Colors.malibu : Colors.bombay)};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

export const ScheduleDays = styled.div``;

export const DayInScedule = styled.div`
  max-width: 460px;
  width: 100%;
  height: 80px;
  margin: 0 auto;

  ${media.desktop`
      padding: 19px;
      
      &:hover {
        box-shadow: -13px 12px 30px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background-image: linear-gradient(-54deg, #6a8dff 0%, #c192ff 100%);
        div {
          color: ${Colors.white};
        }
      }
  `}
`;

export const TextUnderLine = styled.div`
  text-decoration: underline;
  font-size: 14px;
  line-height: 14px;
  color: ${Colors.mineShaft};
  font-family: LiberGrotesqueBlack, sans-serif;
`;

export const Reschedule = styled.div`
  text-decoration: underline;
  font-size: 14px;
  line-height: 14px;
  color: ${Colors.mineShaft};
  font-family: LiberGrotesqueNews, sans-serif;
`;

export const Line = styled.div`
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Events = styled.div`
  padding: 20px 20px 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  height: 57%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;
