import { createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';

import { Colors } from '@types';
import { LayoutSizes } from 'styles/sizes';

import { textMixin, windowHeightValue } from 'styles/helpers';
import { media } from 'styles/media';

const noUISliderCSS = require('nouislider/distribute/nouislider.css').toString();
const swiperCSS = require('swiper/swiper-bundle.css').toString();

/* TODO Refactor styles */

export default createGlobalStyle`
  body {
    font-family: 'Gilroy-Regular', Helvetica, Arial, sans-serif;
    color: ${Colors.white};
    background-color: ${Colors.alabaster};
  }

  .pac-container {
    border-radius: 15px;
    border-top: none;
    box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};

    &::after {
      display: none;
    }

    & .pac-icon {
      display: none;
    }

    & .pac-item {
      cursor: pointer;
      padding: 15px 15px;
      border-top: none;
    }

    &, & .pac-item, & .pac-item-query, & .pac-matched {
      ${textMixin({
        fontType: 'bwGradualExtraBold',
        color: 'malibu',
        fontSize: 16,
      })}
    }
  }

  .properties {
    .pac-container + .pac-container {
      top: ${LayoutSizes.headerHeight.m +
        LayoutSizes.searchInputTopOffset +
        LayoutSizes.searchInputHeight +
        LayoutSizes.searchInputMarginBottom}px !important;

      ${media.tablet`
        top: ${LayoutSizes.headerHeight.t +
          LayoutSizes.searchInputTopOffset +
          LayoutSizes.searchInputHeight +
          LayoutSizes.searchInputMarginBottom}px !important;
      `}

      &, & .pac-item, & .pac-item-query, & .pac-matched {
        ${textMixin({
          fontType: 'bwGradualExtraBold',
          color: 'bombay',
          fontSize: 15,
        })}
      }
    }

    .pac-container:last-child {
      top: calc(${`${windowHeightValue}/2 + ${LayoutSizes.searchInputHeight /
        2}px + ${LayoutSizes.searchInputMarginBottom}px`}) !important;

      &, & .pac-item, & .pac-item-query, & .pac-matched {
        ${textMixin({
          fontType: 'bwGradualExtraBold',
          color: 'bombay',
          fontSize: 15,
        })}
      }
    }
  }
  

  .body-no-scroll {
    overflow: hidden;
  }

  ${noUISliderCSS}
  ${swiperCSS}
`;
