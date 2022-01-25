import styled from 'styled-components';
import { rgba } from 'polished';
import { margin, layout, LayoutProps, MarginProps } from 'styled-system';
import { Link } from 'react-router-dom';

import { Colors } from '@types';
import { media } from 'styles/media';

export const Root = styled.div`
  display: flex;
`;

export const Content = styled.div`
  border-left: 1px solid ${rgba(Colors.argent, 0.2)};
  width: 100%;

  ${media.desktop`
    width: calc(100vw - 347px);
    padding: 30px 0 0 35px;
  `}

  ${media.bigDesktop`
    padding: 70px 0 0 75px;
  `}
`;

export const LeftPart = styled.div`
  padding-right: 20px;
`;

export const Nav = styled.ul<MarginProps>`
  width: fit-content;

  ${margin}
`;

export const NavLink = styled(Link)<LayoutProps>`
  display: flex;
  align-items: center;

  ${layout}
`;
