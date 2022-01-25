import styled from 'styled-components';

import { media } from 'styles/media';
import { Colors } from '@types';
import { LayoutSizes } from 'styles/sizes';

import { windowHeightValue } from 'styles/helpers';

export const minLayoutHeight = 600;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  overflow: hidden;
  background-color: ${Colors.alabaster};
  height: auto;
  min-height: calc(${windowHeightValue} - ${
  LayoutSizes.headerHeight.m
}px)!important;
  z-index: 1;

  ${media.tablet`
    min-height: calc(${windowHeightValue} - ${LayoutSizes.headerHeight.t}px)!important;
  `}

  @media (max-height: ${minLayoutHeight}px) {
  ${media.desktop`
      min-height: ${minLayoutHeight}px!important;
    `}
}
`;
