import styled, { css } from 'styled-components';
import { size } from 'polished';
import { Link as AppLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import { media } from 'styles/media';

import { Colors, PositionProps } from '@types';

import { positionProps, textMixin } from 'styles/helpers';

const navBg = require('images/nav-bg.jpg');

const position = css`
  position: fixed;
  top: 0;
  left: 0;
  ${size('100%')}
`;

export const Root = styled(motion.div)`
  z-index: 10;
  background: url(${navBg}) no-repeat center;
  background-size: cover;

  ${position}

  &::after {
    content: '';
    display: block;
    background: linear-gradient(135deg, ${Colors.mauve}, ${Colors.dodgerBlue});
    opacity: 0.85;
    z-index: 11;

    ${position}
  }
`;

export const Cross = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 12;
  cursor: pointer;

  ${size(30)}

  & > span {
    content: '';
    position: absolute;
    left: 50%;
    background-color: ${Colors.white};
    display: inline-block;

    ${size('100%', 4)}

    ${media.tablet`
      width: 5px;
    `}
  }

  ${media.tablet`
    width: 35px;
    height: 35px;
    top: 35px;
    right: 35px;
  `}
`;

const NavItem = styled(motion.li)`
  position: relative;
  width: fit-content;
`;

export const MainNavItem = styled(NavItem)`
  ${textMixin({
    fontType: 'bwGradualExtraBold',
    fontSize: 48,
    color: 'white',
  })}

  margin-bottom: 20px;

  ${media.tablet`
    font-size: 86px;
  `}
`;

export const SecondaryNavItem = styled(NavItem)`
  ${textMixin({
    fontType: 'liberGrotesqueBlack',
    fontSize: 18,
    color: 'white',
  })}

  margin-bottom: 22px;
`;

export const Link = styled(AppLink)`
  position: absolute;
  top: 0;
  left: 0;

  ${size('100%')}
`;

export const NavItems = styled.ul<PositionProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  z-index: 12;

  ${positionProps}
`;
