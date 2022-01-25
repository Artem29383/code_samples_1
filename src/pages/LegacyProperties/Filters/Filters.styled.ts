import styled from 'styled-components';
import { size, rgba } from 'polished';

import { Colors, ColorsStrings } from '@types';

import { textMixin } from 'styles/helpers';

export const rootTopPadding = 22;
export const tabStripHeight = 30;
export const tabStripMarginBottom = 30;
export const saveControlsMarginBottom = 30;
export const saveControlsHeight = 44;

export const Root = styled.div`
  padding: ${rootTopPadding}px;
  background-color: ${Colors.alabaster};
  overflow-y: scroll;
  overflow-x: hidden;

  ${size('100%')}
`;

export const Tabstrip = styled.div`
  display: flex;
  margin-bottom: ${tabStripMarginBottom}px;
`;

export const SaveControls = styled.div`
  display: flex;
  height: ${saveControlsHeight}px;
  margin-bottom: ${saveControlsMarginBottom}px;
`;

export const SaveSearchInput = styled.input`
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${Colors.bombay};

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 18,
    color: 'mineShaft',
  })}
`;

export const SaveButton = styled.div<{ color: ColorsStrings }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  padding: 0 20px;
  border-radius: 20px;
  background-color: ${Colors.white};
  box-shadow: -10px 10px 20px ${rgba(Colors.black, 0.05)};
  cursor: pointer;

  ${p =>
    textMixin({
      fontSize: 14,
      fontType: 'liberGrotesqueExtraBold',
      color: p.color,
    })}
`;

export const Tab = styled.div<{ active?: boolean }>`
  text-align: center;
  height: ${tabStripHeight}px;
  border-bottom: 2px solid
    ${p => (p.active ? Colors.burningOrange : Colors.gallery)};
  cursor: pointer;

  &:nth-child(1),
  :nth-child(2) {
    width: 70%;
  }

  &:nth-child(3) {
    width: 100%;
  }

  ${textMixin({
    fontSize: 14,
    fontType: 'liberGrotesqueExtraBold',
    color: 'mineShaft',
    align: 'center',
  })}
`;
