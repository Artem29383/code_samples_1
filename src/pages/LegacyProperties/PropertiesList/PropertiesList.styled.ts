import styled from 'styled-components';
import { size, rgba } from 'polished';
import { Swiper } from 'swiper/react';
import { flexbox, layout, LayoutProps } from 'styled-system';

import { Colors, LayoutSizes } from '@types';

import { textMixin, center, windowHeightValue } from 'styles/helpers';
import { media } from 'styles/media';

const heartActiveIcon = require('assets/icons/heart-active.svg');
const heartIcon = require('assets/icons/heart.svg');

const rootLeftPadding = 40;
const rootRightPadding = 50;

export const topBarHeight = 50;
export const itemMinWidth = 328;

export const rootTopPadding = 25;
export const topBarMarginBottom = 25;
export const itemsPairMargin = 45;
export const itemsPairWidth = 250;
export const rootMinHorPadding = { m: 20, t: 40 };

export const rootMinWidth =
  rootLeftPadding + itemsPairMargin + rootRightPadding + itemsPairWidth * 2;

export const rootBoxShadowSize = 20;

export const Root = styled.div<{ disabled: boolean } & LayoutProps>`
  position: relative;
  width: 100%;
  padding: ${rootTopPadding}px ${rootMinHorPadding.m}px 25px;
  flex-shrink: 0;
  background-color: ${Colors.white};
  overflow-y: scroll;
  overflow-x: visible;
  z-index: 2;
  box-shadow: ${rootBoxShadowSize}px 0 20px ${rgba(Colors.black, 0.1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'all')};

  ${media.tablet`
    padding: ${rootTopPadding}px ${rootMinHorPadding.t}px 25px;
  `}

  ${layout}
`;

export const ListWrapper = styled.div`
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  margin-bottom: ${topBarMarginBottom}px;
  z-index: 1000;

  ${size(topBarHeight, '100%')};

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 14,
    color: 'argent',
  })}

  ${flexbox}
`;

export const List = styled.section`
  width: 100%;
  position: relative;
  /* height: calc(
    ${windowHeightValue} -
      ${LayoutSizes.headerHeight +
        rootTopPadding +
        topBarHeight +
        topBarMarginBottom}px
  ); */
`;

export const ItemsChunk = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ItemsPair = styled.div<LayoutProps>`
  flex-shrink: 0;

  ${layout}

  &:not(:last-child) {
    margin-right: ${itemsPairMargin}px;
  }
`;

export const Slider = styled(Swiper)`
  margin-bottom: 20px;
  height: 200px;
  background-color: ${Colors.mischka};
  border-radius: 10px;
  overflow: hidden;

  & img {
    ${size('100%')}
    object-fit: cover;
  }
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
  align-items: flex-end;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 200px;
  z-index: 2;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    color: 'white',
    fontSize: 12,
    align: 'right',
  })}
`;

export const Price = styled.div`
  font-size: 14px;
`;

export const ProgressBar = styled.div`
  &.swiper-pagination {
    position: static;
    margin-bottom: 5px;

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }

    ${size(3, 115)};
  }
`;

export const HeartActiveIcon = styled(heartActiveIcon)`
  position: absolute;
  top: -11px;
  right: 1px;
  z-index: 3;
  cursor: pointer;

  ${size(35, 37)}
`;

export const HeartIcon = styled(heartIcon)`
  position: absolute;
  top: 13px;
  right: 12px;
  z-index: 3;
  cursor: pointer;

  ${size(15, 16)}
`;

export const NoResult = styled.div`
  text-align: center;

  ${center()}
`;
