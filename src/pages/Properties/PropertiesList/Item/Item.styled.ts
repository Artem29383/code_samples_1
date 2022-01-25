import styled, { keyframes } from 'styled-components';
import { size, rgba } from 'polished';
import { Swiper } from 'swiper/react';
import { margin, layout, MarginProps, LayoutProps } from 'styled-system';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';

const heartActiveIcon = require('assets/icons/heart-active.svg');
const heartIcon = require('assets/icons/heart.svg');

export const animatedBackground = (position: number) => keyframes`
  0% {
    background-position: -${position}px;
  }

  100% {
    background-position: ${position}px;
  }
`;

export const Root = styled.div`
  padding: 15px;
  position: relative;
  overflow: visible;
  border-radius: 25px;
  background-color: ${Colors.white};
  box-shadow: 0 0 20px ${rgba(Colors.black, 0.1)};

  ${layout}
  ${margin}
`;

export const Slider = styled(Swiper)<LayoutProps>`
  margin-bottom: 10px;
  background-color: ${Colors.argent};
  border-radius: 10px;
  overflow: hidden;

  & img {
    ${size('100%')}
    object-fit: cover;
  }

  ${layout}
`;

export const Image = styled.img`
  ${size('100%')}

  object-fit: cover;
  border-radius: 10px;
  border-radius: 10px;
  margin-bottom: 10px;

  ${layout}
`;

export const NoImages = styled.div<LayoutProps>`
  margin-bottom: 10px;
  background-color: ${Colors.argent};
  border-radius: 10px;

  ${layout}
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

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  z-index: 2;
`;

export const InfoLine = styled.div<{ justify?: string }>`
  display: flex;
  justify-content: ${p => p.justify || 'normal'};

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  svg {
    stroke: #638cff;
  }
`;

export const Address = styled.div`
  /* TODO Add solution for unsupported browsers */
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden; */

  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    color: 'tundora',
    lineHeight: 18,
  })}
`;

export const Price = styled.div`
  margin-bottom: 5px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 18,
    color: 'dodgerBlue',
  })}
`;

export const Status = styled.div`
  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    color: 'dodgerBlue',
  })}
`;

export const InfoValue = styled.div`
  &:not(:last-child) {
    margin-right: auto;
  }
`;

export const InfoItem = styled.div<{ fontSize: number } & MarginProps>`
  ${p =>
    textMixin({
      fontType: 'liberGrotesqueExtraBold',
      color: 'tundora',
      fontSize: p.fontSize,
    })}

  ${margin}
`;

export const ProgressBar = styled.div`
  &.swiper-pagination {
    top: unset !important;
    left: 50% !important;
    transform: translateX(-50%);

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }

    width: 130px !important;
    height: 3px !important;
    bottom: 10px;
  }
`;

export const Total = styled.div`
  margin-bottom: 20px;

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    color: 'argent',
    fontSize: 15,
    textTransform: 'uppercase',
  })}
`;

export const HeartActiveIcon = styled(heartActiveIcon)`
  position: absolute;
  top: 3px;
  right: 14px;
  z-index: 3;
  cursor: pointer;

  ${size(35, 37)}
`;

export const HeartIcon = styled(heartIcon)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 3;
  cursor: pointer;

  ${size(15, 16)}
`;

export const Mock = styled(Root)`
  padding-bottom: 117px;

  ${margin}
`;

export const MockSlider = styled.div<LayoutProps>`
  background-color: ${Colors.argent};

  ${layout}
`;

export const Overflow = styled.div`
  background-color: red;
`;
