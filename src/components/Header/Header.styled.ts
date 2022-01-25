import styled from 'styled-components';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';

import { Colors } from '@types';
import { LayoutSizes } from 'styles/sizes';

import { center } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.header`
  position: relative;
  height: ${LayoutSizes.headerHeight.m}px;
  background-color: ${Colors.white};
  box-shadow: 0 10px 40px ${rgba(Colors.black, 0.1)};
  width: 100%;
  z-index: 2;

  ${media.tablet`
    height: ${LayoutSizes.headerHeight.t}px;
  `}
`;

export const LogoLink = styled(Link)`
  width: 165px;
  height: 22px;
  left: 15px;

  ${media.tablet`
    left: 40px;
    width: 192px;
    height: 35px;
  `}

  ${center(false, true)}
`;

export const UserLink = styled(Link)`
  width: 22px;
  height: 22px;
  right: 48px;
  cursor: pointer;

  ${media.tablet`
    right: 75px;
  `}

  ${center(false, true)}
`;

export const UserLinkBtn = styled.div`
  width: 22px;
  height: 22px;
  right: 48px;
  cursor: pointer;

  ${media.tablet`
    right: 75px;
  `}

  ${center(false, true)}
`;

export const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 22px;
  cursor: pointer;
  right: 15px;

  ${media.tablet`
    right: 33px;
  `}

  ${center(false, true)}

  & > span {
    display: block;
    background-color: ${Colors.cornFlowerBlue};
    width: 100%;
    height: 2px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  & > span:nth-child(1) {
    width: 82%;
  }

  & > span:nth-child(3) {
    width: 68%;
  }
`;
