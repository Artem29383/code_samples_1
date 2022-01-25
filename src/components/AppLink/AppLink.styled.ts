import styled from 'styled-components';
import { margin, position, layout } from 'styled-system';
import { Link, LinkProps } from 'react-router-dom';

import { translateProps } from 'styles/helpers';

export const AppLink = styled(Link)<LinkProps>`
  ${margin}
  ${position}
  ${layout}
  ${translateProps}
`;

export const ExternalLink = styled.a`
  ${margin}
  ${position}
  ${layout}
`;
