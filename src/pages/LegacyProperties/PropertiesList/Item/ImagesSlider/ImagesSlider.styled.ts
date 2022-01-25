import styled from 'styled-components';
import { rgba } from 'polished';

import { Colors } from '@types';

import { center } from 'styles/helpers';

export const Overflow = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: ${rgba(Colors.emperor, 0.7)};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: 1;
`;

export const ShowMoreImages = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${center()}
`;
