import styled from 'styled-components';

import { Colors } from '@types';

import { center, windowHeightMixin } from 'styles/helpers';

export const NoResult = styled.div`
  text-align: center;

  ${center()}
`;

export const Root = styled.div`
  position: relative;
  background-color: ${Colors.white};

  ${windowHeightMixin}
`;
