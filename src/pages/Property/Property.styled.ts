import styled, { css } from 'styled-components';
import { Swiper } from 'swiper/react';
import { size } from 'polished';

import { Colors, MarginProps } from '@types';

import { textMixin, marginProps } from 'styles/helpers';
import { media } from 'styles/media';

const houseIcon = require('assets/icons/house-2.svg');

export const Root = styled.div<{ isFetching: boolean }>`
  display: block;
  background-color: ${({ isFetching }) =>
    isFetching ? 'transparent' : Colors.white};

  ${media.desktop`
      padding: 33px 0px 25px 40px;
  `}
`;

export const ImageSolo = styled.div`
  margin-bottom: -20px;
  
  ${size(442, '100%')}

  ${media.desktop`
    ${size('70vh', '100%')}
    margin-bottom: 77px;
  `}
  
  ${media.desktop`
    padding-right: 20px;`}

  ${media.bigDesktop`
    padding-right: 63px;
  `}
`;

export const Image = styled.img<{ isZero: boolean }>`
  width: 100%;
  background-color: ${({ isZero }) => isZero && Colors.argent};

  height: 100%;
  object-fit: cover;
`;

export const PinWrapper = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

function createCSS(
  images: {
    id: number;
    url: string;
    width: number;
    height: number;
  }[],
  height: number
) {
  let styles = '';

  for (let i = 0; i < images.length; i += 1) {
    styles += `
       & .swiper-slide:nth-child(${i + 1}) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${(images[i].width / images[i].height) * height}px;
        background-color: ${Colors.argent};
      }
     `;
  }

  return css`
    ${styles}
  `;
}

export const Slider = styled(Swiper)<{
  images: {
    id: number;
    url: string;
    width: number;
  }[];
}>`
  margin-bottom: -20px;

  ${size(442, '100%')}

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${Colors.argent};
  }

  ${media.desktop`
    border-radius: 8px 0 0px 8px;
    box-shadow: 20px 20px 30px 0 rgba(0, 0, 0, 0.1);
    // @ts-ignore
    height: ${({ height }) => `${height}px`};
    width: 100%;
    margin-bottom: 77px;
    // @ts-ignore
    ${({ images, height }) => createCSS(images, height)};
  `}
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

export const SlideImage = styled.img`
  object-position: center;
  object-fit: cover;

  ${size('100%')}

  ${media.mediumDesktop`
    object-fit: cover;
  `}
`;

export const Content = styled.section`
  display: flex;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  justify-content: space-between;

  ${media.desktop`
    border-radius: 0;
    overflow: visible;
  `}
`;

export const ContentLeft = styled.div`
  width: 100%;
  z-index: 123;
  // background-color: ${Colors.alabaster};

  ${media.desktop`
    width: 58%;
    background-color: transparent;
  `}
  
  ${media.mediumDesktop`
    width: 57%;
  `}
  
  ${media.bigDesktop`
      width: 63%;
   `}
`;

export const ContentRight = styled.div`
  min-width: 440px;
  position: relative;
  top: -185px;

  ${media.desktop`
    min-width: 350px;
    z-index: 123;
    margin-right: 20px;
  `}
  
  ${media.mediumDesktop`
    min-width: 440px;
  `}

  ${media.bigDesktop`
    margin-right: 63px;
  `}
`;

export const SliderNavPrev = styled(SliderNav)<{ isActive: boolean }>`
  transform: translateY(-50%) rotate(135deg);
  left: 35px;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

export const SliderNavNext = styled(SliderNav)<{ isActive: boolean }>`
  transform: translateY(-50%) rotate(-45deg);
  right: 35px;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

export const Opacity = styled.div<{
  widthSlideWrapper: number;
}>`
  position: absolute;
  height: 4px;
  bottom: 10px;
  width: 100%;
  
  ${media.desktop`
  // @ts-ignore
    width: ${({ widthSlideWrapper }) => `${widthSlideWrapper}px`};
  `}
}
`;

export const ProgressBar = styled.div`
  &.swiper-pagination {
    top: unset !important;
    left: 50% !important;
    transform: translateX(-50%);
    border-radius: 10px;
    overflow: hidden;

    ${media.desktop`
       border-radius: 0;
  `}

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.white};
    }

    width: 90% !important;
    bottom: 35px;

    ${media.desktop`
      bottom: 10px;
      left: 20px!important;
      transform: translateX(0);
      width: calc(100% - 420px)!important;
  `}

    ${media.mediumDesktop`
      width: calc(100% - 520px)!important;
    `}
    
    ${media.bigDesktop`
      width: calc(100% - 560px)!important;
    `}
  }
