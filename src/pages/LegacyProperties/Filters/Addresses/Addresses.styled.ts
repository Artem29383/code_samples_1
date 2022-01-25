import styled from 'styled-components';
import { margin } from 'styled-system';
import { rgba } from 'polished';

import { Colors } from '@types';

import { textMixin, center } from 'styles/helpers';

export const inputHeight = 30;

export const Root = styled.div`
  ${margin}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input<{ disabled: boolean }>`
  width: 100%;
  height: ${inputHeight}px;
  margin-right: 25px;
  padding-bottom: 5px;
  border-bottom: 3px solid ${Colors.mischka};

  ${p =>
    textMixin({
      fontType: 'bwGradualBold',
      color: p.disabled ? 'mischka' : 'malibu',
      fontSize: 22,
    })}
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 18,
    color: 'malibu',
  })}
`;

export const Title = styled.div`
  margin-right: auto;
`;

export const ActiveButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 20px;
  border-radius: 20px;
  margin-right: 5px;
  margin-left: 20px;
  cursor: pointer;
  box-shadow: -10px 10px 20px ${rgba(Colors.black, 0.05)};
  background: ${p =>
    p.active
      ? `linear-gradient(135deg, ${Colors.mauve}, ${Colors.dodgerBlue})`
      : Colors.white};

  ${p =>
    textMixin({
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 12,
      color: p.active ? 'white' : 'malibu',
    })}
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  width: 35px;
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: -10px 10px 20px ${rgba(Colors.black, 0.05)};
  background: ${Colors.white};
`;

export const AddButton = styled.span<{ disabled: boolean }>`
  display: inline-block;
  position: relative;
  width: 22px;
  height: 22px;
  margin-right: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${p => (p.disabled ? Colors.mischka : Colors.white)};
  box-shadow: -10px 10px 20px ${rgba(Colors.black, 0.05)};
  cursor: pointer;

  &::after,
  &::before {
    content: '';
    height: 9px;
    width: 2px;
    background-color: ${p => (p.disabled ? Colors.argent : Colors.malibu)};
    ${center(true, true, true)}
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;
