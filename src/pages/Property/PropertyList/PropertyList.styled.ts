import styled from 'styled-components';
import { Colors } from '@types';
import { Swiper } from 'swiper/react';
import { size } from 'polished';
import { media } from 'styles/media';
import { textMixin } from 'styles/helpers';
import { NavLink } from 'react-router-dom';

export const Root = styled.div`
  max-width: 100%;
  width: 100%;
`;

const getPx = (
  isHover: boolean,
  height: number | null,
  staticHeight: string
) => {
  if (isHover) {
    return staticHeight;
  }
  if (height) {
    return `${height}px;`;
  }
  return 'auto;';
};

export const Content = styled.div<{ height: number | null; isHover: boolean }>`
  width: 200px;
  height: ${({ height, isHover }) => getPx(isHover, height, '285px;')};
  box-shadow: 10px 10px 30px rgba(68, 68, 68, 0.2);
  border-radius: 25px;
  background-color: ${Colors.white};
  padding: 10px 10px 0 10px;
  cursor: grab;
  transition: ${({ isHover }) =>
    isHover ? `height 200ms linear` : 'height 200ms linear 250ms'};
  //h 420
  ${media.tablet`
    width: 368px;
    // @ts-ignore
    height: ${({ height, isHover }) => getPx(isHover, height, '420px;')}
  `}
  
  //h 445
  ${media.desktop`
    // @ts-ignore
    height: ${({ height, isHover }) => getPx(isHover, height, '445px;')}
    padding: 20px 17px 0 17px;
  `}
`;

export const ButtonAbs = styled.div<{ isHover: boolean }>`
  position: absolute;
  bottom: 90px;
  right: 35px;
  display: block;
  max-width: 112px;
  width: 100%;
  z-index: ${({ isHover }) => (isHover ? 0 : 2)};

  button {
    font-size: 14px;
    font-family: liberGrotesqueBlack, sans-serif;

    ${media.desktop`
      font-size: 18px;
    `}
  }

  ${media.desktop`
    bottom: 50px;
    right: 77px;
    max-width: 200px;
  `}

  ${media.mediumDesktop`
    right: 147px;
  `}
`;

export const SlideImage = styled.img`
  object-position: center;
  object-fit: cover;

  ${size('100%')}
`;

export const Slider = styled(Swiper)<{ fullscreen: string }>`
  border-radius: 20px;
  position: relative;
  margin: -10px -20px -10px -10px;
  padding-left: 9px!important;
  //390
  ${size(390, '100%')}
        //520
  ${media.tablet`
      margin: -20px;
      ${size(520, '100%')}
      padding-left: 0!important;
  `}
  
  ${media.desktop`
    padding-left: 39px!important;
  `}
  
  ${media.mediumDesktop`
      padding-left: 36px!important;
  `}
  
  ${media.bigDesktop`
      padding-left: 120px!important;
  `}
  
  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 10px 10px 15px;

    width: 220px!important;
    // width: ${({ fullscreen }) => (fullscreen === 'true' ? '100%' : '80%')};
    
    ${media.tablet`
        padding: 20px 20px 20px 25px;
      // align-items: center;
      width: 368px!important;
    `}
  }
`;

export const Image = styled.div`
  height: 140px;
  border-radius: 20px;
  background-color: ${Colors.argent};
  overflow: hidden;

  ${media.tablet`
    height: 220px;
  `}
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 109px;
  display: block;
  max-width: 550px;
  width: 100%;

  ${media.desktop`
    left: 60px;
  `}

  ${media.mediumDesktop`
    max-width: 701px;
    left: 109px;
  `}
`;

export const Progress = styled.div`
  height: 3px;
  width: 100%;
  background-color: rgba(136, 136, 136, 0.3);
  border-radius: 1px;
  position: relative;
`;

export const Filler = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  border-radius: 21px;
  background-color: ${Colors.argent};
