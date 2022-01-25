import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';

export const Root = styled.div<MarginProps & { size: number }>`
  position: relative;
  height: ${p => p.size}px;

  ${margin}
`;

export const Items = styled.div<{ isFirstActive: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;

  ${textMixin({
    fontType: 'liberGrotesqueBlack',
    fontSize: 18,
    color: 'emperor',
  })}
`;

export const Part = styled.div<MarginProps & { size: number }>`
  display: flex;
  height: 100%;

  ${margin}
`;

export const ActivePart = styled(Part)`
  color: ${Colors.white};
  border-radius: ${p => p.size / 2}px;
  background: linear-gradient(
    135deg,
    ${Colors.melrose},
    ${Colors.malibu},
    ${Colors.dodgerBlue}
  );
`;

export const Item = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.size}px;
  height: 100%;
  cursor: pointer;
`;