`;

export const Header = styled.h2`
  margin-bottom: 20px;
  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 26,
    color: 'mineShaft',
  })}
  
  ${media.mediumDesktop`
    ${textMixin({
      fontType: 'bwGradualBold',
      fontSize: 30,
      color: 'mineShaft',
    })}
  `}

  ${media.bigDesktop`
  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 38,
    color: 'mineShaft',
  })}
`}
`;

export const Description = styled.p`
    font-family: liberGrotesqueRegular, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.emperor};

  & .read-more-button {
    text-decoration: underline;
    font-family: liberGrotesqueRegular, sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: ${Colors.emperor};
  }

  ${media.desktop`
    padding-right: 35px;
    font-size: 14px;
  `}
  
  ${media.mediumDesktop`
    font-size: 16px;
    line-height: 25px;
  `}

  ${media.bigDesktop`
      padding-right: 138px;
  `}
`;

export const Info = styled.section`
  width: 100%;
  padding: 17px 27px;
  position: relative;
  background: ${Colors.white};
  border-radius: 30px;
  z-index: 1;
  box-shadow: 20px 20px 30px 0 rgba(0, 0, 0, 0.1);

  ${media.desktop`
    width: 340px;
    top: 50px;
    // width: 75%;
    margin: 0 0 0 auto;
  `}

  ${media.desktop`
    padding: 30px 20px 25px 28px;
    position: sticky;
    box-shadow: -10px 10px 30px 0 rgba(0, 0, 0, 0.1);
  `}
  
  ${media.mediumDesktop`
      padding: 30px 42px 25px 42px;
      margin: 0 auto;
      width: 450px;
  `}
`;

export const InfoLineIcon = styled.div<MarginProps>`
  display: flex;
  justify-content: space-around;

  ${marginProps}

  ${media.desktop`
    justify-content: space-between;
    
    button {
      box-shadow: -13.2px 12.3px 30px 0 rgba(0, 0, 0, 0.1);
    }
  `}
  
  svg {
    stroke: #638cff;
  }
`;

export const InfoLine = styled.div<MarginProps>`
  display: flex;
  justify-content: space-around;

  ${marginProps}

  ${media.desktop`
    justify-content: space-between;
    
    button {
      box-shadow: -13.2px 12.3px 30px 0 rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const Address = styled.div`
  max-width: 224px;

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 20,
    color: 'tundora',
    lineHeight: 28,
  })}
  
  ${media.desktop`
    font-size: 18px;
    line-height: 24px;
  `}
  
  ${media.mediumDesktop`
    font-size: 20px;
    line-height: 28px;
  `}
`;

export const LineAddress = styled.div``;

export const LineAddressMin = styled.div`
  font-size: 13px;
  line-height: 1;
  margin-top: 5px;

  ${media.mediumDesktop`
    font-size: 16px;
  `}
`;

export const PriceSqFeet = styled.div`
  max-width: 224px;
  align-self: flex-end;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 18,
    color: 'tundora',
  })}
  
  ${media.desktop`
    max-width: 90px;
    width: 100%;
    font-size: 14px;
  `}
  
  ${media.mediumDesktop`
    max-width: 224px;
    width: auto;
    font-size: 18px;
  `}
`;

export const InfoNumber = styled.div`
  display: flex;

  ${media.desktop`
    flex-direction: column;
  `}
`;

export const InfoNumberValue = styled.div`
  margin-right: 5px;
  ${textMixin({
    align: 'left',
    fontType: 'liberGrotesqueBold',
    fontSize: 14,
    color: 'bombay',
  })}

  ${media.desktop`
    margin-bottom: 5px;
    margin-right: 0;
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueBlack',
      fontSize: 28,
      color: 'mineShaft',
    })}
  `}
  
  ${media.mediumDesktop`
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueBlack',
      fontSize: 36,
      color: 'mineShaft',
    })}
  `}
`;

export const InfoNumberTitle = styled.div`
  ${textMixin({
    align: 'left',
    fontType: 'liberGrotesqueBold',
    fontSize: 14,
    color: 'bombay',
  })}

  ${media.desktop`
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 18,
      color: 'mineShaft',
    })}
  `}
  
  ${media.mediumDesktop`
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 24,
      color: 'mineShaft',
    })}
  `}
`;

export const PriceAndStatus = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  width: 65%;
  justify-content: space-around;

  ${media.desktop`
    width: auto;
    display: block;
  `}
`;

export const Price = styled.div<{ color: string }>`
  font-family: liberGrotesqueExtraBold, sans-serif;
  font-size: 16px;
  color: ${({ color }) => color};

  ${media.desktop`
    font-size: 28px;
  `}

  ${media.mediumDesktop`
    font-size: 38px;
  `}
`;

export const Status = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-family: liberGrotesqueBold, sans-serif;
  font-size: 14px;

  ${media.desktop`
    margin-bottom: 10px;
    font-size: 18px;
  `}

  ${media.mediumDesktop`
    margin-bottom: 10px;
    font-size: 24px;
  `}
