import styled from 'styled-components';

import { layout, position } from 'styled-system';

const LogoIcon = require('assets/icons/logo.svg');

export const Root = styled(LogoIcon)<{ $white: boolean; $zIndex: number }>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: ${p => p.$zIndex || 'unset'};

  ${layout}
  ${position}

  ${p =>
    p.$white
      ? `
        & path {
          fill: white;
        }
      `
      : ''}
`;
