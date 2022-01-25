import styled from 'styled-components';

import { Colors } from '@types';

import { center, windowHeightMixin } from 'styles/helpers';
import { media } from 'styles/media';

const navBg = require('images/nav-bg.jpg');

export const Root = styled.div`
  width: 100%;
  position: relative;
  background: url(${navBg}) no-repeat center;
  background-size: cover;
  z-index: 1;

  ${windowHeightMixin}

  &::before {
    content: '';
    width: 100%;
    display: block;
    background: linear-gradient(135deg, ${Colors.mauve}, ${Colors.dodgerBlue});
    opacity: 0.85;
    z-index: 2;

    ${windowHeightMixin}
  }
`;

export const Content = styled.div`
  z-index: 3;
  width: 100%;
  ${center()}

  ${media.desktop`
    width: auto;
  `}
`;
