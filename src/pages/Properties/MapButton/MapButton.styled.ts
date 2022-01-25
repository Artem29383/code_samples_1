import styled from 'styled-components';
import { size, rgba } from 'polished';
import { space, position } from 'styled-system';

import { Colors } from '@types';

export const Root = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
  cursor: pointer;
  background: linear-gradient(
    135deg,
    ${Colors.melrose},
    ${Colors.malibu},
    ${Colors.dodgerBlue}
  );

  pointer-events: ${p => (p.disabled ? 'none' : 'all')};

  ${space}
  ${position}

  ${size(50)}

  & > span {
    border: 1px solid ${Colors.white};
    background-color: ${Colors.white};
    transform: skew(0deg, -20deg);

    ${size(20, 5)}

    &:not(:last-child) {
      margin-right: 2px;
    }

    &:first-child,
    &:last-child {
      width: 8px;
      background-color: transparent;
      transform: skew(0deg, 20deg);
    }
  }
`;