`;

export const HouseIcon = styled(houseIcon)`
  align-self: flex-end;

  ${size(56, 59)}
`;

export const Icon = styled.div`
  width: 100%;
`;

export const Button = styled.div<{ isActive?: boolean; isShare?: boolean }>`
  display: flex;
  align-items: center;
  width: 15%;
  cursor: pointer;
  position: relative;
  justify-content: space-around;
  stroke-width: 3px;

  svg {
    pointer-events: ${({ isShare = false }) => (isShare ? 'none' : 'auto')};
  }

  &.activeFavorite {
    fill: ${Colors.burningOrange};
    stroke: ${Colors.burningOrange};
  }

  &.noActiveFavorite {
    fill: ${Colors.white};
    stroke: ${Colors.bombay};
  }

  &.noActiveHidden {
    svg {
      fill: ${Colors.bombay}!important;
    }
  }

  &.activeHidden {
    svg {
      fill: ${Colors.burningOrange}!important;
    }
  }

  ${media.desktop`
    width: 29%;
  `}
`;

export const HomeInfo = styled.div`
  padding: 20px 0 0 40px;
  margin-top: 45px;
  line-height: 52px;
  border-left: 1px solid ${Colors.dovGray};
`;

export const Text = styled.div`
  display: flex;
  margin-bottom: 5px;

  ${media.desktop`
    margin-bottom: 0;
  `}
`;

export const Title = styled.div``;
export const SubText = styled.div`
  margin-left: 5px;
`;

export const AboutContainerWrapper = styled.div<{ isSeeDetail: boolean }>`
  display: flex;
  padding: 40px 25px 0 20px;
  justify-content: space-between;

  ${media.desktop`
    padding: 0;
  `}
`;

export const AboutContainer = styled.div<{ isSeeDetail: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: normal;
  max-width: ${({ isSeeDetail }) => (isSeeDetail ? '42%' : '100%')};

  ${media.desktop`
    max-width: 100%;
    justify-content: space-between;
    padding: 0;
    flex-direction: row;
  `}
`;
export const About = styled.div`
  width: 100%;

  ${media.desktop`
    width: 60%;
  `}
`;

export const MSL = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.desktop`  
    display: block;
    width: 30%;
    margin-top: 0;
`}

  ${media.bigDesktop`  
    margin-right: auto;
`}
`;

export const BurgerInfo = styled.div`
  padding-left: 13px;
  border-left: 1px solid #eee;
`;

export const More = styled.div`
  margin-top: 77px;
`;

export const Options = styled.div`
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Option = styled.div`
  width: 45%;
`;

export const Payment = styled.div`
  width: 100%;

  ${media.desktop`
    padding-left: 0;
    margin-top: 80px;
  `}

  ${media.bigDesktop`
    padding-left: 165px;
    margin-top: 143px;
  `}
`;

export const MobileInfo = styled.div`
  width: 100%;
  padding: 40px 25px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    stroke: #555555;
  }
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 7px;
`;

export const WrapperInfo = styled.div`
  width: 100%;
  padding: 0 15px;
  margin-top: 15px;

  ${media.desktop`
    margin-bottom: 81px;
  `}
`;

export const ButtonAbsolute = styled.div`
  position: absolute;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  bottom: -13px;

  button {
    box-shadow: -10px 10px 30px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const Details = styled.div<{ isSeeDetail: boolean }>`
  text-decoration: underline;
  margin-left: ${({ isSeeDetail }) => (isSeeDetail ? 'auto' : 'initial')};
  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 14,
    color: 'cornFlowerBlue',
    lineHeight: 14,
  })}

  ${media.desktop`
    left: 0;
    right: initial;
  `}
`;

export const ButtonText = styled.div<{ isShare: boolean }>`
  font-family: liberGrotesqueRegular, sans-serif;
  color: ${Colors.bombay};
  font-size: 16px;
  pointer-events: ${({ isShare }) => (isShare ? 'none' : 'auto')};

  ${media.desktop`
    font-size: 12px;
  `}

  ${media.mediumDesktop`
    font-size: 16px;
  `}
`;

export const DropDown = styled.div`
  width: 100px;
  height: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.0784314);
  position: absolute;
  top: 50%;
  z-index: 2;

  // enter from
  &.fadeIn-enter {
    opacity: 0;
  }

  // enter to
  &.fadeIn-enter-active {
    opacity: 1;
    transition: opacity 200ms linear;
  }

  // exit from
  &.fadeIn-exit {
    opacity: 1;
  }

  // exit to
  &.fadeIn-exit-active {
    opacity: 0;
    transition: opacity 200ms linear;
  }
`;

export const Li = styled.div`
  width: 100%;
  padding: 5px;
  background-color: #fff;
  color: ${Colors.emperor};
  transition: background-color 200ms linear;

  &:hover {
    background-color: #eee8e8;
  }
`;
