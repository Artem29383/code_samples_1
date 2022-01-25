import styled from 'styled-components';

import { media } from 'styles/media';
import { Colors } from '@types';
import { LayoutSizes } from 'styles/sizes';

import { windowHeightValue } from 'styles/helpers';

export const minLayoutHeight = 720;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  background-color: ${Colors.alabaster};
  height: calc(${windowHeightValue} - ${
  LayoutSizes.headerHeight.m
}px)!important;
  z-index: 1;

  ${media.tablet`
    height: calc(${windowHeightValue} - ${LayoutSizes.headerHeight.t}px)!important;
  `}

  @media (max-height: ${minLayoutHeight}px) {
    ${media.desktop`
      height: ${minLayoutHeight}px!important;
    `}
  }
`;
