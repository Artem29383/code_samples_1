import styled from 'styled-components';
import { layout, position } from 'styled-system';

import { Colors } from '@types';

const pinIcon = require('assets/icons/pin.svg');
const pinIconTransparent = require('assets/icons/pin-transparent.svg');

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: ${Colors.white};
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;

  ${layout}
  ${position}
`;

export const PinIcon = styled(pinIcon)`
  width: 100%;
  cursor: pointer;
`;

export const PinIconTransparent = styled(pinIconTransparent)`
  width: 100%;
  cursor: pointer;
`;
