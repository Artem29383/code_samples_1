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

import { center, textMixin } from 'styles/helpers';
import { media } from 'styles/media';

export const Map = styled.div<{
  isLoading: boolean;
  customBubble: boolean;
}>`
  width: 100%;
  pointer-events: ${p => (p.isLoading ? 'none' : 'all')};

  /* ${p => (p.isLoading ? `filter: blur(5px)` : '')}; */
  ${layout}

  ${p =>
    p.customBubble
      ? css`
          & {
            .gm-style-iw {
              padding: 0;
              max-width: 260px !important;
              max-height: 345px !important;
              border-radius: 25px;
              box-shadow: 10px 10px 30px ${rgba(Colors.tundora, 0.2)};
              visibility: visible;

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

  .map-cluster-anchor {
    position: absolute;
  }

  .map-cluster-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(135deg, #9592ff, #6a8dff, #3f87ff);
    opacity: 0.5;
    z-index: -1;
  }

  .map-cluster {
    position: absolute;
    cursor: pointer;
    background: linear-gradient(-45deg, ${Colors.malibu}, ${Colors.mauve});
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${textMixin({
      fontType: 'bwGradualExtraBold',
      fontSize: 20,
      color: 'white',
    })}
  }

  .map-cluster-heart {
    position: absolute;
    top: -4px;
    right: 2px;
  }

  .map-point-anchor {
    position: absolute;

    &:hover {
      z-index: 1000;
    }

    img {
      cursor: pointer;
      position: absolute;
    }
  }

  .map-distance-from-anchor {
    position: absolute;
  }

  .map-distance-from {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${Colors.melrose},
      ${Colors.malibu},
      ${Colors.dodgerBlue}
    );

    &::before,
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      background: linear-gradient(
        135deg,
        ${Colors.melrose},
        ${Colors.malibu},
        ${Colors.dodgerBlue}
      );

      ${center()}
    }

    &::before {
      width: 50px;
      height: 50px;
      opacity: 0.5;
      z-index: -1;
    }

    &::after {
      width: 75px;
      height: 75px;
      opacity: 0.25;
      z-index: -2;
    }
  }
`;

export const Bubble = styled.div<FlexboxProps & PaddingProps & LayoutProps>`
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

  &.bubble-swiper-pagination {
    position: relative !important;
    width: 100% !important;
    height: 3px !important;

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }
  }
`;

export const LoadingProgress = styled.div<{ progress: number; offset: number }>`
  position: absolute;
  top: 0;
  left: ${p => p.offset}px;
  height: 3px;
  transition: width 100ms;
  width: ${p => `${p.progress}%`};
  z-index: 1;
  background: linear-gradient(
    135deg,
    ${Colors.melrose},
    ${Colors.malibu},
    ${Colors.dodgerBlue}
  );
`;