`;

export const ProgressBar = styled.div`
  &.swiper-pagination-list {
    top: 50% !important;
    left: 0 !important;
    transform: translateY(-50%);
    border-radius: 10px;
    overflow: hidden;
    height: 5px;

    ${media.desktop`
       border-radius: 0;
  `}

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.argent};
    }

    width: 100% !important;
    bottom: 35px;

    ${media.desktop`
    bottom: 10px;
  `}
  }
`;

export const Counter = styled.div`
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-top: 20px;
  justify-content: flex-end;
  align-items: center;
`;

export const Br = styled.div`
  width: 0px;
  height: 46px;
  transform: rotate(30deg);
  border-left: 1px solid #acafb5;
`;

export const InfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // enter from
  &.fadeIn-enter {
    opacity: 0;
  }

  // enter to
  &.fadeIn-enter-active {
    opacity: 1;
    transition: opacity 450ms linear 200ms;
  }

  // exit from
  &.fadeIn-exit {
    opacity: 1;
  }

  // exit to
  &.fadeIn-exit-active {
    opacity: 0;
    transition: opacity 300ms linear;
  }
`;

export const NavLinker = styled(NavLink)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fadeIn-enter {
    opacity: 0;
  }

  &.fadeIn-enter-active {
    opacity: 1;
    transition: opacity 450ms linear 200ms;
  }

  &.fadeIn-exit {
    opacity: 1;
  }

  &.fadeIn-exit-active {
    opacity: 0;
    transition: opacity 300ms linear;
  }
`;

export const Address = styled.div`
  max-width: 224px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 8,
    color: 'tundora',
    lineHeight: 11,
  })}

  ${media.tablet`
  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 13,
    color: 'tundora',
    lineHeight: 20,
  })}
 `}
`;

export const LineAddress = styled.div``;

export const LineAddressMin = styled.div`
  font-size: 8px;
  line-height: 1;
  margin-top: 5px;

  ${media.tablet`
    font-size: 13px;
  `}
`;

export const Wrapper = styled.div`
  margin-top: 14px;
  margin-bottom: 18px;

  ${media.tablet`
      padding: 0 15px;
  `}

  ${media.desktop`
    margin-top: 20px;
    margin-bottom: 20px;
  `}
`;

export const PriceAndStatus = styled.div<{ width: string }>`
  text-align: right;
  display: flex;
  align-items: flex-end;
  width: ${({ width }) => width};
  justify-content: space-around;
  flex-direction: column;
  margin-left: 15px;

  ${media.tablet`
    margin-left: 0;
  `}

  ${media.bigDesktop`
    display: block;
  `}
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  box-shadow: 0 20px 50px rgba(167, 184, 202, 0.1);
  border-radius: 29px;
  cursor: pointer;
  background-image: linear-gradient(
    -55deg,
    #6a8dff 0%,
    #8d8fff 41%,
    #8d8fff 41%,
    #928fff 46%,
    #928fff 47%,
    #928fff 47%,
    #c192ff 100%
  );

  ${media.tablet`
    width: 334px;
    height: 58px;
  `}
`;

export const ButtonIcon = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1234;
  stroke-width: 2px;
  fill: ${({ active }) => (active ? Colors.burningOrange : 'transparent')};
  stroke: ${({ active }) => (active ? Colors.white : Colors.white)};
`;

export const Price = styled.div<{ color: string }>`
  margin-bottom: 4px;
  font-family: liberGrotesqueExtraBold, sans-serif;
  font-size: 12px;
  color: ${({ color }) => color};

  ${media.tablet`
    margin-bottom: 10px;
    font-size: 16px;
  `}

  ${media.bigDesktop`
    font-size: 20px;
  `}
`;

export const Status = styled.div<{ color: string }>`
  font-family: liberGrotesqueBold, sans-serif;
  font-size: 8px;
  color: ${({ color }) => color};

  ${media.tablet`
    font-size: 14px;
  `}

  ${media.bigDesktop`
    font-size: 13px;
  `}
`;
