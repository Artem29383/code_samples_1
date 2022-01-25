import styled from 'styled-components';
import {
  margin,
  layout,
  padding,
  flexbox,
  MarginProps,
  FlexboxProps,
  PaddingProps,
  LayoutProps,
} from 'styled-system';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div<FlexboxProps & PaddingProps & LayoutProps>`
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

export const BubbleInfo = styled.div<MarginProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  & svg {
    stroke: #555555;
  }

  ${margin}
`;

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 7px;
  border-radius: 25px;
  background-color: ${Colors.argent};
`;

export const NoImage = styled.div`
  position: relative;
  height: 150px;
  margin-bottom: 7px;
  border-radius: 25px;
  background-color: ${Colors.argent};
`;

export const Address = styled.div`
  /* TODO Add solution for unsupported browsers */
  /* display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; */

  max-width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    color: 'tundora',
  })}
`;

export const Slider = styled.div`
  border-radius: 25px;
  height: 150px;
  margin-bottom: 7px;
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
  &.bubble-swiper-pagination {
    position: absolute !important;
    width: 125px !important;
    height: 3px !important;
    top: unset !important;
    left: 50% !important;
    bottom: 5px;
    transform: translateX(-50%);
    z-index: 1;

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }
  }
`;
