import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';
import { Colors } from '@types';

export const NavLink = styled.div<LayoutProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${layout}

  svg {
    fill: ${Colors.cornFlowerBlue};
  }
`;
