import styled from 'styled-components';
import { size, rgba } from 'polished';

import { Colors } from '@types';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${Colors.white};
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
  cursor: pointer;

  ${size(50)}

  & > span {
    position: relative;
    background-color: ${Colors.bombay};
    margin-left: -13px;

    ${size(6, 5)}

    &:not(:last-child) {
      margin-bottom: 7px;
    }

    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 8px;
      background-color: ${Colors.bombay};
    }

    &::before {
      top: 0;
      ${size(2, 12)}
    }

    &::after {
      bottom: 0;
      ${size(2, 12)}
    }
  }
`;
