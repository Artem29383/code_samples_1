import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import {
  layout,
  flexbox,
  padding,
  FlexboxProps,
  PaddingProps,
  LayoutProps,
} from 'styled-system';

import { Colors } from '@types';
import { createClusterOptions } from './helpers';

import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';

const heartIcon = require('assets/icons/map/heart-active.svg');

const clusterBorderSize = 15;
const clusterFontSizeMultiplier = 0.8;
const favoriteIconInitialSize = 20;
const clusterInitialFontSize = 20;

export const Map = styled.div<{
  isLoading: boolean;
  customPinActive: boolean;
  clusterOptions: ReturnType<typeof createClusterOptions>;
}>`
  width: 100%;
  pointer-events: ${p => (p.isLoading ? 'none' : 'all')};

  ${p => (p.isLoading ? `filter: blur(5px)` : '')};
  ${layout}

  ${p =>
    p.customPinActive
      ? css`
          & {
            .gm-style-iw {
              padding: 0;
              max-width: 260px !important;
              max-height: 345px !important;
              border-radius: 25px;
              box-shadow: 10px 10px 30px ${rgba(Colors.tundora, 0.2)};

              button.gm-ui-hover-effect {
                display: none !important;
              }

              ${media.tablet`
                max-width: 270px !important;
              `}
            }

            .gm-style-iw-d {
              overflow: hidden !important;
              max-height: 345px !important;
            }
          }
        `
      : ''}

  .custom-clustericon {
    display: flex;
    position: relative;
    background: linear-gradient(-45deg, ${Colors.malibu}, ${Colors.mauve});
    align-items: center;
    border-radius: 100%;

    ${textMixin({
      fontType: 'bwGradualExtraBold',
      fontSize: 20,
      color: 'white',
    })}

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: linear-gradient(135deg, #9592ff, #6a8dff, #3f87ff);
      opacity: 0.5;
      z-index: -1;
    }

    &.cluster-favorite {
      &::after {
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        background-image: url(${heartIcon});
        background-repeat: no-repeat;
        position: absolute;
      }
    }
  }

  ${p =>
    p.clusterOptions.map(
      (item, i) => css`
        .${item.className} {
          font-size: ${clusterInitialFontSize +
            i * clusterFontSizeMultiplier}px;

          &::before {
            width: ${item.width + clusterBorderSize}px;
            height: ${item.height + clusterBorderSize}px;
          }

          &.cluster-favorite {
            &::after {
              width: ${favoriteIconInitialSize + i}px;
              height: ${favoriteIconInitialSize + i}px;
              top: -5px;
              right: 0px;
            }
          }
        }
      `
    )}
`;

export const Pin = styled.div<FlexboxProps & PaddingProps & LayoutProps>`
  display: none;
  position: relative;
  width: 260px;
  height: 345px;
  padding: 10px;
  background-color: ${Colors.white};

  ${media.tablet`
    width: 270px;
  `}
  
  ${layout}
  ${padding}
  ${flexbox}
`;

export const NoImage = styled.div`
  position: relative;
  height: 175px;
  margin-bottom: 7px;
  background-color: ${Colors.argent};
`;

export const Address = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    align: 'right',
    color: 'white',
  })}
`;

export const Slider = styled.div`
  height: 175px;
`;

export const Slide = styled.div`
  background-color: ${Colors.argent};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-lazy-preloader {
    width: 22px;
    height: 22px;
    margin-left: -11px;
    margin-top: -11px;
  }
`;

export const OnSliderInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  max-width: 150px;
  z-index: 1;
`;

const SliderNav = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  border: solid ${Colors.white};
  border-width: 0 3px 3px 0;
  padding: 6px;
  z-index: 1;
  border-bottom-right-radius: 3px;
  cursor: pointer;
`;

export const SliderNavPrev = styled(SliderNav)`
  transform: translateY(-50%) rotate(135deg);
  left: 10px;
`;

export const SliderNavNext = styled(SliderNav)`
  transform: translateY(-50%) rotate(-45deg);
  right: 10px;
`;

export const ProgressBar = styled.div`
  margin-bottom: 3px;

  &.pin-swiper-pagination {
    position: relative !important;
    width: 100% !important;
    height: 3px !important;

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }
  }
`;
