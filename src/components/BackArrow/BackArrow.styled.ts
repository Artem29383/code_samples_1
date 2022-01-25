import styled from 'styled-components';
import { size } from 'polished';

import { Colors } from '@types';

import { marginProps } from 'styles/helpers';

export const Root = styled.div`
  display: inline-block;
  width: 20px;
  position: relative;
  cursor: pointer;

  & > span {
    display: inline-block;
  }

  & > span:first-child {
    border: solid ${Colors.cornFlowerBlue};
    border-width: 0 2px 2px 0;
    padding: 3px;
    transform: rotate(135deg);
  }

  & span:last-child {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    background-color: ${Colors.cornFlowerBlue};

    ${size(2, 20)};
  }

  ${marginProps}
`;
