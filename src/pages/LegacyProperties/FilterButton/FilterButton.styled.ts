import styled from 'styled-components';
import { size, rgba } from 'polished';
import { position, PositionProps } from 'styled-system';

import { Colors } from '@types';

const toggleIcon = require('assets/icons/toggle.svg');

export const filterButtonSize = 50;

export const Root = styled.div<PositionProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${Colors.white};
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
  cursor: pointer;

  ${position}
  ${size(filterButtonSize)}
`;

export const ToggleIcon = styled(toggleIcon)`
  ${size(10, 23)};

  &:not(:last-child) {
    margin-bottom: 3px;
  }

  &:last-child {
    transform: scale(-1);
  }
`;
